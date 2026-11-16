export const CARD_PHYSICS = {
  gravity: 1500,
  stiffness: 190,
  damping: 2.8,
  radialDamping: 10,
  angularStiffness: 48,
  angularDamping: 10,
  maxSpeed: 650,
  maxAngularSpeed: 2.2,
  maxAngle: 0.2,
  anchorY: 12,
  attachmentY: 16,
  inset: 9,
} as const;

export type CardBody = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  omega: number;
};
export type CardSpace = {
  width: number;
  height: number;
  cardWidth: number;
  cardHeight: number;
};
export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export function restPosition(space: CardSpace) {
  return {
    x: space.width / 2,
    y: Math.max(65, space.height - space.cardHeight - 32),
  };
}

export function restingBody(space: CardSpace): CardBody {
  return { ...restPosition(space), vx: 0, vy: 0, angle: 0, omega: 0 };
}

/** Bounds use all four rotated corners, not just the unrotated DOM rectangle. */
export function constrainBody(body: CardBody, space: CardSpace) {
  const config = CARD_PHYSICS;
  const angleLimit = Math.min(
    config.maxAngle,
    Math.max(
      0,
      (space.width - space.cardWidth - config.inset * 2) / space.cardHeight,
    ),
  );
  body.angle = clamp(body.angle, -angleLimit, angleLimit);
  const sin = Math.sin(body.angle),
    cos = Math.cos(body.angle);
  const corners = [-space.cardWidth / 2, space.cardWidth / 2].flatMap((x) =>
    [-config.attachmentY, space.cardHeight - config.attachmentY].map((y) => ({
      x: x * cos - y * sin,
      y: x * sin + y * cos,
    })),
  );
  const minX = config.inset - Math.min(...corners.map((p) => p.x));
  const maxX =
    space.width - config.inset - Math.max(...corners.map((p) => p.x));
  const minY = config.anchorY + 38 - Math.min(...corners.map((p) => p.y));
  const maxY =
    space.height - config.inset - Math.max(...corners.map((p) => p.y));
  const x = clamp(body.x, minX, Math.max(minX, maxX));
  const y = clamp(body.y, minY, Math.max(minY, maxY));
  if (body.x !== x) body.vx *= -0.16;
  if (body.y !== y) body.vy *= -0.16;
  body.x = x;
  body.y = y;
  // A taut strap allows a little give, but never an implausibly long cord.
  const rest = restPosition(space);
  const maxLength = rest.y - config.anchorY + 34;
  const dx = body.x - rest.x,
    dy = body.y - config.anchorY;
  const length = Math.hypot(dx, dy);
  if (length > maxLength) {
    body.x = rest.x + (dx / length) * maxLength;
    body.y = config.anchorY + (dy / length) * maxLength;
    const radialVelocity = (body.vx * dx + body.vy * dy) / length;
    if (radialVelocity > 0) {
      body.vx -= (radialVelocity * dx) / length;
      body.vy -= (radialVelocity * dy) / length;
    }
  }
  body.x = clamp(body.x, minX, Math.max(minX, maxX));
  body.y = clamp(body.y, minY, Math.max(minY, maxY));
}

/** Semi-implicit Euler with bounded substeps keeps long/variable frames stable. */
export function stepCard(body: CardBody, space: CardSpace, elapsed: number) {
  const c = CARD_PHYSICS;
  const duration = clamp(elapsed, 0, 1 / 30);
  const steps = Math.max(1, Math.ceil(duration / (1 / 120)));
  const dt = duration / steps;
  const rest = restPosition(space);
  const naturalLength = rest.y - c.anchorY - c.gravity / c.stiffness;
  for (let i = 0; i < steps; i++) {
    const dx = body.x - rest.x,
      dy = body.y - c.anchorY;
    const length = Math.max(1, Math.hypot(dx, dy));
    const radialSpeed = (body.vx * dx + body.vy * dy) / length;
    const tension =
      c.stiffness * (length - naturalLength) + c.radialDamping * radialSpeed;
    body.vx += ((-tension * dx) / length - c.damping * body.vx) * dt;
    body.vy += (c.gravity - (tension * dy) / length - c.damping * body.vy) * dt;
    body.vx = clamp(body.vx, -c.maxSpeed, c.maxSpeed);
    body.vy = clamp(body.vy, -c.maxSpeed, c.maxSpeed);
    body.x += body.vx * dt;
    body.y += body.vy * dt;
    const targetAngle = clamp(
      -Math.atan2(dx, dy) * 0.45 + body.vx * 0.00012,
      -c.maxAngle,
      c.maxAngle,
    );
    body.omega +=
      ((targetAngle - body.angle) * c.angularStiffness -
        body.omega * c.angularDamping) *
      dt;
    body.omega = clamp(body.omega, -c.maxAngularSpeed, c.maxAngularSpeed);
    body.angle += body.omega * dt;
    constrainBody(body, space);
  }
  const settled =
    Math.abs(body.x - rest.x) < 0.08 &&
    Math.abs(body.y - rest.y) < 0.08 &&
    Math.hypot(body.vx, body.vy) < 0.15 &&
    Math.abs(body.angle) < 0.001 &&
    Math.abs(body.omega) < 0.003;
  if (settled) Object.assign(body, restingBody(space));
  return !settled;
}
