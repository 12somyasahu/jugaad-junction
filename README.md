# Jugaad Junction

A complete, dependency-free browser game about making roadside repairs with inappropriate scrap.

Created by [@12somyasahu](https://github.com/12somyasahu).

## Launch

Requires Node.js 20 or newer. No npm install is necessary.

```powershell
cd D:\Gamathon\JugaadJunction
npm run dev
```

Open http://localhost:5173. Keep the terminal running; Ctrl+C stops the server.

```powershell
npm test
npm run build
```

The production build contains four static files in `dist/`. Serve that folder with any static HTTP server. ES modules require HTTP; don't double-click index.html.

## Play

Cover every required property using two or three cards. Tap cards, drag them into the workbench, or use 1–9 / 0. Tap a selected card or occupied slot to remove it. Space builds; Escape pauses. Menus and switching away from the tab pause patience.

Cash can go negative: reputation is the survival resource. Successful net earnings unlock five workshop levels automatically. New items unlock on round 3, advanced problems on rounds 3–4, and patience decreases to a 23-second floor. Every generated inventory contains at least one valid solution.

Ten chaos events alter prices, danger, available inventory, required properties, patience or rewards. Safety influences scoring and inspection penalties; incomplete high-danger repairs explode. Functionality is deterministic, so a fully covered repair works.

The current shift, discoveries (latest 100), best total score and settings are saved in localStorage under `jugaad-junction-v1`. Refresh and choose Continue Shift. Restart resets the current shift while preserving discoveries and personal best. Data is specific to browser and origin; use the same localhost port to resume.

## Tuning

**engine.js** contains `BALANCE`, material tags/costs/danger, problem requirements, events, score weights, rewards, inventory generation and unlock rules. Adjust `BALANCE.levels` for upgrade thresholds, `baseTime/minTime/timeDecay` for pressure and `failurePenalty/timeoutPenalty` for survival.

`game.js` contains the UI state machine, original SVG illustrations, pointer input, save logic, procedural Web Audio and result presentation. `style.css` contains the responsive workshop appearance and reduced-motion styles. There are no external fonts, image/audio downloads, framework packages or network services.

## Validation

Node tests check alternate solutions, all problem/event variants, 500 seeded random rounds, inventory uniqueness, score bounds, event effects and progression thresholds. Browser QA covers successful two/three-part builds, rewards, discoveries, refresh/resume, advanced problems/events, the first workshop upgrade, failed/explosive repairs, timeout, shutdown, restart, keyboard control, pause and console errors.
