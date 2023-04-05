import {
  JYNX_BOTTOM_EYELASH,
  JYNX_EYE,
  JYNX_EYEBROW,
  JYNX_FACE,
  JYNX_IRIS,
  JYNX_LOWER_LIP,
  JYNX_NOSE,
  JYNX_NOSE_TIP,
  JYNX_TOP_EYELASH,
  JYNX_UPPER_LIP,
} from "../../data/jynx/jynx-face-data";
import { JYNX_BOOT, JYNX_LEG } from "../../data/jynx/jynx-leg-data";
import { JYNX_ARM, JYNX_TORSO } from "../../data/jynx/jynx-torso-data";
import { cloudFilter, marbleFilter } from "../../utils/filters";
import { bezierPoint, curveBetweenPoints } from "../../utils/math";
import { addArr, getEndpoint } from "../../utils/misc";
import { ArmModel } from "../base/person/arm";
import { BootModel } from "../base/person/boot";
import { EyeModel } from "../base/person/eye";
import { EyebrowModel } from "../base/person/eyebrow";
import { FaceModel } from "../base/person/face";
import { HandModel } from "../base/person/hand";
import { LegModel } from "../base/person/leg";
import { MouthModel } from "../base/person/mouth";
import { NoseModel } from "../base/person/nose";
import { Person } from "../base/person/person";
import { TorsoModel } from "../base/person/torso";
import { JynxHairModel } from "./jynx-hair";

export class Jynx extends Person {
  constructor(width: number, height: number) {
    super(width, height);

    this.face = new JynxFaceModel(width, height);
    this.eyes = new JynxEyeModel(width, height);
    this.eyebrows = new JynxEyebrowModel(width, height);
    this.nose = new JynxNoseModel(width, height);
    this.mouth = new JynxMouthModel(width, height);
    this.hair = new JynxHairModel(width, height);

    this.torso = new JynxTorsoModel(width, height);
    this.arms = new JynxArmModel(width, height);
    this.hands = new JynxHandModel(width, height);

    this.legs = new JynxLegModel(width, height);
    this.boots = new JynxBootModel(width, height);
  }
}

export const COLORS = {
  // skin
  skin: "#ecccb7",
  nose: "#e1af92",
  noseTip: "#d19f82",
  neck: "#d7a281",
  // facial features
  iris: "#5e2612",
  eyebrows: "#320602",
  upperLip: "#9e4644",
  lowerLip: "#af5a57",
  // torso
  shirt: "#222c76",
  shirtHighlight: "#001146",
  vest: "#121212",
  vestHighlight: "#23272c",
  // legs
  legs: "#18181c",
  boots: "#121216",
  bootsHighlight: "#333740",
};

const shirtFilter = cloudFilter({
  color: COLORS.shirtHighlight,
  baseFrequency: "0.02 0.02",
  opacity: "0.8",
});

class JynxFaceModel extends FaceModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.face = JYNX_FACE;
    this.color = COLORS.skin;
  }
}

class JynxEyeModel extends EyeModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.white = JYNX_EYE;
    this.topEyelash = JYNX_TOP_EYELASH;
    this.bottomEyelash = JYNX_BOTTOM_EYELASH;
    this.iris = JYNX_IRIS;

    this.faceColor = COLORS.skin;
    this.irisColor = COLORS.iris;
  }
}

class JynxEyebrowModel extends EyebrowModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.eyebrow = JYNX_EYEBROW;
    this.color = COLORS.eyebrows;
  }
}

class JynxNoseModel extends NoseModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.nose = JYNX_NOSE;
    this.noseTip = JYNX_NOSE_TIP;

    this.color = COLORS.nose;
    this.tipColor = COLORS.noseTip;
  }
}

class JynxMouthModel extends MouthModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.upperLip = JYNX_UPPER_LIP;
    this.lowerLip = JYNX_LOWER_LIP;

    this.upperLipColor = COLORS.upperLip;
    this.lowerLipColor = COLORS.lowerLip;
  }
}

class JynxTorsoModel extends TorsoModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.torso = JYNX_TORSO;
    this.color = COLORS.shirt;

    this.filter = "jynx-torso-filter";
    this.filters[this.filter] = shirtFilter;
  }

  detailsFront = (data: ReturnType<typeof this.getFrontPointsData>) => {
    const { position } = this.rig.torso;
    const style = this.getTorsoStyle();

    const {
      bottomCenter,
      hem,
      hip,
      waist,
      area,
      shoulder,
      neck,
      leftCollarUp,
      leftNeck,
      leftShoulder,
      leftArea,
      leftWaist,
      leftHip,
      leftHem,
    } = data;

    const rightStrap = bezierPoint([...getEndpoint(shoulder), ...neck], 0.45);
    const rightDown = [0.6, 11.0];
    const leftDown = [-0.6, 11.0];
    const leftStrap = bezierPoint(
      [...getEndpoint(leftCollarUp), ...leftNeck],
      0.55,
    );
    const leftOuterStrap = getEndpoint(leftNeck);

    const points: number[][] = [];
    this.drawPoints(
      {
        bottomCenter,
        hem,
        hip,
        waist,
        area,
        shoulder,
        rightStrap,
        rightDown: curveBetweenPoints(rightStrap, rightDown, [
          { t: 0.4, dx: 0.9 },
          { t: 0.7, dx: 0.6 },
        ]),
        leftDown: curveBetweenPoints(rightDown, leftDown, [
          { t: 0.3, dy: 0.3 },
          { t: 0.7, dy: 0.3 },
        ]),
        leftStrap: curveBetweenPoints(leftDown, leftStrap, [
          { t: 0.3, dx: -0.6 },
          { t: 0.6, dx: -0.9 },
        ]),
        leftOuterStrap,
        leftShoulder,
        leftArea,
        leftWaist,
        leftHip,
        leftHem,
      },
      addArr(points),
    );

    const filter = "jynx-vest-filter";
    this.filters[filter] = marbleFilter({
      color: COLORS.vest,
      contrast: "3",
      flood: COLORS.vestHighlight,
      opacity: "1",
      baseFrequency: "0.04 0.01",
      scale: "5",
      stdDeviation1: "7",
      stdDeviation2: "7",
      specularConstant: "0.7",
      specularExponent: "20",
      azimuth: "200",
      elevation: "180",
    });

    this.elts["vest"] = this.path(points, position, {
      fill: COLORS.vest,
      filter,
      style,
    });
  };
}

class JynxArmModel extends ArmModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.arm = JYNX_ARM;
    this.color = COLORS.shirt;
    this.filter = "jynx-torso-filter";
  }
}

class JynxHandModel extends HandModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.color = COLORS.skin;
  }
}

class JynxLegModel extends LegModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.leg = JYNX_LEG;
    this.color = COLORS.legs;
  }
}

class JynxBootModel extends BootModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.boot = JYNX_BOOT;
    this.cuff = null;

    this.color = COLORS.boots;
    this.filter = "jynx-boot-filter";
    this.filters[this.filter] = cloudFilter({
      color: COLORS.bootsHighlight,
      baseFrequency: "0.02 0.02",
      opacity: "0.8",
    });
  }
}
