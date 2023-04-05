export interface Vec {
  x: number;
  y: number;
  z?: number;
}

export interface Quad {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export interface Cubic extends Quad {
  x2: number;
  y2: number;
}

export interface Quartic extends Cubic {
  x3: number;
  y3: number;
}

export function emptyVec(z?: boolean): Vec {
  const vec: Vec = { x: 0, y: 0 };
  if (z) {
    vec.z = 0;
  }
  return vec;
}

export function emptyQuad(): Quad {
  return { x0: 0, y0: 0, x1: 0, y1: 0 };
}

export function emptyCubic(): Cubic {
  return { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0, y2: 0 };
}

export function emptyQuartic(): Quartic {
  return { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0 };
}

export type Direction = "front" | "back" | "left" | "right";

export interface DirectionRanges {
  left: number[];
  right: number[];
}

export interface Point {
  position: Vec;
  at?: Vec;
  up?: Vec;
  axis?: Vec;
  degrees?: number;
  rotation?: Vec;
}

export interface SVGRenderBase {
  type: "path" | "circle";
  stroke?: string;
  fill?: string;
  thickness?: string | number;
  filter?: string;
  style?: React.CSSProperties;
  strokeLinecap?: "butt" | "round" | "square" | "inherit";
}

export interface PathRender extends SVGRenderBase {
  readonly type: "path";
  d: string;
}

export interface CircleRender extends SVGRenderBase {
  readonly type: "circle";
  r: number;
  x: number;
  y: number;
}

export type SVGRender = PathRender | CircleRender;

export type Side = "right" | "left";

export type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object
    ? Subset<K[attr]>
    : K[attr] extends object | null
    ? Subset<K[attr]> | null
    : K[attr] extends object | null | undefined
    ? Subset<K[attr]> | null | undefined
    : K[attr];
};
