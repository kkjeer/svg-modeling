import { ALL_RIGS } from "../rigs";
import { Rig } from "../rigs/base/rig";
import { DEFAULT_PERSON_RIG } from "../utils/constants";
import { MODEL_RIGS } from "../utils/getModel";
import { deepCopy } from "../utils/misc";
import { AppAction, AppActionType } from "./actions";
import { AppState } from "./state";

export function appReducer(state: AppState, action: AppAction) {
  switch (action.type) {
    case AppActionType.SET_MODEL_NAME:
      const { modelName } = action;
      const rig = MODEL_RIGS[modelName] ?? state.rig;
      return { ...state, modelName, rig, rigName: "default" };

    case AppActionType.SET_RIG_NAME: {
      const { rigName } = action;
      const defaultRig = MODEL_RIGS[state.modelName];
      let nextRig: Rig = {};
      if (rigName === "default") {
        nextRig = deepCopy(defaultRig);
      } else {
        const currRigs = ALL_RIGS[state.modelName] ?? {};
        const newRig = currRigs[rigName] ?? {};
        nextRig = { ...defaultRig, ...newRig };
      }
      return { ...state, rigName, rig: nextRig };
    }

    case AppActionType.UPDATE_RIG: {
      const { rig = DEFAULT_PERSON_RIG } = action;
      return { ...state, rig: JSON.parse(JSON.stringify(rig)) };
    }
    default:
      return state;
  }
}
