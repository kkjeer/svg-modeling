import { Vec } from "./types";

export enum Modifier {
  Move = Number.MIN_SAFE_INTEGER,
  Smooth = Number.MAX_SAFE_INTEGER,
}

export class Path {
  path: string = "";
  shiftX: number = 0;
  shiftY: number = 0;
  scaleX: number = 1;
  scaleY: number = 1;

  w: number;
  h: number;

  constructor(width: number, height: number) {
    this.w = width;
    this.h = height;
  }

  x(x: number) {
    return ((x + this.shiftX) * this.w) / 100;
  }

  y(y: number) {
    return ((y + this.shiftY) * this.h) / 100;
  }

  shift(x: number, y: number) {
    this.shiftX = x;
    this.shiftY = y;
    return this;
  }

  scale(x: number, y: number) {
    this.scaleX = x;
    this.scaleY = y;
    return this;
  }

  move(x: number, y: number) {
    this.path += `M ${this.x(x)} ${this.y(y)} `;
    return this;
  }

  line(x: number, y: number) {
    this.path += `L ${this.x(x)} ${this.y(y)} `;
    return this;
  }

  horizontal(x: number) {
    this.path += `H ${this.x(x)} `;
    return this;
  }

  vertical(y: number) {
    this.path += `V ${this.y(y)} `;
    return this;
  }

  quad(x1: number, y1: number, xEnd: number, yEnd: number) {
    this.path += `Q ${this.x(x1)} ${this.y(y1)} ${this.x(xEnd)} ${this.y(
      yEnd,
    )} `;
    return this;
  }

  cubic(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    xEnd: number,
    yEnd: number,
  ) {
    this.path += `C ${this.x(x1)} ${this.y(y1)} ${this.x(x2)} ${this.y(
      y2,
    )} ${this.x(xEnd)} ${this.y(yEnd)} `;
    return this;
  }

  smooth(x2: number, y2: number, xEnd: number, yEnd: number) {
    this.path += `S ${this.x(x2)} ${this.y(y2)} ${this.x(xEnd)} ${this.y(
      yEnd,
    )} `;
    return this;
  }

  points(p: number[][], origin?: Vec) {
    const allPoints = origin
      ? p.map((pts) =>
          pts.map((n, idx) => (idx % 2 === 0 ? n + origin.x : n + origin.y)),
        )
      : p;
    let result = this;
    for (const i in allPoints) {
      const pts = allPoints[i];
      switch (pts.length) {
        case 2: {
          result = this.line(pts[0], pts[1]);
          break;
        }
        case 3: {
          result = this.move(pts[0], pts[1]);
          break;
        }
        case 4: {
          result = this.quad(pts[0], pts[1], pts[2], pts[3]);
          break;
        }
        case 5: {
          result = this.smooth(pts[0], pts[1], pts[2], pts[3]);
          break;
        }
        case 6: {
          result = this.cubic(pts[0], pts[1], pts[2], pts[3], pts[4], pts[5]);
          break;
        }
      }
    }
    return result;
  }

  arc(
    rx: number,
    ry: number,
    xAxisRotation: number,
    largeArcFlag: number,
    sweepFlag: number,
    x: number,
    y: number,
  ) {
    this.path += `A ${this.x(rx)} ${this.y(
      ry,
    )} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${this.x(x)} ${this.y(
      y,
    )} `;
    return this;
  }

  // a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
  arcRel(
    rx: number,
    ry: number,
    xAxisRotation: number,
    largeArcFlag: number,
    sweepFlag: number,
    dx: number,
    dy: number,
  ) {
    this.path += `a ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${dx} ${dy} `;
    return this;
  }

  dot(radius: number) {
    this.arcRel(radius, radius, 0, 1, 0, radius * 2, 0);
    return this.arcRel(radius, radius, 0, 1, 0, -radius * 2, 0);
  }

  stop(): string {
    this.path = this.path.substring(0, this.path.length - 1);
    return this.path;
  }
}
