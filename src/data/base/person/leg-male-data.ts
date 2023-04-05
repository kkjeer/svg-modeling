export interface Leg {
  outer: {
    // start at top outer corner
    hip: number[];
    // down along outer edge of thigh, to just above the knee
    thigh: number[];
    // down along outer edge of knee, to just below the knee
    knee: number[];
    // down along outer edge of calf, to bottom of calf (just above the ankle)
    calf: number[];
    // down to outer ankle
    ankle: number[];
  };
  inner: {
    // start at top inner corner
    hip: number[];
    // down along inner edge of thigh, to just above the knee
    thigh: number[];
    // down along inner edge of knee, to just below the knee
    knee: number[];
    // down along inner edge of calf, to bottom of calf (just above the ankle)
    calf: number[];
    // down to inner ankle
    ankle: number[];
  };
  // midpoints from outer ankle to inner ankle
  bottom: number[];
  // midpoints from left outer hip to right outer hip
  waist: number[];
}

// origin: midway between right and left outer hips

export const LEG: Leg = {
  outer: {
    hip: [9.0, 0.0],
    thigh: [10.2, 10.0, 10.6, 10.8, 11.0, 20.4],
    knee: [11.0, 20.9, 11.0, 21.3, 11.1, 22.6],
    calf: [11.6, 25.6, 12.0, 26.0, 12.6, 32.8],
    ankle: [12.4, 33.4, 11.2, 33.5, 10.8, 33.8],
  },
  inner: {
    hip: [0.0, 7.0],
    thigh: [0.4, 9.0, 2.0, 10.8, 3.0, 20.4],
    knee: [3.0, 20.9, 3.0, 21.3, 3.0, 22.6],
    calf: [3.1, 25.6, 3.1, 26.0, 3.1, 32.8],
    ankle: [3.2, 33.4, 3.3, 33.5, 3.4, 33.8],
  },
  bottom: [8.0, 34.4, 6.0, 34.4],
  waist: [-4.5, 0.4, 4.5, 0.4],
};
