import { Rig } from "../rigs/base/rig";
import { MODEL_RIGS } from "../utils/getModel";
import { deepCopy } from "../utils/misc";

export interface AppState {
  modelName: string;
  showReference: boolean;
  sampleImage: string;
  rigName: string;
  rig: Rig;
}

const modelName = "person";
const rigName = "person";

export const initialAppState: AppState = {
  modelName,
  showReference: false,
  sampleImage: "dragonshadow/xelai",
  rigName: "default",
  rig: {
    ...deepCopy(MODEL_RIGS[modelName]),
    ...deepCopy(MODEL_RIGS[rigName]),
  },
};
