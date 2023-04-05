export interface Torso {
  // start at bottom center - midway between hips
  bottomCenter: number[];
  // down and out to bottom hem - partway between bottom center and (right) hip
  hem: number[];
  // outward to (right) hip
  hip: number[];
  // up along right side to waist
  waist: number[];
  // up along right side to bottom of area
  area: number[];
  // up along right area to shoulder (meeting inner arm shoulder)
  shoulder: number[];
  // inward along neckline
  neck: number[];
  // optional collar
  collarUp?: number[];
  collarIn?: number[];
  collarDown?: number[];
  // optional inset (e.g. v-neck)
  inset?: number[];
  // TODO: optional sleeves (e.g. for coats)
}

// xelai
// half-width at hip: 11.8
// half-width at waist: 9.0
// half-width at bottom of area: 10.6
// half-width at shoulder: 8.4 (this is approximate since xelai's shirt is hidden by a cloak)
// height: 27.2
// height from hip to waist: 16.0
// height from hip to bottom of area: 21.0
// .move(39.0, 49.2) // start at bottom left corner (left hip)
// .cubic(40.0, 50.8, 61.6, 50.8, 62.6, 49.2) // across bottom to bottom right corner (right hip)
// // up right side
// .cubic(62.6, 47.6, 59.0, 45.0, 59.8, 33.2) // up to right waist
// .cubic(59.8, 30.0, 62.0, 29.6, 62.2, 28.2) // up to right area
// .line(61.2, 22.0) // up to right shoulder
// // across neckline
// .line(56.0, 22.0) // straight across to cloak right shoulder inside
// .cubic(53.0, 22.6, 50.8, 22.6, 47.4, 22.0) // curved neckline, to cloak left shoulder inside
// .line(44.4, 22.0) // straight left to outside left shoulder
// // down left side
// .line(41.0, 27.8) // down to left area
// .cubic(40.8, 29.2, 42.0, 29.6, 41.8, 32.6) // down to left waist
// .cubic(42.4, 44.6, 39.4, 47.6, 39.0, 49.2) // down to left hip

// origin: center of neckline

export const TORSO: Torso = {
  bottomCenter: [0.0, 28.1],
  hem: [0.6, 28.1],
  hip: [11.8, 27.9],
  waist: [9.2, 23.3, 9.0, 20.3, 9.0, 17.3],
  area: [9.4, 12.3, 10.4, 4.3],
  shoulder: [10.4, 2.9, 9.0, 0.9, 8.6, 0.0],
  neck: [5.0, -0.5, 3.0, 0.5, 0.0, 0.5],
};

// origin: center of waist/chest - this just makes things hard to model with all the negative y-values above the area
export const TORSO_OLD: Torso = {
  bottomCenter: [0.0, 15.8],
  hem: [0.6, 15.8],
  hip: [11.8, 15.6],
  waist: [9.2, 11.0, 9.0, 8.0, 9.0, 5.0],
  area: [9.4, 0.0, 10.4, -8.0],
  shoulder: [10.4, -9.4, 9.0, -11.4, 8.6, -12.27],
  neck: [5.0, -12.8, 3.0, -11.8, 0.0, -11.8],
};

export const TORSO_VEST: Torso = {
  bottomCenter: [0.0, 28.1],
  hem: [0.6, 28.1],
  hip: [11.8, 27.9],
  waist: [9.2, 23.3, 9.0, 20.3, 9.0, 17.3],
  area: [9.4, 12.3, 10.4, 4.3],
  shoulder: [10.4, 2.9, 9.0, 0.9, 8.6, 0.0],
  neck: [7.0, -0.5, 4.8, -0.7, 3.4, -1.7],
  collarUp: [3.0, -1.7, 2.8, -3.3],
  collarIn: [2.7, -2.7, 1.6, -2.5],
  collarDown: [1.9, -1.7, 1.6, -0.7],
  inset: [1.2, 0.3, 0.0, 1.5],
};

export const MALE_TORSO: Torso = {
  bottomCenter: [0.0, 28.1],
  hem: [2.0, 28.1],
  hip: [9.0, 28.5, 12.6, 27.9],
  waist: [10.8, 25.3, 10.8, 24.3, 10.0, 19.3],
  area: [10.0, 16.3, 11.2, 11.3],
  shoulder: [11.8, 8.3, 11.6, 3.9, 10.2, 0.0],
  neck: [7.0, 0.1, 3.0, 0.2, 0.0, 0.2],
};

export const MALE_TORSO_VEST: Torso = {
  bottomCenter: [0.0, 26.1],
  hem: [0.3, 26.8, 0.6, 27.4, 1.0, 28.1],
  hip: [7.5, 28.5, 12.6, 27.9],
  waist: [10.8, 25.3, 10.8, 24.3, 10.0, 19.3],
  area: [10.0, 16.3, 11.2, 11.3],
  shoulder: [11.8, 8.3, 11.6, 3.9, 10.2, 0.0],
  neck: [8.0, -0.5, 7.0, -0.7, 5.8, -1.3],
  collarUp: [4.8, -1.7, 4.6, -3.3],
  collarIn: [3.8, -2.7, 3.2, -2.5],
  collarDown: [3.3, -1.7, 3.0, -0.7],
  inset: [1.2, 1.8, 0.0, 4.3],
};
