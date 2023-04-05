import { Model } from "../models/base/model";
import { Person } from "../models/base/person/person";
import { PersonMale } from "../models/base/person/person-male";
import { Jynx } from "../models/jynx/jynx";
import { Mortus } from "../models/mortus/mortus";
import { Rig } from "../rigs/base/rig";
import { RIG as DEFAULT_JYNX_RIG } from "../rigs/jynx/jynx-rig-default";
import { DEFAULT_FEMALE_RIG, DEFAULT_MALE_RIG } from "./constants";

export const MODEL_NAMES = ["person", "person_male", "jynx", "mortus"];

export function getModel(name: string, width: number, height: number): Model {
  switch (name) {
    case "person":
      return new Person(width, height);
    case "person_male":
      return new PersonMale(width, height);
    case "jynx":
      return new Jynx(width, height);
    case "mortus":
      return new Mortus(width, height);
  }
  return new Person(width, height);
}

export const MODEL_RIGS: { [key: string]: Rig } = {
  person: DEFAULT_FEMALE_RIG,
  person_male: DEFAULT_MALE_RIG,
  jynx: DEFAULT_JYNX_RIG,
  mortus: DEFAULT_MALE_RIG,
};
