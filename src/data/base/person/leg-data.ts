export interface Leg {
  // start at top outer corner
  hip: number[];
  // down along outer edge of thigh, to just above the knee
  thigh: number[];
  // down along outer edge of knee, to just below the knee
  knee: number[];
  // down along outer edge of calf, to bottom outer corner
  calf: number[];
}

// xelai right leg - origin is 55.8, 49.2
// half-width at hip: 5.0
// half-width at knee: 3.0
// half-width at ankle: 2.4
// height from hip to ankle: 30.8
// .move(59.8, 80.0) // start at bottom right corner
// .quad(60.8, 75.2, 60.4, 70.8) // up to right side of knee
// .quad(62.4, 60.2, 61.8, 49.2) // up to top right corner
// .line(51.8, 49.2) // across to top left corner
// .quad(52.2, 60.0, 54.4, 70.8) // down to left side of knee
// .quad(54.4, 75.2, 55.0, 80.0) // down to bottom left corner

export const LEG: Leg = {
  hip: [5.0, 0.0],
  thigh: [4.6, 5.0, 4.5, 10.8, 3.0, 20.4],
  knee: [3.05, 20.9, 3.05, 21.3, 3.0, 21.6],
  calf: [3.0, 25.6, 3.0, 26.0, 2.4, 30.8],
};

// from xelai's leg
export const LEG_THIN: Leg = {
  hip: [4.0, 0.0],
  thigh: [3.6, 10.0, 3.6, 10.8, 1.8, 20.4],
  knee: [1.85, 20.9, 1.85, 21.3, 1.8, 21.6],
  calf: [1.8, 25.6, 1.8, 26.0, 1.2, 30.8],
};

export const MALE_LEG: Leg = {
  hip: [4.0, 0.0],
  thigh: [3.8, 10.0, 3.6, 10.8, 2.8, 20.4],
  knee: [2.85, 20.9, 2.85, 21.3, 2.8, 21.6],
  calf: [2.8, 25.6, 2.8, 26.0, 2.2, 30.8],
};
