# Mock Hardware Server

This server provides a lightweight WebSocket-based device simulator for `INC272-2026`.

## Why it exists

It replaces the old default simulation path based on `Proteus + VSPD` for day-to-day teaching and student onboarding.

## Start

```bash
npm install
npm start
```

## Endpoint

```text
ws://127.0.0.1:3000/ecclab
```

## Intended Compatibility

The server is designed to support the legacy example apps in `examples/apps/web_apps/` with minimal changes.

## Notes

- ADC values change automatically over time.
- Push-switch states also toggle over time.
- LED and PWM states respond to incoming commands.
- The behavior is intentionally simple and predictable.
