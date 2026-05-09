const WebSocket = require("ws");

const PORT = Number(process.env.PORT || 3000);
const PATH = "/ecclab";

const state = {
  leds: [0, 0, 0, 0],
  psw: [0, 0, 0, 0],
  adc: [512, 640, 768, 896],
  prevAdc: [512, 640, 768, 896],
  pwm: Array.from({ length: 4 }, () => ({
    frequency: 10,
    duty: 0.5,
    phase: 0,
    enabled: 0,
  })),
  tick: 0,
};

const server = new WebSocket.Server({ port: PORT, path: PATH });

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function toInt(value, fallback = 0) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toFloat(value, fallback = 0) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function updateDynamicInputs() {
  state.tick += 1;

  for (let i = 0; i < state.adc.length; i += 1) {
    state.prevAdc[i] = state.adc[i];
    const base = 512 + 420 * Math.sin((state.tick + i * 15) / 18);
    const noise = Math.sin((state.tick + i * 7) / 5) * 35;
    state.adc[i] = clamp(Math.round(base + noise), 0, 1023);
  }

  if (state.tick % 18 === 0) {
    state.psw[0] = state.psw[0] ? 0 : 1;
  }
  if (state.tick % 27 === 0) {
    state.psw[1] = state.psw[1] ? 0 : 1;
  }
  if (state.tick % 34 === 0) {
    state.psw[2] = state.psw[2] ? 0 : 1;
  }
  if (state.tick % 45 === 0) {
    state.psw[3] = state.psw[3] ? 0 : 1;
  }
}

function broadcast(message) {
  for (const client of server.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

function broadcastTelemetry() {
  for (let i = 0; i < state.psw.length; i += 1) {
    const status = state.psw[i];
    const info = status ? "KEY_DOWN" : "KEY_UP";
    broadcast(`ok: psw,${i},${status},${info}`);
  }

  for (let i = 0; i < state.adc.length; i += 1) {
    const prev = state.prevAdc[i];
    const current = state.adc[i];
    const delta = current - prev;
    const direction = delta >= 0 ? "inc" : "dec";
    broadcast(`ok: adc,${i},${current},${Math.abs(delta)},${direction}`);
  }

  for (let i = 0; i < state.leds.length; i += 1) {
    broadcast(`ok: led,${i},1,${state.leds[i]}`);
  }
}

function safeIndex(id, size) {
  return clamp(toInt(id, 0), 0, size - 1);
}

function handleLed(parts) {
  const id = safeIndex(parts[1], state.leds.length);
  const mode = toInt(parts[2], 3);

  if (mode === 0) {
    state.leds[id] = 0;
  } else if (mode === 1) {
    state.leds[id] = 1;
  } else if (mode === 2) {
    state.leds[id] = state.leds[id] ? 0 : 1;
  }

  return `ok: led,${id},${state.leds[id]}`;
}

function handlePsw(parts) {
  const id = safeIndex(parts[1], state.psw.length);
  return `ok: psw,${id},${state.psw[id]}`;
}

function handleAdc(parts) {
  const id = safeIndex(parts[1], state.adc.length);
  return `ok: adc,${id},${state.adc[id]}`;
}

function handlePwm(parts) {
  const id = safeIndex(parts[1], state.pwm.length);
  const mode = toInt(parts[2], 0);
  const value = parts[3] ?? "0";
  const channel = state.pwm[id];

  if (mode === 0) {
    channel.frequency = Math.max(1, toFloat(value, channel.frequency));
  } else if (mode === 1) {
    channel.duty = clamp(toFloat(value, channel.duty), 0, 1);
  } else if (mode === 2) {
    channel.phase = clamp(toFloat(value, channel.phase), 0, 1);
  } else if (mode === 3) {
    channel.enabled = clamp(toInt(value, channel.enabled), 0, 1);
  }

  return `ok: pwm,${id},${mode},${value}`;
}

function handleCommand(raw) {
  const parts = raw.trim().replace(/\r?\n/g, "").split(",");
  const cmd = (parts[0] || "").trim().toLowerCase();

  switch (cmd) {
    case "led":
      return handleLed(parts);
    case "psw":
      return handlePsw(parts);
    case "adc":
      return handleAdc(parts);
    case "pwm":
      return handlePwm(parts);
    case "det":
      return "ok: det";
    case "fls":
      return "ok: fls";
    case "blk":
      return "ok: blk";
    case "cps":
      return "ok: cps";
    default:
      return `err: unsupported command (${cmd || "empty"})`;
  }
}

server.on("connection", (ws) => {
  const clientCount = server.clients.size;
  console.log(`[CONNECT] client connected (${clientCount} active)`);

  ws.send("ok: connected");

  ws.on("message", (message) => {
    const raw = message.toString("utf8").trim();
    if (!raw) {
      ws.send("err: empty command");
      return;
    }

    console.log(`[RX] ${raw}`);
    const response = handleCommand(raw);
    console.log(`[TX] ${response}`);
    ws.send(response);
  });

  ws.on("close", () => {
    const clientCount = server.clients.size;
    console.log(`[DISCONNECT] client disconnected (${clientCount} active)`);
  });
});

setInterval(() => {
  updateDynamicInputs();
  broadcastTelemetry();
}, 500);

console.log(`INC272 mock hardware server running at ws://127.0.0.1:${PORT}${PATH}`);
