import { Arm } from "../base/person/arm-data";

export const MORTUS_ARM: Arm = {
  outer: {
    shoulder: [6.0, 0.2],
    upperArm: [6.0, 2.0, 6.0, 4.0, 6.0, 6.0],
    elbow: [6.0, 12.8, 6.0, 13.2],
    wrist: [5.8, 18.0, 5.9, 20.2, 6.4, 28.2],
  },
  inner: {
    shoulder: [-0.6, -1.0],
    upperArm: [-0.2, 7.0, -0.1, 10.0, -0.1, 12.4],
    elbow: [-0.1, 12.8, -0.1, 13.2],
    wrist: [0.4, 18.0, 0.4, 20.2, 0.8, 28.2],
  },
  wristConnect: [3.4, 28.6],
  shoulderConnect: [2.3, -0.8, 6.0, -0.6],
};
