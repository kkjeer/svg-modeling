export interface UpperLip {
  // start at left corner
  left: number[];
  // move right to center
  center: number[];
  // move right to right corner
  right: number[];
  // materials
  color: string;
  thickness: number;
}

export const UPPER_LIP: UpperLip = {
  left: [-2.8, 5.8],
  center: [-1.3, 6.0, 0.0, 6.0],
  right: [1.3, 6.0, 2.8, 5.8],
  color: "#7e4331",
  thickness: 0.8,
};
