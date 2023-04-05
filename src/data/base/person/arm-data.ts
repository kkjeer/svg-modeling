export interface Arm {
  // outer edge of arm, from shoulder to wrist
  outer: ArmEdge;
  // inner edge of arm, from shoulder to wrist
  inner: ArmEdge;
  // from outer edge of wrist to inner edge of wrist (excluding actual inner edge of wrist)
  wristConnect: number[];
  // from inner edge of shoulder to outer edge of shoulder (excluding actual outer edge of shoulder)
  shoulderConnect: number[];
}

export interface ArmEdge {
  // start at shoulder
  shoulder: number[];
  // down to upper arm (to just above elbow)
  upperArm: number[];
  // down along elbow (to just below elbow)
  elbow: number[];
  // down to wrist
  wrist: number[];
}

// xelai measurements:
// width across shoulder: 5.2
// width across elbow: 5.2
// height from shoulder to wrist: 25.5
// istoel measurements:
// width from left outer shoulder to right outer shoulder: 25.4
// width across elbow: 4.8
// height from shoulder to wrist: 27.6

// origin: center of shoulder (between outer and inner shoulder points)

export const ARM: Arm = {
  outer: {
    shoulder: [5.1, 0.2],
    upperArm: [5.1, 2.0, 5.1, 4.0, 5.1, 6.0],
    elbow: [5.1, 11.8, 5.1, 12.2],
    wrist: [5.4, 18.0, 5.4, 23.2, 5.8, 28.0],
  },
  inner: {
    shoulder: [-0.6, -1.0],
    upperArm: [-0.2, 7.0, -0.1, 10.0, -0.1, 11.4],
    elbow: [-0.1, 11.8, -0.1, 12.2],
    wrist: [0.4, 18.0, 0.4, 23.2, 0.8, 28.0],
  },
  wristConnect: [2.4, 28.4],
  shoulderConnect: [2.3, -0.8, 4.2, -0.6],
};

export const MALE_ARM: Arm = {
  outer: {
    shoulder: [6.0, 0.2],
    upperArm: [6.0, 2.0, 6.0, 4.0, 6.0, 6.0],
    elbow: [6.0, 11.8, 6.0, 12.2],
    wrist: [5.8, 18.0, 5.9, 20.2, 6.4, 28.2],
  },
  inner: {
    shoulder: [-0.6, -1.0],
    upperArm: [-0.2, 7.0, -0.1, 10.0, -0.1, 11.4],
    elbow: [-0.1, 11.8, -0.1, 12.2],
    wrist: [0.4, 18.0, 0.4, 20.2, 0.8, 28.2],
  },
  wristConnect: [3.4, 28.6],
  shoulderConnect: [2.3, -0.8, 6.0, -0.6],
};

export const ARM_THIN: Arm = {
  outer: {
    shoulder: [4.2, 0.2],
    upperArm: [4.2, 2.0, 4.2, 4.0, 4.2, 6.0],
    elbow: [4.2, 11.8, 4.2, 12.2],
    wrist: [4.2, 18.0, 4.2, 20.2, 4.4, 24.2],
  },
  inner: {
    shoulder: [-0.6, -1.0],
    upperArm: [-0.2, 7.0, -0.1, 10.0, -0.1, 11.4],
    elbow: [-0.1, 11.8, -0.1, 12.2],
    wrist: [0.4, 18.0, 0.4, 20.2, 0.8, 24.2],
  },
  wristConnect: [1.8, 24.6],
  shoulderConnect: [2.3, -0.8, 4.2, -0.6],
};

export const ARM_NOODLE: Arm = {
  outer: {
    shoulder: [-1.0, -1.0],
    upperArm: [2.3, -1.0, 2.5, 6.0, 2.5, 11.4],
    elbow: [2.5, 11.8, 2.5, 12.2],
    wrist: [2.6, 18.0, 2.6, 20.2, 2.5, 24.2],
  },
  inner: {
    shoulder: [-3.4, 1.3],
    upperArm: [-1.8, 1.4, -1.6, 6.0, -1.7, 11.4],
    elbow: [-1.7, 11.8, -1.7, 12.2],
    wrist: [-1.8, 18.0, -1.8, 20.2, -1.9, 24.2],
  },
  wristConnect: [0.0, 24.6],
  shoulderConnect: [-2.4, -0.7],
};
