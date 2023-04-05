import { Rig } from "../../rigs/base/rig";
import { Filter } from "../../utils/filterElements";
import { IGradient } from "../../utils/gradient";
import { bezierPoint, inRangeInclusive, tangent } from "../../utils/math";
import { move } from "../../utils/misc";
import { Modifier, Path } from "../../utils/path";
import { Radius } from "../../utils/tube";
import {
  CircleRender,
  Direction,
  DirectionRanges,
  PathRender,
  Point,
  SVGRender,
  SVGRenderBase,
  Vec,
} from "../../utils/types";

export interface Info {
  points: number[][];
  sidePoints: number[][];
  color: string;
}

export const EMPTY_INFO: Pick<Info, "points" | "sidePoints"> = {
  points: [],
  sidePoints: [],
};

export class Model {
  protected rig: Rig = {};
  protected width: number = 0;
  protected height: number = 0;
  protected elts: { [id: string]: SVGRender } = {};
  protected gradients: { [id: string]: IGradient } = {};
  protected filters: { [id: string]: Filter } = {};

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getElts = () => {
    return this.elts;
  };

  getGradients = () => {
    return this.gradients;
  };

  getFilters = () => {
    return this.filters;
  };

  public draw(rig: Rig) {
    return this.elts;
  }

  protected addElts(
    model: Model,
    drawFcn: () => { [id: string]: SVGRender } = () => model.draw(this.rig),
  ) {
    this.elts = { ...this.elts, ...drawFcn() };
    this.gradients = { ...this.gradients, ...model.getGradients() };
    this.filters = { ...this.filters, ...model.getFilters() };
  }

  path = (
    points: number[][],
    origin?: Vec,
    params?: Partial<SVGRenderBase>,
  ): PathRender => {
    const d = new Path(this.width, this.height).points(points, origin).stop();
    return {
      type: "path" as any,
      d,
      ...(params || {}),
    };
  };

  circle = (
    pr: number,
    px: number,
    py: number,
    origin?: Vec,
    params?: Partial<SVGRenderBase>,
  ): CircleRender => {
    const r = (pr * this.width) / 100;
    let x = px + (origin?.x ?? 0);
    x = (x * this.width) / 100;
    let y = py + (origin?.y ?? 0);
    y = (y * this.height) / 100;
    return {
      type: "circle" as any,
      r,
      x,
      y,
      ...(params || {}),
    };
  };

  info = (color: string) => {
    return { ...EMPTY_INFO, color };
  };

  transformOrigin = (origin: Vec) => {
    return `${(origin.x * this.width) / 100}px ${
      (origin.y * this.height) / 100
    }px`;
  };

  getDirection = (
    ranges: DirectionRanges,
    rotation: Vec | undefined = undefined,
    direction: Direction | undefined = undefined,
  ): Direction => {
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
  };

  getStyle: (
    p: Point,
    direction: Direction,
    rotYLeft: number,
    rotYRight: number,
  ) => React.CSSProperties = (
    p: Point,
    direction: Direction,
    rotYLeft: number,
    rotYRight: number,
  ) => {
    const { position, axis, degrees, rotation } = p;

    const transformOrigin = this.transformOrigin(position);

    if (axis && degrees) {
      return {
        transform: `rotate3d(${axis.x}, ${axis.y}, ${axis.z}, ${degrees}deg)`,
        transformOrigin,
      };
    }

    if (rotation) {
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
        transform: `${this.getScale(
          p,
          direction,
        )} rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
        transformOrigin,
      };
    }

    return {};
  };

  getScale = (p: Point, direction: Direction) => {
    const { position } = p;

    const scale = 1.0 + (position.z ?? 0) / 100;
    let scaleX = scale;
    if (direction === "left") {
      scaleX = -scaleX;
    }

    return `scaleX(${scaleX}) scaleY(${scale}) scaleZ(${scale})`;
  };

  getPointsFromInfo = (info: Info, direction: Direction) => {
    if (direction === "front" || direction === "back") {
      return info.points;
    }
    return info.sidePoints;
  };

  isSide = (direction: Direction) => {
    return direction === "left" || direction === "right";
  };

  move = (points: number[]) => {
    if (points.length < 2) {
      return [];
    }
    return [
      points[points.length - 2],
      points[points.length - 1],
      Modifier.Move,
    ];
  };

  smooth = (points: number[]) => {
    if (points.length < 4) {
      return [];
    }
    return [...points, Modifier.Smooth];
  };

  drawPoints = (
    info: any,
    addPoints: (points: number[] | number[][]) => void,
  ) => {
    for (let i = 0; i < Object.keys(info).length; ++i) {
      const key = Object.keys(info)[i];
      const points = info[key];
      if (i === 0) {
        addPoints(this.move(points));
      } else {
        addPoints(points);
      }
    }
  };

  debugTube(curve: number[], radii: Radius[], origin: Vec, id: string) {
    for (const i in radii) {
      const { t, radius } = radii[i];
      const point = bezierPoint(curve, t);
      const x = point[0],
        y = point[1];
      const tanPoint = tangent(curve, t);

      const slope = tanPoint[0] === 0 ? 0 : tanPoint[1] / tanPoint[0];
      const perpSlope = tanPoint[1] === 0 ? 0 : -tanPoint[0] / tanPoint[1];
      const delta = radius;

      // points along tangent line
      const x1 = x - delta,
        y1 = y - delta * slope,
        x2 = x + delta,
        y2 = y + delta * slope;

      // points along line perpendicular to tangent line
      const px1 = x - delta,
        py1 = y - delta * perpSlope,
        px2 = x + delta,
        py2 = y + delta * perpSlope;

      this.elts[`${id}debugtubepoint${t}`] = this.circle(
        (0.1 * this.width) / 100,
        x,
        y,
        origin,
        {
          fill: "blue",
        },
      );

      this.elts[`${id}debugtubetangent${t}`] = this.path(
        [move([x1, y1]), [x2, y2]],
        origin,
        {
          stroke: "cyan",
          thickness: 1,
        },
      );

      this.elts[`${id}debugtubetangentperp${t}`] = this.path(
        [move([px1, py1]), [px2, py2]],
        origin,
        {
          stroke: "green",
          thickness: 1,
        },
      );
    }

    // actual curve
    this.elts[`${id}debugtubecurve`] = this.path(
      [move(curve.slice(0, 2)), curve.slice(2)],
      origin,
      {
        stroke: "purple",
        thickness: 1,
      },
    );
  }
}
