# Interactive developer ID card

The badge displays Junior Software Developer, Aiman Farhan, the location, and Flutter / Java / Laravel. It shows the portrait configured in `src/data/portfolio.ts`, with the AF monogram as a fallback.

## Implementation

- `src/components/developer-card.tsx`: accessible HTML front/back and existing flip control.
- `src/components/use-card-physics.ts`: Pointer Events, capture, SVG synchronization, resize and visibility lifecycle.
- `src/lib/card-physics.ts`: configurable gravity, radial spring, damping, velocity and rotation limits, rotated-corner bounds, and resting state.
- `src/app/globals.css`: badge, metal attachment, lanyard, responsive sizes, and reduced-motion fallback.
- `scripts/test-card-physics.mjs`: focused numerical regression checks using Node's built-in assertions.

A custom requestAnimationFrame simulation avoids adding a physics/rendering dependency. The strap has a fixed anchor and a spring-limited length; gravity and tangential momentum create a damped pendulum. Vertical motion compresses or stretches the strap within limits. The HTML badge rotates about its attachment, which is also the SVG endpoint. This is a lightweight 2D spring approximation with subtle CSS depth, rather than a cloth or full 3D simulation.

Dragging captures one primary pointer and clamps the rotated badge inside the available area. Release preserves bounded velocity. A held-still release discards stale momentum. Narrow areas reduce rotation automatically. Resizing safely releases an active drag and resets the badge to its new resting position.

Frames use bounded delta time and substeps, update DOM transforms directly, and stop after settling. IntersectionObserver and document visibility suspend work offscreen/background. Observers, pointer capture, listeners and frames are cleaned up on unmount. Reduced-motion changes reset to a stable badge and allow vertical touch scrolling. Links and the flip button never require dragging.

## Preview and deploy

Use Node 24 LTS. Run `npm run dev` for the local Next.js preview. If Node is not on PATH in the original Windows workspace:

```powershell
$env:PATH = "$PWD\.tools\node-v24.22.3-win-x64;$env:PATH"
npm.cmd run dev
```

Run `npm run test:card`, `npm run lint`, `npm run typecheck`, and `npm run build:pages`. The Pages build still exports to `.next-pages/` with `/portfolio` asset paths. Push the reviewed source to `main` to use the existing Pages workflow; no workflow changes or backend are needed.

## Browser acceptance

Check 320, 375, 390, 430, 768, 1024, 1440 and 1920px. Drag horizontally, vertically and diagonally, release slowly and quickly, hold still before release, and repeat. Confirm the cord stays attached, the badge stays within its area, and motion eventually stops. Flip with keyboard and inspect both faces. Resize or rotate during a gesture, navigate away while swinging, background/restore the tab, and enable reduced motion. Verify normal vertical scrolling outside the card. Check original projects, gallery, resume and contact forms for regressions.

Desktop Edge and emulated touch checks cannot certify physical iOS Safari or Android Chrome behavior; check those devices before relying on device-specific gesture behavior.

## Validation results

- Numerical tests passed at six container sizes: extreme release velocities, rotated corners inside bounds, long frame gaps, pendulum crossing, settling and sleeping.
- ESLint, TypeScript, and the GitHub Pages production export passed.
- Headless Edge checked the eight requested viewport widths for diagonal dragging, post-release motion, return to rest, both card faces fitting, and horizontal overflow.
- Additional browser checks covered emulated touch dragging, vertical touch scrolling outside the badge, reduced motion, resize during drag, offscreen suspension/resume, navigation while swinging, and remount. The visibility handler was tested with a simulated visibility change.
- Existing static routes, project images, resume download, and back links passed at 390px and 1440px without browser errors. Desktop and mobile badge screenshots were visually reviewed.

Browser scripts and screenshots are local QA artifacts in the ignored `.tools/` directory. The repeatable numerical test is committed source under `scripts/`; it requires Node 24 for native TypeScript loading. A Node module-format detection warning during that test does not affect the application or test results.
