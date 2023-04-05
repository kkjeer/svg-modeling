import { DEFAULT_MALE_RIG } from "../../../utils/constants";
import { MouthMaleModel } from "./mouth-male";
import { EyebrowMaleModel } from "./eyebrow-male";
import { Person } from "./person";
import { EyeModel } from "./eye";
import {
  MALE_BOTTOM_EYELASH,
  MALE_EYE,
  MALE_IRIS,
  MALE_TOP_EYELASH,
} from "../../../data/base/person/eye-data";
import { NoseModel } from "./nose";
import { MALE_NOSE, MALE_NOSE_TIP } from "../../../data/base/person/nose-data";
import { FaceModel } from "./face";
import { MALE_FACE } from "../../../data/base/person/face-data";
import { NeckModel } from "./neck";
import { MALE_NECK } from "../../../data/base/person/neck-data";
import { BootModel } from "./boot";
import { MALE_BOOT, MALE_CUFF } from "../../../data/base/person/boot-data";
import { LegMaleModel } from "./leg-male";
import { LEG } from "../../../data/base/person/leg-male-data";
import { ArmModel } from "./arm";
import { MALE_ARM } from "../../../data/base/person/arm-data";
import { TorsoModel } from "./torso";
import { MALE_TORSO } from "../../../data/base/person/torso-data";
import { HandModel } from "./hand";
import { MALE_HAND } from "../../../data/base/person/hand-data";
import { EarModel } from "./ear";
import { MALE_EAR } from "../../../data/base/person/ear-data";

export class PersonMale extends Person {
  protected rig = DEFAULT_MALE_RIG;

  constructor(width: number, height: number) {
    super(width, height);
    this.neck = new NeckMale(width, height);
    this.face = new FaceMale(width, height);
    this.mouth = new MouthMaleModel(width, height);
    this.nose = new NoseMale(width, height);
    this.eyes = new EyeMale(width, height);
    this.eyebrows = new EyebrowMale(width, height);
    this.ears = new EarMale(width, height);
    this.arms = new ArmMale(width, height);
    this.hands = new HandMale(width, height);
    this.torso = new TorsoMale(width, height);
    this.legs = new LegMale(width, height);
    this.boots = new BootMale(width, height);
  }
}

class EyeMale extends EyeModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.white = MALE_EYE;
    this.bottomEyelash = MALE_BOTTOM_EYELASH;
    this.topEyelash = MALE_TOP_EYELASH;
    this.iris = MALE_IRIS;
    this.irisColor = "#51230a";
  }
}

class FaceMale extends FaceModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.face = MALE_FACE;
  }
}

class EyebrowMale extends EyebrowMaleModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.color = "#401c06";
  }
}

class NoseMale extends NoseModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.nose = MALE_NOSE;
    this.noseTip = MALE_NOSE_TIP;
  }
}

class EarMale extends EarModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.ear = MALE_EAR;
  }
}

class NeckMale extends NeckModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.neck = MALE_NECK;
  }
}

class ArmMale extends ArmModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.arm = MALE_ARM;
    this.color = "#222222";
  }
}

class HandMale extends HandModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.hand = MALE_HAND;
  }
}

class TorsoMale extends TorsoModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.torso = MALE_TORSO;
    this.color = "#362f2f";
  }
}

class LegMale extends LegMaleModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.leg = LEG;
    this.color = "#736968";
  }
}

class BootMale extends BootModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.boot = MALE_BOOT;
    this.cuff = MALE_CUFF;
    this.color = "#222222";
    this.cuffColor = "#121212";
  }
}
