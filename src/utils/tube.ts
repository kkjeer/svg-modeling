import { bezierPoint, tangent } from "./math";
import { Side } from "./types";

export interface TubeProps {
  curve: number[];
  radii: Radius[];
  connect?: number[];
  end?: number[];
  startSide?: Side;
  mode?: TubeMode;
}

export interface Radius {
  radius: number;
  t: number;
}

export type TubeMode = "flat" | "tangent";

const DEBUG = false;
function debug(...args: any[]) {
  if (DEBUG) {
    console.log(...args);
  }
}

export function constantRadii(radius: number, numPoints: number = 4) {
  switch (numPoints) {
    case 4:
      return [
        { t: 0.0, radius },
        { t: 0.33, radius },
        { t: 0.67, radius },
        { t: 1.0, radius },
      ];
  }
  return [
    { t: 0.0, radius },
    { t: 0.33, radius },
    { t: 0.67, radius },
    { t: 1.0, radius },
  ];
}

export class Tube {
  // defining curve (in the middle of the computed points)
  private p_curve: number[] = [];

  // points defining the radius at different t-values along a bezier radius curve
  private p_radii: Radius[] = [];

  // points between the last point of the starting side and the first point of the other side
  private p_connect: number[] = [];

  // points between the last point of the other side and the first point of the starting side
  private p_end: number[] = [];

  // whether to start tracing points on the right or left side of the defining curve
  private p_startSide: Side = "right";

  // whether to define points horizontally distant from the defining curve
  // or perpendicular from the curve's tangent lines
  private p_mode: TubeMode = "tangent";

  constructor(curve?: number[]) {
    this.p_curve = curve ?? [];
  }

  props(props: TubeProps) {
    const {
      curve,
      radii,
      connect = this.p_connect,
      end = this.p_end,
      startSide = this.p_startSide,
      mode = this.p_mode,
    } = props;
    return this.curve(curve)
      .radii(radii)
      .connect(connect)
      .end(end)
      .startSide(startSide)
      .mode(mode);
  }

  curve(curve: number[]) {
    this.p_curve = curve;
    return this;
  }

  radii(radii: Radius[]) {
    this.p_radii = radii;
    return this;
  }

  connect(connect: number[]) {
    this.p_connect = connect;
    return this;
  }

  end(end: number[]) {
    this.p_end = end;
    return this;
  }

  startSide(startSide: Side) {
    this.p_startSide = startSide;
    return this;
  }

  mode(mode: typeof this.p_mode) {
    this.p_mode = mode;
    return this;
  }

  renameData(prefix: string, omitResult?: boolean) {
    const data: { [key: string]: number[] } = this.data(omitResult);
    const result: { [key: string]: number[] } = {};
    for (const key in data) {
      result[`${prefix}${key}`] = data[key];
    }
    return result;
  }

  data(omitStart?: boolean): { [key: string]: number[] } {
    const numPoints = 0.5 * this.p_curve.length;
    debug("num points:", numPoints);
    if (DEBUG) console.group("right");
    const start = this.getPoint(0);
    let rest: number[] = [];
    for (let i = 1; i < numPoints; ++i) {
      rest = rest.concat(this.getPoint(i));
    }
    if (DEBUG) console.groupEnd();
    if (DEBUG) console.group("left");
    let otherStart = this.getPoint(numPoints - 1, true);
    otherStart = [...this.p_connect, ...otherStart];
    let otherRest: number[] = [];
    for (let j = numPoints - 2; j >= 0; --j) {
      otherRest = otherRest.concat(this.getPoint(j, true));
    }
    const end = this.p_end ?? [];
    if (DEBUG) console.groupEnd();
    if (omitStart) {
      return {
        rest,
        otherStart,
        otherRest,
        end,
      };
    }
    return {
      start,
      rest,
      otherStart,
      otherRest,
      end,
    };
  }

  points() {
    const points: number[][] = [];
    return points;
  }

  private getPoint(idx: number, isOther?: boolean) {
    const side = !isOther
      ? this.p_startSide
      : this.p_startSide === "right"
      ? "left"
      : "right";
    const sign = side === "right" ? 1 : -1;
    const rIdx = !isOther ? idx : this.p_radii.length - 1 - idx;
    debug("radii:", this.p_radii, "idx:", idx, "rIdx:", rIdx);
    const { radius, t } = this.p_radii[rIdx];

    const point = bezierPoint(this.p_curve, t);
    let x = point[0],
      y = point[1];
    if (this.p_mode === "flat" || true) {
      x = this.p_curve[2 * idx];
      y = this.p_curve[2 * idx + 1];
    }

    const tanPoint = tangent(this.p_curve, t);
    const slope = tanPoint[0] === 0 ? 0 : tanPoint[1] / tanPoint[0];
    const perpSlope = tanPoint[1] === 0 ? 0 : -tanPoint[0] / tanPoint[1];
    const delta = sign * radius;

    let rx = x + sign * radius;
    let ry = y + rx * perpSlope;

    rx = x + sign * radius * Math.cos((slope * Math.PI) / 2);
    ry = y + sign * radius * Math.sin((slope * Math.PI) / 2);

    if (this.p_mode === "tangent") {
      rx = x + delta;
      ry = y + delta * perpSlope;
    } else {
      rx = x + delta;
      ry = y;
    }

    return [rx, ry];
  }
}
