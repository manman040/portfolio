import assert from "node:assert/strict";
import {
  CARD_PHYSICS as config,
  constrainBody,
  restingBody,
  restPosition,
  stepCard,
} from "../src/lib/card-physics.ts";

for (const width of [272, 327, 342, 382, 500, 600]) {
  const space = {
    width,
    height: width < 400 ? 506 : 536,
    cardWidth: width < 290 ? 232 : width < 400 ? 260 : 300,
    cardHeight: width < 290 ? 360 : width < 400 ? 370 : 394,
  };
  const rest = restPosition(space);
  for (const direction of [-1, 1]) {
    const body = {
      ...restingBody(space),
      x: rest.x + direction * 300,
      y: rest.y - 90,
      vx: direction * 650,
      vy: -650,
      angle: direction * 0.2,
      omega: 2.2,
    };
    constrainBody(body, space);
    let stopped = false;
    for (let frame = 0; frame < 2400; frame++) {
      const active = stepCard(body, space, frame % 37 === 0 ? 4 : 1 / 120);
      assert(
        Object.values(body).every(Number.isFinite),
        "Stable after long frame gaps",
      );
      assert(Math.abs(body.angle) <= config.maxAngle, "Angular limit");
      const sin = Math.sin(body.angle),
        cos = Math.cos(body.angle);
      for (const x of [-space.cardWidth / 2, space.cardWidth / 2]) {
        for (const y of [
          -config.attachmentY,
          space.cardHeight - config.attachmentY,
        ]) {
          const px = body.x + x * cos - y * sin,
            py = body.y + x * sin + y * cos;
          assert(
            px >= -0.01 &&
              px <= width + 0.01 &&
              py >= 0 &&
              py <= space.height + 0.01,
            `Rotated card stays inside ${width}px area`,
          );
        }
      }
      if (!active) {
        stopped = true;
        break;
      }
    }
    assert(stopped, "Simulation sleeps after settling");
    assert.equal(body.x, rest.x);
    assert.equal(body.y, rest.y);
  }
}
const pendulumSpace = { width: 600, height: 536, cardWidth: 300, cardHeight: 394 };
const pendulum = restingBody(pendulumSpace);
pendulum.x += 55;
let crossedRest = false;
for (let frame = 0; frame < 600; frame++) {
  stepCard(pendulum, pendulumSpace, 1 / 120);
  if (pendulum.x < pendulumSpace.width / 2 - 1) crossedRest = true;
}
assert(crossedRest, "Pendulum swings past rest instead of only easing back");
console.log(
  "PASS: extreme releases, rotated bounds, variable frames, settling and sleep at six container sizes",
);
