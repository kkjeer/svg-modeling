import type { Rig } from "../rigs/base/rig";

export enum AppActionType {
  SET_MODEL_NAME = "SET_MODEL_NAME",
  TOGGLE_REFERENCE = "TOGGLE_REFERENCE",
  SET_SAMPLE_IMAGE = "SET_SAMPLE_IMAGE",
  SET_RIG_NAME = "SET_RIG_NAME",
  UPDATE_RIG = "UPDATE_RIG",
}

export type AppAction = SetModelName | SetRigName | UpdateRig;

interface SetModelName {
  readonly type: AppActionType.SET_MODEL_NAME;
  readonly modelName: string;
}

interface SetRigName {
  readonly type: AppActionType.SET_RIG_NAME;
  readonly rigName: string;
}

interface UpdateRig {
  readonly type: AppActionType.UPDATE_RIG;
  readonly rig: Rig;
}

export function setModelName(modelName: string): SetModelName {
  return { type: AppActionType.SET_MODEL_NAME, modelName };
}

export function setRigName(rigName: string): SetRigName {
  return { type: AppActionType.SET_RIG_NAME, rigName };
}

export function updateRig(rig: Rig): UpdateRig {
  return { type: AppActionType.UPDATE_RIG, rig };
}
