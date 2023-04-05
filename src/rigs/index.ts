import { Rig } from "./base/rig";
import jynx from "./jynx";
import mortus from "./mortus";

export const ALL_RIGS: { [key: string]: { [key: string]: Rig } } = {
  jynx,
  mortus,
};
