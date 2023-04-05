import type { PersonRig } from "../rigs/base/person-rig";
import { deepCopy } from "./misc";
import {
  DirectionRanges,
  emptyCubic,
  emptyQuad,
  emptyQuartic,
  emptyVec,
} from "./types";

export const BG_WIDTH = 650;
export const BG_HEIGHT = 884;

export const PERSON_WIDTH = (494.5 / 782) * 884; //494.5;
export const PERSON_HEIGHT = 884; //782;

export const WIDTH = PERSON_WIDTH;
export const HEIGHT = PERSON_HEIGHT;

export const HEAD_DIRECTION_RANGES: DirectionRanges = {
  left: [-100, -50],
  right: [50, 100],
};

export const DEFAULT_FEMALE_RIG: PersonRig = {
  face: {
    center: {
      position: { x: 50, y: 11, z: 0 },
      rotation: emptyVec(true),
    },
    chin: emptyVec(),
    jaw: emptyCubic(),
  },
  mouth: {
    upperLip: {
      left: emptyVec(),
      leftOut: emptyVec(),
      leftIn: emptyVec(),
      center: emptyVec(),
      rightIn: emptyVec(),
      rightOut: emptyVec(),
      right: emptyVec(),
    },
    lowerLip: {
      leftOut: emptyVec(),
      leftIn: emptyVec(),
      center: emptyVec(),
      rightIn: emptyVec(),
      rightOut: emptyVec(),
    },
  },
  irises: {
    position: emptyVec(),
    dot: emptyVec(),
  },
  leftEye: {
    corner: emptyVec(),
    outerBottom: emptyCubic(),
    outerTop: emptyCubic(),
    top: emptyCubic(),
    innerTop: emptyCubic(),
    innerBottom: emptyCubic(),
  },
  rightEye: {
    corner: emptyVec(),
    outerBottom: emptyCubic(),
    outerTop: emptyCubic(),
    top: emptyCubic(),
    innerTop: emptyCubic(),
    innerBottom: emptyCubic(),
  },
  leftEyebrow: {
    inner: emptyVec(),
    outer: emptyCubic(),
  },
  rightEyebrow: {
    inner: emptyVec(),
    outer: emptyCubic(),
  },
  neck: {
    position: { x: 50, y: 11, z: 0 },
    rotation: emptyVec(true),
    left: {
      shoulder: emptyVec(),
      side: emptyCubic(),
      top: emptyVec(),
    },
    right: {
      shoulder: emptyVec(),
      side: emptyCubic(),
      top: emptyVec(),
    },
  },
  leftArm: {
    position: { x: 40.8, y: 23.7, z: 0 },
    rotation: emptyVec(true),
    outer: {
      shoulder: emptyVec(),
      upperArm: emptyCubic(),
      elbow: emptyCubic(),
      wrist: emptyCubic(),
    },
    inner: {
      shoulder: emptyVec(),
      upperArm: emptyCubic(),
      elbow: emptyCubic(),
      wrist: emptyCubic(),
    },
    wristConnect: emptyCubic(),
    shoulderConnect: emptyCubic(),
  },
  rightArm: {
    position: { x: 59.2, y: 23.7, z: 0 },
    rotation: emptyVec(true),
    outer: {
      shoulder: emptyVec(),
      upperArm: emptyCubic(),
      elbow: emptyCubic(),
      wrist: emptyCubic(),
    },
    inner: {
      shoulder: emptyVec(),
      upperArm: emptyCubic(),
      elbow: emptyCubic(),
      wrist: emptyCubic(),
    },
    wristConnect: emptyQuad(),
    shoulderConnect: emptyQuad(),
  },
  leftHand: {
    position: { x: 37.0, y: 51.7, z: 0 },
    rotation: emptyVec(true),
    pinkyWrist: emptyVec(),
    pinkyPalm: emptyCubic(),
    pinky: {
      curve: emptyCubic(),
      radii: emptyQuartic(),
      connect: emptyVec(),
    },
    pinkyInset: emptyCubic(),
    ring: {
      curve: emptyCubic(),
      radii: emptyQuartic(),
      connect: emptyVec(),
    },
    ringInset: emptyCubic(),
    middle: {
      curve: emptyCubic(),
      radii: emptyQuartic(),
      connect: emptyVec(),
    },
    middleInset: emptyCubic(),
    index: {
      curve: emptyCubic(),
      radii: emptyQuartic(),
      connect: emptyVec(),
    },
    indexInset: emptyCubic(),
    thumb: {
      curve: emptyCubic(),
      radii: emptyQuartic(),
      connect: emptyVec(),
    },
    thumbWrist: emptyCubic(),
  },
  rightHand: {
    position: { x: 63.0, y: 51.7, z: 0 },
    rotation: emptyVec(true),
    pinkyWrist: emptyVec(),
    pinkyPalm: emptyCubic(),
    pinky: {
      curve: emptyCubic(),
      radii: emptyQuartic(),
      connect: emptyVec(),
    },
    pinkyInset: emptyCubic(),
    ring: {
      curve: emptyCubic(),
      radii: emptyQuartic(),
      connect: emptyVec(),
    },
    ringInset: emptyCubic(),
    middle: {
      curve: emptyCubic(),
      radii: emptyQuartic(),
      connect: emptyVec(),
    },
    middleInset: emptyCubic(),
    index: {
      curve: emptyCubic(),
      radii: emptyQuartic(),
      connect: emptyVec(),
    },
    indexInset: emptyCubic(),
    thumb: {
      curve: emptyCubic(),
      radii: emptyQuartic(),
      connect: emptyVec(),
    },
    thumbWrist: emptyCubic(),
  },
  torso: {
    // position: { x: 50, y: 35, z: 0 },
    position: { x: 50, y: 22.7, z: 0 },
    rotation: emptyVec(true),
    bottomCenter: emptyVec(),
    topCenter: emptyVec(),
    left: {
      hem: emptyCubic(),
      hip: emptyCubic(),
      waist: emptyCubic(),
      area: emptyCubic(),
      shoulder: emptyCubic(),
      neck: emptyCubic(),
      collarUp: emptyCubic(),
      collarIn: emptyCubic(),
      collarDown: emptyCubic(),
      inset: emptyQuad(),
    },
    right: {
      hem: emptyCubic(),
      hip: emptyCubic(),
      waist: emptyCubic(),
      area: emptyCubic(),
      shoulder: emptyCubic(),
      neck: emptyCubic(),
      collarUp: emptyCubic(),
      collarIn: emptyCubic(),
      collarDown: emptyCubic(),
      inset: emptyQuad(),
    },
  },
  leftLeg: {
    position: { x: 45, y: 49.2, z: 0 },
    rotation: emptyVec(true),
    outer: {
      hip: emptyVec(),
      thigh: emptyCubic(),
      knee: emptyCubic(),
      calf: emptyCubic(),
    },
    inner: {
      hip: emptyVec(),
      thigh: emptyCubic(),
      knee: emptyCubic(),
      calf: emptyCubic(),
    },
  },
  rightLeg: {
    position: { x: 55, y: 49.2, z: 0 },
    rotation: emptyVec(true),
    outer: {
      hip: emptyVec(),
      thigh: emptyCubic(),
      knee: emptyCubic(),
      calf: emptyCubic(),
    },
    inner: {
      hip: emptyVec(),
      thigh: emptyCubic(),
      knee: emptyCubic(),
      calf: emptyCubic(),
    },
  },
  leftBoot: {
    position: { x: 45, y: 79.2, z: 0 },
    rotation: emptyVec(true),
    outer: {
      top: emptyVec(),
      ankle: emptyCubic(),
      toesSide: emptyCubic(),
      toes: emptyCubic(),
      cuff: emptyCubic(),
    },
    inner: {
      top: emptyVec(),
      ankle: emptyCubic(),
      toesSide: emptyCubic(),
      toes: emptyCubic(),
      cuff: emptyCubic(),
    },
  },
  rightBoot: {
    position: { x: 55, y: 79.2, z: 0 },
    rotation: emptyVec(true),
    outer: {
      top: emptyVec(),
      ankle: emptyCubic(),
      toesSide: emptyCubic(),
      toes: emptyCubic(),
      cuff: emptyCubic(),
    },
    inner: {
      top: emptyVec(),
      ankle: emptyCubic(),
      toesSide: emptyCubic(),
      toes: emptyCubic(),
      cuff: emptyCubic(),
    },
  },
};

export const DEFAULT_MALE_RIG: PersonRig = {
  ...DEFAULT_FEMALE_RIG,
  mouth: {
    upperLip: {
      left: emptyVec(),
      center: emptyCubic(),
      right: emptyCubic(),
    },
  },
  leftEyebrow: {
    inner: emptyVec(),
    center: emptyQuad(),
    outer: emptyQuad(),
  },
  rightEyebrow: {
    inner: emptyVec(),
    center: emptyQuad(),
    outer: emptyQuad(),
  },
  leftArm: {
    ...DEFAULT_FEMALE_RIG.leftArm,
    position: { x: 39.3, y: 24.5, z: 0 },
  },
  rightArm: {
    ...DEFAULT_FEMALE_RIG.rightArm,
    position: { x: 60.7, y: 24.5, z: 0 },
  },
  leftHand: {
    ...DEFAULT_FEMALE_RIG.leftHand,
    position: { x: 35.3, y: 52.7, z: 0 },
  },
  rightHand: {
    ...DEFAULT_FEMALE_RIG.rightHand,
    position: { x: 64.7, y: 52.7, z: 0 },
  },
  torso: {
    ...DEFAULT_FEMALE_RIG.torso,
    position: { x: 50, y: 23.5, z: 0 },
  },
  leftLeg: {
    position: { x: 50, y: 47.4, z: 0 },
    rotation: emptyVec(true),
    outer: {
      hip: emptyVec(),
      thigh: emptyCubic(),
      knee: emptyCubic(),
      calf: emptyCubic(),
      ankle: emptyCubic(),
    },
    inner: {
      hip: emptyVec(),
      thigh: emptyCubic(),
      knee: emptyCubic(),
      calf: emptyCubic(),
      ankle: emptyCubic(),
    },
    bottom: emptyQuad(),
    waist: emptyQuad(),
  },
  rightLeg: {
    outer: {
      hip: emptyVec(),
      thigh: emptyCubic(),
      knee: emptyCubic(),
      calf: emptyCubic(),
      ankle: emptyCubic(),
    },
    inner: {
      thigh: emptyCubic(),
      knee: emptyCubic(),
      calf: emptyCubic(),
      ankle: emptyCubic(),
    },
    bottom: emptyQuad(),
  },
  leftBoot: {
    ...DEFAULT_FEMALE_RIG.leftBoot,
    position: { x: 42, y: 82, z: 0 },
  },
  rightBoot: {
    ...DEFAULT_FEMALE_RIG.rightBoot,
    position: { x: 58, y: 82, z: 0 },
  },
};

const gender: string = "male";

export const DEFAULT_PERSON_RIG = deepCopy(
  gender === "female" ? DEFAULT_FEMALE_RIG : DEFAULT_MALE_RIG,
);

export const DEFS_ID = "svgDefs";

export const PERSON_COLORS = {
  skin: "#e8c8b3",
  nose: "#ecba9f",
  noseTip: "#eedbca",
  neck: "#d39c7e",
};
