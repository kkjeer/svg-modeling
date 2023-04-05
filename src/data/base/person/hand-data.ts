import { constantRadii, TubeProps } from "../../../utils/tube";

export interface Hand {
  // start at the pinky (outer) side of the wrist
  pinkyWrist: number[];
  // down along pinky side of palm, to start of pinky
  pinkyPalm: number[];
  // pinky
  pinky: TubeProps;
  pinkyInset: number[];
  // ring finger
  ring: TubeProps;
  ringInset: number[];
  // middle finger
  middle: TubeProps;
  middleInset: number[];
  // index finger
  index: TubeProps;
  indexInset: number[];
  // thumb
  thumb: TubeProps;
  // up along thumb side of palm, to thumb side of wrist
  thumbWrist: number[];
}

// origin: midway along wrist - hand extends downward from wrist

// istoel
// wrist width: 4.4, centered at 75.0
// height from pinky wrist to start of pinky: 2.0
// pinky height: 1.6
// ring finger height: 2.2
// middle finger height: 2.6
// index finger height: 2.3
// thumb height: 1.8
// average finger width: 0.6
// average inset width: 0.8
// average inset height: 0.4

// .cubic(78.0, 43.0, 77.0, 47.0, 77.2, 52.0) // down to outside of right wrist
// .quad(77.6, 53.0, 77.8, 54.0) // down and right along right side of hand
// // right pinky
// .quad(78.1, 55.2, 78.0, 55.6) // down right side
// .quad(77.7, 55.9, 77.4, 55.6) // across tip
// .quad(77.1, 53.7, 77.2, 54.1) // up left side
// .quad(76.9, 53.9, 76.6, 54.2) // palm space
// // right third finger
// .quad(76.9, 56.0, 76.8, 56.4) // down right side
// .quad(76.5, 56.8, 76.2, 56.5) // across tip
// .quad(75.9, 56.1, 76.0, 54.3) // up left side
// .quad(75.7, 54.1, 75.5, 54.4) // palm space
// // right middle finger
// .quad(75.5, 56.3, 75.4, 57.0) // down right side
// .quad(75.1, 57.1, 74.7, 57.0) // across tip
// .quad(74.6, 56.3, 74.7, 54.4) // up left side
// .quad(74.5, 54.1, 74.2, 54.4) // palm space
// // right index finger
// .quad(74.1, 56.2, 74.0, 56.7) // down right side
// .quad(73.7, 57.0, 73.4, 56.6) // across tip
// .quad(73.3, 56.2, 73.5, 53.3) // up left side
// .quad(73.3, 52.9, 73.0, 53.2) // palm space
// // right thumb
// .quad(72.6, 54.1, 72.5, 55.0) // down right side
// .quad(72.3, 55.2, 72.0, 54.8) // across tip
// .quad(72.1, 53.5, 72.1, 53.2) // up left side
// .quad(72.3, 52.2, 72.8, 51.8) // up and right, to outside of right wrist

export const HAND: Hand = {
  pinkyWrist: [2.0, 0.0],
  pinkyPalm: [2.4, 1.2, 2.6, 2.0],
  pinky: {
    curve: [2.1, 2.0, 2.2, 2.2, 2.4, 3.0, 2.4, 3.6],
    radii: constantRadii(0.3),
    connect: [2.3, 4.0],
  },
  pinkyInset: [1.6, 1.7],
  ring: {
    curve: [1.0, 2.0, 1.0, 2.6, 1.1, 3.2, 1.1, 4.2],
    radii: constantRadii(0.3),
    connect: [1.4, 4.6],
  },
  ringInset: [0.4, 1.8],
  middle: {
    curve: [-0.3, 2.0, -0.2, 2.6, -0.3, 3.2, -0.35, 4.6],
    radii: constantRadii(0.3),
    connect: [-0.3, 5.0],
  },
  middleInset: [-0.8, 1.7],
  index: {
    curve: [-1.5, 2.0, -1.5, 2.6, -1.5, 3.2, -1.6, 4.3],
    radii: constantRadii(0.3),
    connect: [-1.5, 4.7],
  },
  indexInset: [-1.8, 0.5, -2.0, 0.5],
  thumb: {
    curve: [-2.5, 1.0, -2.6, 1.4, -2.7, 2.0, -2.8, 3.1],
    radii: constantRadii(0.3),
    connect: [-3.0, 3.5],
  },
  thumbWrist: [-2.8, 0.0],
};

export const MALE_HAND: Hand = {
  pinkyWrist: [2.2, 0.0],
  pinkyPalm: [2.4, 1.2, 2.6, 2.0],
  pinky: {
    curve: [2.1, 2.0, 2.2, 2.2, 2.4, 3.0, 2.4, 3.6],
    radii: constantRadii(0.45),
    connect: [2.3, 4.0],
  },
  pinkyInset: [1.6, 1.7],
  ring: {
    curve: [1.0, 2.0, 1.0, 2.6, 1.1, 3.2, 1.1, 4.2],
    radii: constantRadii(0.45),
    connect: [1.4, 4.6],
  },
  ringInset: [0.4, 1.8],
  middle: {
    curve: [-0.3, 2.0, -0.2, 2.6, -0.3, 3.2, -0.35, 4.6],
    radii: constantRadii(0.45),
    connect: [-0.3, 5.0],
  },
  middleInset: [-0.8, 1.7],
  index: {
    curve: [-1.5, 2.0, -1.5, 2.6, -1.5, 3.2, -1.6, 4.3],
    radii: constantRadii(0.45),
    connect: [-1.5, 4.7],
  },
  indexInset: [-1.8, 0.8, -2.0, 0.8],
  thumb: {
    curve: [-2.5, 1.0, -2.6, 1.4, -2.7, 2.0, -2.8, 3.1],
    radii: constantRadii(0.45),
    connect: [-3.0, 3.5],
  },
  thumbWrist: [-2.9, 0.0],
};
