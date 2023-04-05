export function inRangeInclusive(n: number, min: number, max: number) {
  return min <= n && n <= max;
}

export function bezierPoint(curve: number[], t: number) {
  if (curve.length % 2 !== 0) {
    console.warn("cannot get bezier point for odd-length curve:", curve);
    return [0, 0];
  }
  const numPoints = 0.5 * curve.length;
  switch (numPoints) {
    case 4:
      return cubicBezierPoint(curve, t);
  }
  console.warn("unknown bezier curve length:", curve);
  return [0, 0];
}

export function tangent(curve: number[], t: number) {
  if (curve.length % 2 !== 0) {
    console.warn("cannot get bezier point for odd-length curve:", curve);
    return [0, 0];
  }
  const numPoints = 0.5 * curve.length;
  switch (numPoints) {
    case 4:
      return cubicTangent(curve, t);
  }
  console.warn("unknown bezier curve length:", curve);
  return [0, 0];
}

export function controlPointsFromTValues(ts: number[]) {
  switch (ts.length) {
    case 4:
      return cubicControlPoints(ts);
  }
}

export function linearPoint(start: number[], end: number[], t: number) {
  const x = start[0] + t * (end[0] - start[0]);
  const y = start[1] + t * (end[1] - start[1]);
  return [x, y];
}

export function curveBetweenPoints(
  start: number[],
  end: number[],
  intermediates: { t: number; dx?: number; dy?: number }[],
) {
  let points: number[] = [];

  for (const i in intermediates) {
    const { t, dx = 0, dy = 0 } = intermediates[i];
    const p = linearPoint(start, end, t);
    p[0] += dx;
    p[1] += dy;
    points = points.concat(p);
  }

  points = points.concat(end);
  return points;
}

// P(t) = (1 - t)^3 * P0 +
//        3t(1-t)^2 * P1 +
//        3t^2(1-t) * P2 +
//        t^3 * P3
function cubicBezierPoint(curve: number[], t: number) {
  const p0 = curve.slice(0, 2);
  const p1 = curve.slice(2, 4);
  const p2 = curve.slice(4, 6);
  const p3 = curve.slice(6, 8);

  const c0 = Math.pow(1 - t, 3);
  const c1 = 3 * t * Math.pow(1 - t, 2);
  const c2 = 3 * Math.pow(t, 2) * (1 - t);
  const c3 = Math.pow(t, 3);

  const n = (idx: number) =>
    c0 * p0[idx] + c1 * p1[idx] + c2 * p2[idx] + c3 * p3[idx];
  return [n(0), n(1)];
}

// dP(t) / dt = 3(1 - t)^2 * (P1 - P0) +
//              6(1 - t)t * (P2 - P1) +
//              3t^2(P3 - P2)
function cubicTangent(curve: number[], t: number) {
  const p0 = curve.slice(0, 2);
  const p1 = curve.slice(2, 4);
  const p2 = curve.slice(4, 6);
  const p3 = curve.slice(6, 8);

  const c0 = 3 * Math.pow(1 - t, 2);
  const c1 = 6 * (1 - t) * t;
  const c2 = 3 * Math.pow(t, 2);

  const n = (idx: number) =>
    c0 * (p1[idx] - p0[idx]) +
    c1 * (p2[idx] - p1[idx]) +
    c2 * (p3[idx] - p2[idx]);
  return [n(0), n(1)];
}

// want to find: p0, p1, p2, p3 such that:
//
function cubicControlPoints(ts: number[]) {
  // const t0 = ts[0],
  //   t1 = ts[1],
  //   t2 = ts[2],
  //   t3 = ts[4];
}
