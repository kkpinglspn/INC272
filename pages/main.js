function init(link, ui) {
  LED(link);

  for (let i = 0; i < 4; i++) {
    plotter(link);
  }

  knob(link, ui);

  controllerTable();
}

// Call LED function to create LED components and set up their callbacks
function LED(link) {
  const types = [
    "green",
    "red",
    "yellow",
    "cyan",
    "orange",
    "white",
    "violet",
    "blue",
  ];
  const labels = [
    "LED-green",
    "LED-red",
    "LED-yellow",
    "LED-cyan",
    "LED-orange",
    "LED-white",
    "LED-violet",
    "LED-blue",
  ];

  let uid = 0;
  types.forEach((type) => {
    let led = new Led({
      type: type,
      uid: 3 - uid, // uid 3, 2, 1, 0 from left to right
      label: labels[uid],
      callback: (targetLed, evt) => {
        link.ledGet(targetLed.uid, (uid, sts, err) => {
          // read current state from simulator
          if (!err) {
            let status = sts;
            link.ledWrt(targetLed.uid, !status); // write the inverted state
            led.setStatus(status); // update display with the pre-inversion state
          }
        });
      },
    });
    led.setTextColor(type);
    uid++;
  });
}

// Call plotter function to create plotter components and set up their callbacks
function plotter(link) {
  // Four channels showing sine waves at increasing amplitudes
  const plotter = new Plotter({
    min: -3,
    max: +3,
    samples: 30,
    step: 5,
  });

  plotter.clear();
  setInterval(() => {
    plotter.addPoint([(Math.random() * 6) - 3, (Math.random() * 6) - 3, (Math.random() * 6) - 3, (Math.random() * 6) - 3]); // each channel scaled differently
  }, 200);
}

// Knon Function to create knob components and set up their callbacks to update the corresponding gauges
function knob(link, ui) {
  const classes = ["danger", "warning", "success", "info", "yellow", "white"];

  // Creage gauge
  let uid = 3;
  const gauges = [];
  classes.forEach((c) => {
    const g = new Gauge({
      className: c,
      uid: uid,
    });
    uid -= 1;
    gauges.push(g);
  });

  ui.Utils.newLine(); // New line

  // Create knobs
  uid = 0;
  classes.forEach((c) => {
    const knob = new Knob({
      className: c,
      uid: uid,
      callback: (uid, val) => {
        gauges[uid].setValue(val);
      },
    });
    uid += 1;
  });
}

function main(ui) {
  console.log("main Function appears!");

  const link = new WSLink({
    conCallback: (ws) => {},
    datCallback: (ws, evt) => {},
    ledCallback: (ch, sts) => {},
    pswCallback: (ch, sts) => {},
    adcCallback: (ch, val, dif, dir) => {},
  });

  init(link, ui);
}
