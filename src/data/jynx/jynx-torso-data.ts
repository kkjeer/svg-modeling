import { Arm } from "../base/person/arm-data";
import { Torso } from "../base/person/torso-data";

export const JYNX_TORSO: Torso = {
  bottomCenter: [0.0, 28.3],
  hem: [2.6, 28.3],
  hip: [11.2, 27.9],
  waist: [9.6, 23.3, 9.4, 20.3, 9.4, 17.3],
  area: [9.4, 12.3, 10.0, 5.9],
  shoulder: [10.5, 4.4, 9.6, 1.2, 8.4, 0.0],
  neck: [7.0, -0.2, 4.8, -0.5, 3.4, -1.5],
  collarUp: [3.0, -1.7, 2.6, -2.5],
  collarIn: [2.7, -2.2, 1.6, -2.0, 0.0, -2.0],
};

export const JYNX_ARM: Arm = {
  outer: {
    shoulder: [4.3, 0.3],
    upperArm: [4.5, 2.0, 4.5, 4.0, 4.5, 6.4],
    elbow: [4.9, 13.8, 5.1, 14.2],
    wrist: [5.4, 18.0, 5.4, 23.2, 5.8, 26.8],
  },
  inner: {
    shoulder: [-0.8, -1.0],
    upperArm: [-0.4, 7.0, -0.3, 10.0, -0.3, 11.4],
    elbow: [-0.1, 13.8, -0.1, 14.2],
    wrist: [0.4, 18.0, 0.4, 23.2, 0.8, 26.8],
  },
  wristConnect: [2.4, 27.2],
  shoulderConnect: [2.3, -0.8, 4.2, -0.6],
};
