export interface Boot {
  // start at top outer corner
  top: number[];
  // down to ankle
  ankle: number[];
  // down and out to outer side of toes
  toesSide: number[];
  // down and in to center of toes
  toes: number[];
  // optional half of cuff starting at top inner corner
  cuff?: number[];
}

export interface Cuff {
  // start at bottom center
  bottomCenter: number[];
  // outward across bottom to outer bottom corner
  outerBottom: number[];
  // partway up along outer side
  mid: number[];
  // more up along outer side to outer top corner
  outerTop: number[];
  // go slightly backwards
  back: number[];
  // inward across top to top center
  topCenter: number[];

  // optional overrides for the inner side

  // inward across top to inner topmost (back) corner
  innerBack?: number[];
  // slightly down (forward) to inner top corner
  innerTop?: number[];
  // partway down along inner side
  innerMid?: number[];
  // more down along inner side to inner bottom corner
  innerBottom?: number[];
  // outward across bottom to bottom center
  innerBottomCenter?: number[];
}

// xelai boot: origin: 58.0, 79.2
// half-width at top: 3.6
// half-width at ankle: 2.2
// half-width at toes side: 3.4
// height from top to toes: 15.8
// .move(61.6, 79.2) // start at top right corner
// .quad(61.0, 81.4, 60.2, 83.6) // down and left
// .quad(60.2, 85.6, 60.2, 87.6) // down to right side of ankle
// .line(61.4, 93.0) // down to right side of toes
// .cubic(61.4, 94.4, 60.6, 94.8, 59.2, 95.0) // down to center of toes
// .cubic(58.0, 95.4, 55.8, 95.0, 55.4, 94.2) // to left side of toes
// .cubic(54.2, 93.6, 55.0, 92.6, 55.4, 91.2) // curve around toes to partway up left side of foot
// .cubic(56.2, 88.8, 55.8, 88.0, 55.6, 84.6) // up left side
// .line(54.4, 80.0) // up to top left corner

export const BOOT: Boot = {
  top: [3.6, 0.0],
  ankle: [3.0, 2.2, 2.2, 5.4, 2.2, 8.4],
  toesSide: [2.8, 11.1, 3.2, 13.8],
  toes: [3.2, 15.2, 2.6, 15.8, 0.4, 15.8],
  cuff: [-3.8, -0.6, -0.2, -0.6],
};

export const MALE_BOOT: Boot = {
  top: [3.6, 0.0],
  ankle: [3.2, 2.2, 2.6, 5.4, 2.6, 8.4],
  toesSide: [2.8, 11.1, 3.4, 13.8],
  toes: [3.4, 15.2, 2.6, 15.8, 0.4, 15.8],
  cuff: [-3.8, -0.6, -0.2, -0.6],
};

// xelai boot cuff: origin: 58.0, 79.2
// half-width at bottom: 4.8
// half-width at back: 3.6
// half-width at top: 4.2
// height from bottom to back: 4.0
// .move(62.8, 79.0) // start at bottom right corner
// .cubic(61.0, 80.4, 54.0, 81.2, 53.2, 79.2) // across to bottom left corner
// .line(53.8, 77.4) // partway up left side
// .line(53.6, 75.6) // up to top left corner
// .quad(53.6, 75.2, 53.8, 75.2) // slightly back
// .cubic(54.3, 77.0, 59.8, 77.0, 61.6, 75.0) // across to top right corner
// .quad(62.0, 75.0, 62.2, 75.8) // slightly forward
// .line(62.0, 77.4) // slight bump in
// .line(62.8, 79.0) // back down to bottom right corner

export const CUFF: Cuff = {
  bottomCenter: [0.0, 2.4],
  outerBottom: [2.4, 2.4, 4.6, 2.0, 4.2, 1.8],
  mid: [3.7, 0.0],
  outerTop: [4.0, -1.0],
  back: [3.8, -1.6],
  topCenter: [3.0, -1.0, 0.4, -0.6, 0.0, -0.6],
};

export const MALE_CUFF: Cuff = {
  bottomCenter: [0.0, 2.4],
  outerBottom: [2.4, 2.4, 4.6, 2.0, 4.8, 1.8],
  mid: [4.3, 0.0],
  outerTop: [4.6, -1.0],
  back: [4.4, -1.6],
  topCenter: [3.6, -1.0, 1.0, -0.6, 0.0, -0.6],

  // inner side (overrides)
  innerBack: [-1.0, -0.2, -3.6, -0.6, -4.5, -0.9],
  innerTop: [-4.5, -0.6],
  innerMid: [-4.3, 0.0],
  innerBottom: [-4.5, 1.8],
};
