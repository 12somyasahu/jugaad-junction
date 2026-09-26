# Jugaad Junction

A complete, dependency-free browser game about making roadside repairs with inappropriate scrap.

Created by [@12somyasahu](https://github.com/12somyasahu).

## How to launch

1. Install **Node.js 20 or newer** if it is not already installed.
2. Download and extract this repository, or clone it:

   ```powershell
   git clone https://github.com/12somyasahu/jugaad-junction.git
   cd jugaad-junction
   ```

   The repository is private, so cloning or downloading requires an account with access.
3. In the game folder, run `npm run dev`. No `npm install` is necessary.
4. Open **[http://localhost:5173](http://localhost:5173)** in your browser.
5. Click **OPEN THE SHOP** to start, or **CONTINUE SHIFT** to resume a saved game.

If you are using the original local project on this computer, run:

```powershell
cd D:\Gamathon\JugaadJunction
npm run dev
```

Keep the terminal running while playing; **Ctrl+C** stops the server. The localhost address works on the computer running the server. If the page does not load, check that the terminal shows the server address and has not been closed.

### Build and checks

```powershell
npm test
npm run build
```

The production build contains four static files in `dist/`. Serve that folder with any static HTTP server. ES modules require HTTP; don't double-click index.html.

## How to play

1. **Read the repair order.** A customer arrives with a broken object. Look at the required properties under **MAKE IT WORK WITH**.
2. **Check the street event.** The event panel explains any changes to prices, danger, patience or requirements for this round.
3. **Choose 2–3 scrap items.** Each card lists its properties. Click or tap cards to add them, or drag them into the workbench slots. The third item is optional.
4. **Cover every required property.** Matching requirement chips turn green. One item can cover multiple properties, and there are many valid combinations. Click a selected card or occupied slot to remove an item and try another.
5. **Press BUILD JUGAAD before the timer reaches zero.** A repair works when your selected items cover all required properties. If time runs out, the customer leaves and you lose reputation.
6. **Read your result.** See the invention name, Jugaad Score, cash change and reputation change. Cheaper, creative and safer combinations can improve your score. Successful new combinations are saved in **Jugaadpedia**.
7. **Click NEXT CUSTOMER.** Keep repairing to earn money and automatically upgrade your workshop. You begin with **100 reputation**; at zero, the shop shuts down.
8. **Try again.** On the shutdown screen, click **ANOTHER BRIGHT IDEA** to restart. Your discoveries and personal best remain saved.

### Example repair

A broken fan needs **power + rotation + structural**. If these cards are in your scrap pile, combine:

- **Battery** → power
- **Motor** → rotation + conductive
- **Wooden plank** → structural + binding

All three requirements are covered, so the fan works. This is only one solution: use the tags on the cards you actually receive to find alternatives.

### Controls

| Action | Control |
| --- | --- |
| Add scrap | Click/tap a card, or drag it into a slot |
| Remove scrap | Click/tap its selected card or occupied slot |
| Select the first nine scrap cards | **1–9** |
| Select the tenth scrap card | **0** |
| Build the repair | **Space** or **BUILD JUGAAD** |
| Pause/resume gameplay | **Escape** or the pause button |
| Toggle sound | Music-note button, or **Settings** |
| Toggle animations and particles | **Settings** |
| View saved inventions | **Jugaadpedia** |

Menus and switching away from the tab pause the patience timer. In rounds with more than ten cards, use the mouse or touch to select the extra cards.

### Progress and saving

Cash can go negative: reputation is the survival resource. Successful net earnings unlock five workshop levels automatically. New items unlock on round 3, advanced problems on rounds 3–4, and patience decreases to a 23-second floor. Every generated inventory contains at least one valid solution.

Ten chaos events alter prices, danger, available inventory, required properties, patience or rewards. Safety influences scoring and inspection penalties; incomplete high-danger repairs explode. Functionality is deterministic, so a fully covered repair works.

The current shift, discoveries (latest 100), best total score and settings are saved in localStorage under `jugaad-junction-v1`. Refresh and choose Continue Shift. Restart resets the current shift while preserving discoveries and personal best. Data is specific to browser and origin; use the same localhost port to resume.

## Tuning

**engine.js** contains `BALANCE`, material tags/costs/danger, problem requirements, events, score weights, rewards, inventory generation and unlock rules. Adjust `BALANCE.levels` for upgrade thresholds, `baseTime/minTime/timeDecay` for pressure and `failurePenalty/timeoutPenalty` for survival.

`game.js` contains the UI state machine, original SVG illustrations, pointer input, save logic, procedural Web Audio and result presentation. `style.css` contains the responsive workshop appearance and reduced-motion styles. There are no external fonts, image/audio downloads, framework packages or network services.

## Validation

Node tests check alternate solutions, all problem/event variants, 500 seeded random rounds, inventory uniqueness, score bounds, event effects and progression thresholds. Browser QA covers successful two/three-part builds, rewards, discoveries, refresh/resume, advanced problems/events, the first workshop upgrade, failed/explosive repairs, timeout, shutdown, restart, keyboard control, pause and console errors.
