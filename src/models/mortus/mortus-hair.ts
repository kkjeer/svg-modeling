import { bezierPoint } from "../../utils/math";
import { prefixKeys } from "../../utils/misc";
import { HairModel, LineArray } from "../base/person/hair";

export class MortusHairModel extends HairModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.color = "#a01a15";
    this.lineColor = "#510e08";
    this.lineColor = "#860305";
    this.lineThickness = 1;
  }

  backdropData = () => {
    const lowerLeft = [-11.2, 9.8];
    const leftCurls = {
      chin: [-12.4, 7.8, -11.4, 6.2],
      earbottom: [-11.4, 4.6, -12.0, 3.6],
      eartop: [-12.4, 2.0, -11.8, 0.2],
      temple: [-12.0, -2.0, -11.2, -4.0],
    };
    const top = {
      left: [-9.0, -6.8, -5.0, -7.2],
      mid: [-3.0, -7.8, 0.0, -7.4],
      right: [3.0, -7.8, 5.0, -7.2],
      rightTemple: [9.0, -6.8, 11.2, -4.0],
    };
    const rightCurls = {
      temple: [12.8, -2.0, 11.9, 0.6],
      eartop: [12.3, 2.2, 11.7, 3.6],
      earbottom: [10.8, 4.4, 11.4, 6.2],
      chin: [10.4, 7.8, 11.6, 9.8],
    };
    const bottom = {
      curl: [10.8, 10.0, 10.0, 9.8],
      curlUp: [9.4, 9.6, 9.4, 9.4],
      right: [8.8, 9.2, 7.0, 9.0, 4.0, 8.6],
      mid: [-4.0, 8.6],
      left: [-6.0, 9.0, -7.0, 8.4, -9.8, 9.2],
      end: [-9.6, 9.8],
      bump: [-10.4, 10.0],
    };

    return {
      lowerLeft,
      ...prefixKeys(leftCurls, "leftcurls"),
      ...prefixKeys(top, "top"),
      ...prefixKeys(rightCurls, "rightcurls"),
      ...prefixKeys(bottom, "bottom"),
    };
  };

  backdropLinesData = () => {
    const left: LineArray = [
      {
        start: [-12.0, 3.0],
        curve: [-10.5, 1.6, -9.0, 0.4],
      },
      {
        start: [-11.3, 6.6],
        curve: [-10.5, 5.2, -9.0, 3.2],
      },
      {
        start: [-10.8, 9.8],
        curve: [-8.8, 7.6, -7.4, 5.0],
      },
      {
        start: [-6.6, 8.6],
        curve: [-5.7, 7.8, -4.8, 5.0],
      },
    ];

    const right: LineArray = [
      {
        start: [11.9, 3.0],
        curve: [10.5, 1.6, 9.0, 0.4],
      },
      {
        start: [11.2, 6.6],
        curve: [10.5, 5.2, 9.0, 3.2],
      },
      {
        start: [10.8, 9.7],
        curve: [8.8, 7.6, 7.4, 5.0],
      },
      {
        start: [6.7, 8.9],
        curve: [5.8, 8.0, 4.8, 5.0],
      },
    ];

    return [...left, ...right];
  };

  bangsData = () => {
    const lowerLeft = [-9.4, 0.6];
    const left = {
      bottom: [-4.8, -1.6],
      top: [-3.4, -2.2, -3.4, -4.0],
    };
    const top = {
      leftBump: [-2.8, -4.5, -1.6, -4.3],
      left: [0.0, -4.25],
      right: [2.0, -4.3],
      rightBump: [3.4, -4.5, 4.0, -4.0],
    };
    const right = {
      top: [3.6, -2.8, 5.4, -1.4],
      bottom: [9.4, 0.8],
    };
    const finish = {
      right: [10.2, -2.4, 9.0, -5.4],
      top: [2.4, -7.0, -2.4, -7.0, -9.2, -5.4],
      left: [-10.2, -2.4, -9.4, 0.6],
    };

    return {
      lowerLeft,
      ...prefixKeys(left, "left"),
      ...prefixKeys(top, "top"),
      ...prefixKeys(right, "right"),
      ...prefixKeys(finish, "finish"),
    };
  };

  bangLinesData = () => {
    const part = {
      start: [0.25, -4.25],
      curve: [0.0, -5.6, 0.0, -6.8, 0.0, -7.4],
    };
    const getPartPoint = (t: number) =>
      bezierPoint([...part.start, ...part.curve], t);

    const leftPart: LineArray = [
      {
        start: getPartPoint(0.55),
        curve: [-1.0, -8.2, -10.0, -5.0, -11.2, -3.6],
      },
      {
        start: getPartPoint(0.1),
        curve: [-1.4, -7.8, -11.6, -1.8],
      },
      {
        start: getPartPoint(0.0),
        curve: [-2.4, -5.6, -5.0, -3.6],
        end: [-8.0, -1.4, -11.7, 0.2],
      },
    ];

    const rightPart: LineArray = [
      {
        start: getPartPoint(0.75),
        curve: [1.8, -8.0, 10.0, -5.2, 11.3, -3.6],
      },
      {
        start: getPartPoint(0.35),
        curve: [1.0, -7.4, 10.0, -3.8, 12.1, -1.6],
      },
      {
        start: getPartPoint(0.0),
        curve: [2.8, -5.8, 5.8, -3.6],
        end: [8.0, -1.7, 12.0, 0.0],
      },
    ];

    return [part, ...leftPart, ...rightPart];
  };
}
