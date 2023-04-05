import { Boot } from "../base/person/boot-data";
import { Leg } from "../base/person/leg-data";

export const JYNX_LEG: Leg = {
  hip: [5.0, 0.0],
  thigh: [4.6, 5.0, 4.5, 10.8, 3.2, 20.4],
  knee: [3.25, 20.9, 3.25, 21.3, 3.2, 21.6],
  calf: [3.2, 25.6, 3.2, 26.0, 2.6, 30.8],
};

export const JYNX_BOOT: Boot = {
  top: [3.6, 0.0],
  ankle: [3.0, 2.2, 2.3, 5.4, 2.3, 8.4],
  toesSide: [2.6, 11.1, 2.8, 13.8],
  toes: [2.4, 14.6, 2.2, 15.6, 0.0, 15.8],
  cuff: [-3.6, -2.6, -0.2, -0.2],
};
