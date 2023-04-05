import { TubeFingerRig } from "../rigs/base/person-rig";
import { inRangeInclusive } from "./math";
import { Modifier, Path } from "./path";
import { Radius, TubeProps } from "./tube";
import {
  Cubic,
  Direction,
  DirectionRanges,
  PathRender,
  Point,
  Quad,
  Quartic,
  Subset,
  SVGRenderBase,
  Vec,
} from "./types";

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.substring(1, str.length);
}

export function isFlatObject(obj: { [key: string]: any }) {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      return false;
    }
  }
  return true;
}

export function editObject(obj: { [key: string]: any }, key: string, val: any) {
  let edit = obj;
  const keys = key.split(".");
  // console.log("editing object", edit, "with keys", keys);
  for (let i = 0; i < keys.length - 1; ++i) {
    if (!keys[i]) {
      continue;
    }
    edit = edit[keys[i]];
  }
  // console.log("end: edit:", edit);
  edit[keys[keys.length - 1]] = val;
  return obj;
}

export function deepCopy<T>(obj: T): T {
  if (!obj) return obj;
  return JSON.parse(JSON.stringify(obj));
}

export function prefixKeys(obj: { [key: string]: any }, prefix: string) {
  const result: { [key: string]: any } = {};
  for (const key in obj) {
    result[`${prefix}${key}`] = obj[key];
  }
  return result;
}

export function reflectAndReverse(
  points: number[][],
  noReverse: boolean = false,
) {
  const result: number[][] = [];

  let arrIdx = points.length - 1;
  while (arrIdx >= 0) {
    const currPoints: number[] = [];
    let arr = points[arrIdx];
    if (arr.length === 5) {
      arr = arr.slice(0, 4);
    }
    if (arr.length < 4) {
      --arrIdx;
      continue;
    }
    let eltIdx = arr.length - 4;
    while (eltIdx >= 0) {
      currPoints.push(-arr[eltIdx]);
      currPoints.push(arr[eltIdx + 1]);
      eltIdx -= 2;
    }
    --arrIdx;
    if (arrIdx >= 0 && points[arrIdx].length >= 2) {
      const xSign = noReverse ? 1 : -1;
      currPoints.push(xSign * points[arrIdx][points[arrIdx].length - 2]);
      currPoints.push(points[arrIdx][points[arrIdx].length - 1]);
    }
    result.push(currPoints);
  }

  return result;
}

export function reverse1D(start: number[], end: number[]): number[] {
  const result: number[] = [];

  for (let i = start.length - 4; i >= 0; i -= 2) {
    result.push(start[i]);
    result.push(start[i + 1]);
  }

  const endpoint = getEndpoint(end);
  result.push(endpoint[0]);
  result.push(endpoint[1]);

  return result;
}

export function flip1D(start: number[], end: number[]): number[] {
  return scale1D(reverse1D(start, end), -1, 1);
}

export type PointsArr = number[] | number[][];

export function isNumberArr(points: PointsArr) {
  return typeof points[0] === "number";
}

export function addArr(points: number[][]) {
  return (arr: PointsArr) => {
    if (!arr) return;
    if (isNumberArr(arr)) {
      points.push(arr as number[]);
    } else {
      for (const i in arr) {
        points.push(arr[i] as number[]);
      }
    }
  };
}

export function shift1D(points: number[], x: number, y: number) {
  return points.map((n: number, idx: number) =>
    idx % 2 === 0 ? n + x : n + y,
  );
}

export function shift2D(points: number[][], x: number, y: number) {
  return points.map((arr: number[]) =>
    arr.map((n: number, idx: number) => (idx % 2 === 0 ? n + x : n + y)),
  );
}

export function scale1D(points: number[], x: number, y: number) {
  return points.map((n: number, idx: number) =>
    idx % 2 === 0 ? n * x : n * y,
  );
}

export function scale2D(points: number[][], x: number, y: number) {
  return points.map((arr: number[]) =>
    arr.map((n: number, idx: number) => (idx % 2 === 0 ? n * x : n * y)),
  );
}

export function scaleData1D(
  data: { [key: string]: number[] },
  x: number,
  y: number = 1,
) {
  const result = deepCopy(data);
  for (const key in result) {
    result[key] = scale1D(result[key], x, y);
  }
  return result;
}

export function shiftEndpoint(
  points: number[],
  offset: Partial<Vec>,
  mult: number = 1.0,
) {
  const result = [...points];
  if (result.length < 2) {
    return result;
  }
  result[result.length - 2] += (offset.x ?? 0) * mult;
  result[result.length - 1] += (offset.y ?? 0) * mult;
  return result;
}

export function shiftStartpoint(
  points: number[],
  offset: Partial<Vec>,
  mult: number = 1.0,
) {
  const result = [...points];
  if (result.length < 2) {
    return result;
  }
  result[0] += (offset.x ?? 0) * mult;
  result[1] += (offset.y ?? 0) * mult;
  return result;
}

export function shiftPenultimate(
  points: number[],
  offset: Partial<Vec>,
  mult: number = 1.0,
) {
  const result = [...points];
  if (result.length < 4) {
    return result;
  }
  result[result.length - 4] += (offset.x ?? 0) * mult;
  result[result.length - 3] += (offset.y ?? 0) * mult;
  return result;
}

export function shiftSecond(
  points: number[],
  offset: Partial<Vec>,
  mult: number = 1.0,
) {
  const result = [...points];
  if (result.length < 4) {
    return result;
  }
  result[2] += (offset.x ?? 0) * mult;
  result[3] += (offset.y ?? 0) * mult;
  return result;
}

export function shiftVec(points: number[], offset: Vec) {
  return shift1D(points, offset.x, offset.y);
}

export function shiftUpToQuad(points: number[], offset: Quad) {
  if (points.length < 2) {
    return points;
  }
  const result = [...points];
  if (result.length >= 4) {
    result[0] += offset.x0;
    result[1] += offset.y0;
  }
  result[result.length - 2] += offset.x1;
  result[result.length - 1] += offset.y1;
  return result;
}

export function shiftUpToCubic(points: number[], offset: Cubic) {
  if (points.length <= 4) {
    return shiftUpToQuad(points, {
      x0: offset.x1,
      y0: offset.y1,
      x1: offset.x2,
      y1: offset.y2,
    });
  }
  if (points.length !== 6) {
    return points;
  }
  const result = [...points];
  result[0] += offset.x0;
  result[1] += offset.y0;
  result[2] += offset.x1;
  result[3] += offset.y1;
  result[4] += offset.x2;
  result[5] += offset.y2;
  return result;
}

export function shiftUpToQuartic(points: number[], offset: Quartic) {
  if (points.length <= 6) {
    return shiftUpToCubic(points, {
      x0: offset.x1,
      y0: offset.y1,
      x1: offset.x2,
      y1: offset.y2,
      x2: offset.x3,
      y2: offset.y2,
    });
  }
  if (points.length !== 8) {
    return points;
  }
  const result = [...points];
  result[0] += offset.x0;
  result[1] += offset.y0;
  result[2] += offset.x1;
  result[3] += offset.y1;
  result[4] += offset.x2;
  result[5] += offset.y2;
  result[6] += offset.x3;
  result[7] += offset.y3;
  return result;
}

export function shiftTubePropsFinger(
  tubeProps: TubeProps,
  offset: TubeFingerRig,
): TubeProps {
  let curve = [...tubeProps.curve];
  if (curve.length >= 8) {
    curve = curve.slice(2);
  }
  curve = shiftUpToCubic(curve, offset.curve);

  let radiusCurve: number[] = [];
  for (const i in tubeProps.radii) {
    radiusCurve.push(tubeProps.radii[i].t);
    radiusCurve.push(tubeProps.radii[i].radius);
  }
  radiusCurve = shiftUpToQuartic(radiusCurve, offset.radii);

  const radii: Radius[] = [];
  for (let i = 0; i < radiusCurve.length - 1; i += 2) {
    radii.push({ t: radiusCurve[i], radius: radiusCurve[i + 1] });
  }

  if (!tubeProps.connect) {
    return { curve, radii };
  }

  const connect = shiftVec(tubeProps.connect, offset.connect);

  return { curve, radii, connect };
}

export function reverseCubic(start: Cubic, end: Vec | Quad | Cubic): Cubic {
  const result = {
    x0: start.x1,
    y0: start.y1,
    x1: start.x0,
    y1: start.y0,
  };

  if ((end as Vec).hasOwnProperty("x")) {
    return { ...result, x2: (end as Vec).x, y2: (end as Vec).y };
  }
  if ((end as Cubic).hasOwnProperty("x2")) {
    return { ...result, x2: (end as Cubic).x2, y2: (end as Cubic).y2 };
  }
  if ((end as Quad).hasOwnProperty("x1")) {
    return { ...result, x2: (end as Quad).x1, y2: (end as Quad).y1 };
  }

  return { ...result, x2: 0, y2: 0 };
}

export function flipCubic(start: Cubic, end: Vec | Quad | Cubic): Cubic {
  return scaleOffset(reverseCubic(start, end), -1, 1);
}

export function scaleOffset<T extends Vec | Quad | Cubic>(
  offset: Vec | Quad | Cubic,
  x: number = -1,
  y: number = 1,
): T {
  const result: { [key: string]: number } = deepCopy(offset as any);
  for (const key in result) {
    if (key.startsWith("x")) {
      result[key] *= x;
    } else if (key.startsWith("y")) {
      result[key] *= y;
    }
  }
  return result as any;
}

export function getStartpoint(points: number[]) {
  if (points.length < 2) {
    return [];
  }
  return points.slice(0, 2);
}

export function getEndpoint(points: number[]) {
  if (points.length < 2) {
    return [];
  }
  return points.slice(-2);
}

export function getSecond(points: number[]) {
  if (points.length < 4) {
    return [];
  }
  return points.slice(2, 4);
}

export function getPenultimate(points: number[]) {
  if (points.length < 4) {
    return [];
  }
  return points.slice(-4);
}

export function vecContainsNonZero(vec: Vec) {
  return vec.x !== 0 || vec.y !== 0 || vec.z !== 0;
}

export function getUrl(id: string) {
  if (!id) {
    return id;
  }
  if (id.startsWith("url(#") && id.endsWith(")")) {
    return id;
  }
  return `url(#${id})`;
}

export function move(points: number[]) {
  if (points.length < 2) {
    return [];
  }
  return [points[points.length - 2], points[points.length - 1], Modifier.Move];
}

export function transformOrigin(origin: Vec, width: number, height: number) {
  return `${(origin.x * width) / 100}px ${(origin.y * height) / 100}px`;
}

export function getDirection(
  ranges: DirectionRanges,
  rotation: Vec | undefined = undefined,
  direction: Direction | undefined = undefined,
): Direction {
  if (direction) {
    return direction;
  }

  if (!rotation) {
    return "front";
  }

  const { y } = rotation;
  const { left, right } = ranges;
  if (inRangeInclusive(y, left[1] + 1, right[0] - 1)) {
    return "front";
  }
  if (inRangeInclusive(y, right[0], right[1])) {
    return "right";
  }
  if (inRangeInclusive(y, left[0], left[1])) {
    return "left";
  }

  return "back";
}

export function getStyle(
  p: Point,
  direction: Direction,
  rotYLeft: number,
  rotYRight: number,
  width: number,
  height: number,
): React.CSSProperties {
  const { position, axis, degrees, rotation } = p;

  const transformedOrigin = transformOrigin(position, width, height);

  if (axis && degrees) {
    return {
      transform: `rotate3d(${axis.x}, ${axis.y}, ${axis.z}, ${degrees}deg)`,
      transformOrigin: transformedOrigin,
    };
  }

  if (rotation) {
    const scale = 1.0 + (position.z ?? 0) / 100;
    let scaleX = scale;
    if (direction === "left") {
      scaleX = -scaleX;
    }

    let rotX = rotation.x;
    let rotY = rotation.y;
    let rotZ = rotation.z;
    if (direction === "left") {
      rotY = rotation.y + rotYLeft;
    }
    if (direction === "right") {
      rotY = rotation.y + rotYRight;
    }

    return {
      transform: `scaleX(${scaleX}) scaleY(${scale}) scaleZ(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
      transformOrigin: transformedOrigin,
    };
  }

  return {};
}

export function adjustScale(
  style: React.CSSProperties,
  delta: number,
): React.CSSProperties {
  return adjustScaleComponent(
    adjustScaleComponent(adjustScaleComponent(style, delta, "X"), delta, "Y"),
    delta,
    "Z",
  );
}

export function adjustScaleComponent(
  style: React.CSSProperties,
  delta: number,
  comp: "X" | "Y" | "Z",
): React.CSSProperties {
  const { transform = `scale${comp}(1)` } = style;
  const scaleIdx = transform.indexOf(`scale${comp}(`) + `scale${comp}(`.length;
  const scaleEndIdx = transform.indexOf(")", scaleIdx);
  let scale = Number(transform.substring(scaleIdx, scaleEndIdx));
  if (isNaN(scale)) {
    return style;
  }
  scale += delta;
  const before = transform.substring(0, transform.indexOf(`scale${comp}(`));
  const after = transform.substring(scaleEndIdx + 1);
  const newTransform = `${before}scale${comp}(${scale})${after}`;
  return { ...style, transform: newTransform };
}

export function isFront(direction: Direction) {
  return direction === "front";
}

export function isSide(direction: Direction) {
  return direction === "left" || direction === "right";
}

export function isBack(direction: Direction) {
  return direction === "back";
}

export function path(
  points: number[][],
  width: number,
  height: number,
  origin?: Vec,
  params?: Partial<SVGRenderBase>,
): PathRender {
  const d = new Path(width, height).points(points, origin).stop();
  return {
    type: "path" as any,
    d,
    ...(params || {}),
  };
}

export function prettyName(s: string) {
  return s
    .split("_")
    .map((word) => capitalize(word))
    .join(" ");
}

export function makeId(str: string) {
  return str.toLowerCase().replace(/'/g, "").replace(/ /g, "");
}

export function combineRigs<T>(rig: T, startingRig: Subset<T> | undefined): T {
  const result = deepCopy(rig);
  if (!startingRig) {
    return result;
  }

  for (const key in rig) {
    const val = (result as any)[key];
    const startingVal = (startingRig as any)[key];
    if (typeof val === "number") {
      const delta = startingVal ?? 0;
      (result as any)[key] = val + delta;
    } else {
      (result as any)[key] = combineRigs(val, startingVal);
    }
  }

  return result;
}
