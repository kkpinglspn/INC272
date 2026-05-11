# 🏠 SmartHome Dashboard

A web-based smart home dashboard built as a final project for **INC272 (2026)**. The dashboard simulates real smart home hardware interactions using a WebSocket-based mock hardware server powered by `eec-web-gui` — no physical devices required.

---

## Overview

This project replaces the traditional `Proteus + VSPD` simulation workflow with a lightweight, browser-friendly alternative. A local WebSocket server emulates hardware behavior (sensors, LEDs, switches, PWM signals), while the frontend dashboard displays and controls them in real time.

The system consists of two parts running concurrently:

- **Static Frontend** — HTML/CSS/JS pages served via `live-server` on port `8080`
- **WebSocket Hardware Server** — A Node.js mock server on port `3000` that simulates device state

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js (`server.js`) |
| Real-time Communication | WebSocket (`ws`) |
| Dev Server | `live-server` |
| Process Management | `concurrently` |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (or any compatible package manager: `pnpm`, `yarn`, etc.)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/kkpinglspn/INC272
cd INC272
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the project**

```bash
npm run start
```

This starts both servers simultaneously:

| Service | URL |
|---|---|
| Frontend Dashboard | `http://localhost:8080` |
| WebSocket Server | `ws://localhost:3000/eec` |

---

## How It Works

Once running, the frontend dashboard connects to the WebSocket server and communicates device state in real time. The mock server simulates hardware behavior automatically:

- **ADC values** change over time (simulating analog sensors)
- **Push-switch states** toggle periodically
- **LED and PWM states** respond to commands sent from the dashboard

This makes the system self-contained and suitable for development, demos, and coursework without needing any physical hardware.

---

## Project Structure

```
INC272/
├── pages/              # Frontend dashboard (HTML/CSS/JS)
├── server.js           # Mock WebSocket hardware server
├── package.json        # Project metadata and scripts
└── README.md
```

---

## Authors

This project was created by:

| Name | Student ID |
|---|---|
| Peeranat Charungrattanapong | 67070504025 |
| Pakkapon Rattanaumpawan | 67070504026 |
| Sirawich | 67070504027 |

---

## Course

**INC272** — Final Project, 2026