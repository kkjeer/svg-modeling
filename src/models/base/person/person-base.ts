import { PersonRig } from "../../../rigs/base/person-rig";
import {
  DEFAULT_PERSON_RIG,
  HEAD_DIRECTION_RANGES,
} from "../../../utils/constants";
import { Direction, DirectionRanges } from "../../../utils/types";
import { Model } from "../model";

export class PersonBaseModel extends Model {
  protected rig: PersonRig = DEFAULT_PERSON_RIG;

  protected direction: Direction = "front";
  protected directionRanges: DirectionRanges = HEAD_DIRECTION_RANGES;

  public draw(rig: PersonRig) {
    this.rig = rig;
    this.setDirection();

    return this.elts;
  }

  protected setDirection() {}
}
