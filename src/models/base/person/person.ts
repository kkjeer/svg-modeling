import { DEFAULT_FEMALE_RIG } from "../../../utils/constants";
import { FaceModel } from "./face";
import { Model } from "../model";
import { MouthModel } from "./mouth";
import { MouthMaleModel } from "./mouth-male";
import { NoseModel } from "./nose";
import type { PersonRig } from "../../../rigs/base/person-rig";
import { EyeModel } from "./eye";
import { EyebrowMaleModel } from "./eyebrow-male";
import { EyebrowModel } from "./eyebrow";
import { NeckModel } from "./neck";
import { LegModel } from "./leg";
import { BootModel } from "./boot";
import { ArmModel } from "./arm";
import { LegMaleModel } from "./leg-male";
import { TorsoModel } from "./torso";
import { HandModel } from "./hand";
import { EarModel } from "./ear";
import { HairModel } from "./hair";

export type ArmDrawMode = "under" | "over" | "lower_over" | "upper_over";

export class Person extends Model {
  protected rig: PersonRig = DEFAULT_FEMALE_RIG;

  // head
  protected face: FaceModel;
  protected eyes: EyeModel;
  protected nose: NoseModel;
  protected mouth: MouthModel | MouthMaleModel;
  protected eyebrows: EyebrowModel | EyebrowMaleModel;
  protected ears: EarModel | null = null;
  protected hair: HairModel;

  // neck
  protected neck: NeckModel;

  // legs
  protected legs: LegModel | LegMaleModel;
  protected boots: BootModel;

  // torso
  protected arms: ArmModel;
  protected hands: HandModel;
  protected torso: TorsoModel;
  protected leftArmDrawMode: ArmDrawMode = "under";
  protected rightArmDrawMode: ArmDrawMode = "under";

  constructor(width: number, height: number) {
    super(width, height);

    // face
    this.face = new FaceModel(width, height);
    this.eyes = new EyeModel(width, height);
    this.nose = new NoseModel(width, height);
    this.mouth = new MouthModel(width, height);
    this.eyebrows = new EyebrowModel(width, height);
    this.hair = new HairModel(width, height);

    // neck
    this.neck = new NeckModel(width, height);

    // legs
    this.legs = new LegModel(width, height);
    this.boots = new BootModel(width, height);

    // torso
    this.arms = new ArmModel(width, height);
    this.hands = new HandModel(width, height);
    this.torso = new TorsoModel(width, height);
  }

  /**
   * draw
   * Modifies this.elts by constructing paths based on the setup curves and the given rig
   */
  public draw(rig: PersonRig) {
    this.rig = rig;

    this.addBodyElts();
    this.addExtraElts();
    this.addElts(this.hair, () => this.hair.drawBangs(this.rig));

    return this.elts;
  }

  /**
   * addExtraElts
   * Draws objects between the body (head, torso, legs) and front hair
   * This is where things like cloaks, armor, etc. could go
   */
  protected addExtraElts(): void {}

  /**
   * addBodyElts
   * Draws standard objects that make up the person's body, all except for
   * the front hair (to allow other objects to go in between)
   */
  protected addBodyElts(): void {
    this.addHeadElts();
    this.addLegElts();
    this.addTorsoElts();
  }

  /**
   * addHeadElts
   * Draws everything from the neck up (except front hair)
   */
  protected addHeadElts(): void {
    this.addElts(this.hair, () => this.hair.drawBackdrop(this.rig));
    if (this.ears) {
      this.addElts(this.ears);
    }
    this.addElts(this.neck);
    this.addElts(this.face);
    this.addElts(this.eyes);
    this.addElts(this.nose);
    this.addElts(this.mouth);
    this.addElts(this.eyebrows);
  }

  /**
   * addLegElts
   * Draws everything below the torso
   */
  protected addLegElts(): void {
    this.addElts(this.legs);
    this.addElts(this.boots);
  }

  /**
   * drawTorso
   * Draws all torso (i.e. shirt) elements
   * This could be extended to draw coats, vests, etc.
   */
  protected drawTorso() {
    this.addElts(this.torso);
  }

  /**
   * addTorsoElts
   * Draws the torso, arms, and hands in the order indicated by the left and right arm draw modes
   * TODO: allow for optional coats, vests, etc.
   */
  protected addTorsoElts(): void {
    const arms = () => {
      this.addElts(this.hands);
      this.addElts(this.arms);
    };
    const left = () => {
      this.addElts(this.hands, () => this.hands.drawFront("left", this.rig));
      this.addElts(this.arms, () => this.arms.drawFront("left", this.rig));
    };
    const right = () => {
      this.addElts(this.hands, () => this.hands.drawFront("right", this.rig));
      this.addElts(this.arms, () => this.arms.drawFront("right", this.rig));
    };
    const upperLeft = () =>
      this.addElts(this.arms, () => this.arms.drawUpperFront("left", this.rig));
    const upperRight = () =>
      this.addElts(this.arms, () =>
        this.arms.drawUpperFront("right", this.rig),
      );
    const lowerLeft = () => {
      this.addElts(this.hands, () => this.hands.drawFront("left", this.rig));
      this.addElts(this.arms, () => this.arms.drawLowerFront("left", this.rig));
    };
    const lowerRight = () => {
      this.addElts(this.hands, () => this.hands.drawFront("right", this.rig));
      this.addElts(this.arms, () =>
        this.arms.drawLowerFront("right", this.rig),
      );
    };
    const torso = () => this.drawTorso();

    const DEBUG = false;
    const debug = (msg: string) => {
      if (DEBUG) console.log(msg);
    };

    let fcns: (() => void)[] = [];
    const combinedModes = `${this.leftArmDrawMode}-${this.rightArmDrawMode}`;
    switch (combinedModes) {
      // left arm under
      case "under-under": {
        debug("both under");
        fcns = [arms, torso];
        break;
      }
      case "under-over": {
        debug("left under, right over");
        fcns = [left, torso, right];
        break;
      }
      case "under-lower_over": {
        debug("left under, lower right over");
        fcns = [left, upperRight, torso, lowerRight];
        break;
      }
      case "under-upper_over": {
        debug("left under, upper right over");
        fcns = [left, lowerRight, torso, upperRight];
        break;
      }
      // left arm over
      case "over-under": {
        debug("left over, right under");
        fcns = [right, torso, left];
        break;
      }
      case "over-over": {
        debug("both over");
        fcns = [torso, arms];
        break;
      }
      case "over-lower_over": {
        debug("left over, upper right over");
        fcns = [upperRight, torso, left, lowerRight];
        break;
      }
      case "over-upper_over": {
        debug("left over, upper right over");
        fcns = [lowerRight, torso, left, upperRight];
        break;
      }
      // lower left arm over
      case "lower_over-under": {
        debug("lower left over, right under");
        fcns = [right, upperLeft, torso, lowerLeft];
        break;
      }
      case "lower_over-over": {
        debug("lower left over, right over");
        fcns = [upperLeft, torso, lowerLeft, right];
        break;
      }
      case "lower_over-lower_over": {
        debug("lower left over, lower right over");
        fcns = [upperLeft, upperRight, torso, lowerLeft, lowerRight];
        break;
      }
      case "lower_over-lower_under": {
        debug("lower left over, lower right under");
        fcns = [upperLeft, lowerRight, torso, lowerLeft, upperRight];
        break;
      }
      // upper left arm over
      case "upper_over-under": {
        debug("upper left over, right under");
        fcns = [right, lowerLeft, torso, upperLeft];
        break;
      }
      case "upper_over-over": {
        debug("upper left over, right over");
        fcns = [lowerLeft, torso, upperLeft, right];
        break;
      }
      case "upper_over-lower_over": {
        debug("upper left over, lower right over");
        fcns = [lowerLeft, upperRight, torso, upperLeft, lowerRight];
        break;
      }
      case "upper_over-under_over": {
        debug("upper left over, upper right over");
        fcns = [lowerLeft, lowerRight, torso, upperLeft, upperRight];
        break;
      }
      default: {
        debug("default - both under");
        fcns = [arms, torso];
      }
    }

    for (const i in fcns) {
      fcns[i]();
    }
  }
}
