import type {
  Point,
  Vec,
  Direction,
  Quad,
  Cubic,
  Quartic,
} from "../../utils/types";
import type { Rig } from "./rig";

export interface PersonRig extends Rig {
  // TODO
  face: FaceRig;
  mouth: MouthRig | MouthMaleRig;
  irises: IrisRig;
  leftEye: EyeRig;
  rightEye: EyeRig;
  leftEyebrow: EyebrowRig | EyebrowMaleRig;
  rightEyebrow: EyebrowRig | EyebrowMaleRig;
  leftEar?: EarRig;
  rightEar?: EarRig;
  neck: NeckRig;
  leftArm: ArmRig;
  rightArm: ArmRig;
  leftHand: HandRig;
  rightHand: HandRig;
  torso: TorsoRig;
  leftLeg: LegRig | LegMaleRig;
  rightLeg: LegRig | LegMaleRig;
  leftBoot: BootRig;
  rightBoot: BootRig;
}

export interface FaceRig {
  center: Point;
  chin: Vec;
  jaw: Cubic;
  direction?: Direction;
}

export interface MouthRig {
  upperLip: UpperLipRig;
  lowerLip: LowerLipRig;
}

export interface UpperLipRig extends LowerLipRig {
  left: Vec;
  right: Vec;
}

export interface LowerLipRig {
  leftOut: Vec;
  leftIn: Vec;
  center: Vec;
  rightIn: Vec;
  rightOut: Vec;
}

export interface MouthMaleRig {
  upperLip: {
    left: Vec;
    center: Cubic;
    right: Cubic;
  };
}

export interface IrisRig {
  position: Vec;
  dot: Vec;
}

export interface EyeRig {
  corner: Vec;
  outerBottom: Cubic;
  outerTop: Cubic;
  top: Cubic;
  innerTop: Cubic;
  innerBottom: Cubic;
}

export interface EyebrowRig {
  inner: Vec;
  outer: Cubic;
}

export interface EyebrowMaleRig {
  inner: Vec;
  center: Quad;
  outer: Quad;
}

export interface EarRig {
  innerTop: Vec;
  outerTop: Quad;
  outerBottom: Quad;
  innerBottom: Quad;
}

export interface NeckRig {
  position: Vec;
  rotation: Vec;
  left: {
    shoulder: Vec;
    side: Cubic;
    top: Vec;
  };
  right: {
    shoulder: Vec;
    side: Cubic;
    top: Vec;
  };
}

export interface ArmRig {
  position: Vec;
  rotation: Vec;
  outer: {
    shoulder: Vec;
    upperArm: Cubic;
    elbow: Cubic;
    wrist: Cubic;
  };
  inner: {
    shoulder: Vec;
    upperArm: Cubic;
    elbow: Cubic;
    wrist: Cubic;
  };
  wristConnect: Quad;
  shoulderConnect: Quad;
}

export interface TubeFingerRig {
  curve: Cubic;
  radii: Quartic;
  connect: Vec;
}

export interface HandRig {
  position: Vec;
  rotation: Vec;
  pinkyWrist: Vec;
  pinkyPalm: Cubic;
  pinky: TubeFingerRig;
  pinkyInset: Cubic;
  ring: TubeFingerRig;
  ringInset: Cubic;
  middle: TubeFingerRig;
  middleInset: Cubic;
  index: TubeFingerRig;
  indexInset: Cubic;
  thumb: TubeFingerRig;
  thumbWrist: Cubic;
}

export interface TorsoRig {
  position: Vec;
  rotation: Vec;
  bottomCenter: Vec;
  topCenter?: Vec;
  left: TorsoSideRig;
  right: TorsoSideRig;
}

export interface TorsoSideRig {
  hem: Cubic;
  hip: Cubic;
  waist: Cubic;
  area: Cubic;
  shoulder: Cubic;
  neck: Cubic;
  collarUp?: Cubic;
  collarIn?: Cubic;
  collarDown?: Cubic;
  inset?: Quad;
  // TODO: optional sleeves (e.g. for coats)
}

export interface LegRig {
  position: Vec;
  rotation: Vec;
  outer: {
    hip: Vec;
    thigh: Cubic;
    knee: Cubic;
    calf: Cubic;
  };
  inner: {
    hip: Vec;
    thigh: Cubic;
    knee: Cubic;
    calf: Cubic;
  };
}

export interface LegMaleRig {
  position?: Vec;
  rotation?: Vec;
  outer: {
    hip: Vec;
    thigh: Cubic;
    knee: Cubic;
    calf: Cubic;
    ankle: Cubic;
  };
  inner: {
    hip?: Vec;
    thigh: Cubic;
    knee: Cubic;
    calf: Cubic;
    ankle: Cubic;
  };
  bottom: Quad;
  waist?: Quad;
}

export interface BootRig {
  position: Vec;
  rotation: Vec;
  outer: {
    top: Vec;
    ankle: Cubic;
    toesSide: Cubic;
    toes: Cubic;
    cuff: Cubic;
  };
  inner: {
    top: Vec;
    ankle: Cubic;
    toesSide: Cubic;
    toes: Cubic;
    cuff: Cubic;
  };
}
