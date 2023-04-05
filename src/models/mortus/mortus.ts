import type { PersonRig } from "../../rigs/base/person-rig";
import {
  MORTUS_BOTTOM_EYELASH,
  MORTUS_EAR,
  MORTUS_EYEBROW,
  MORTUS_FACE,
  MORTUS_IRIS,
  MORTUS_TOP_EYELASH,
  MORTUS_UPPER_LIP,
} from "../../data/mortus/mortus-face-data";
import { FaceModel } from "../base/person/face";
import { EyeModel } from "../base/person/eye";
import { MALE_EYE } from "../../data/base/person/eye-data";
import { NoseModel } from "../base/person/nose";
import { MALE_NOSE, MALE_NOSE_TIP } from "../../data/base/person/nose-data";
import { MouthMaleModel } from "../base/person/mouth-male";
import { EyebrowMaleModel } from "../base/person/eyebrow-male";
import { MODEL_RIGS } from "../../utils/getModel";
import { PERSON_COLORS } from "../../utils/constants";
import { NeckModel } from "../base/person/neck";
import { PersonMale } from "../base/person/person-male";
import { MORTUS_NECK } from "../../data/mortus/mortus-neck-data";
import { BootModel } from "../base/person/boot";
import { MALE_BOOT, MALE_CUFF } from "../../data/base/person/boot-data";
import { ArmModel } from "../base/person/arm";
import { MORTUS_ARM } from "../../data/mortus/mortus-torso-data";
import { LegMaleModel } from "../base/person/leg-male";
import { LEG } from "../../data/base/person/leg-male-data";
import { TorsoModel } from "../base/person/torso";
import { MALE_TORSO_VEST } from "../../data/base/person/torso-data";
import {
  cloudFilter,
  dottedEdgesFilter,
  furFilter,
  marbleFilter,
  stoneFilter,
  wavyEdgesFilter,
  woodFilter,
} from "../../utils/filters";
import { addArr, getEndpoint, shift1D } from "../../utils/misc";
import { HandModel } from "../base/person/hand";
import { MALE_HAND } from "../../data/base/person/hand-data";
import { EarModel } from "../base/person/ear";
import { MortusHairModel } from "./mortus-hair";
import { curveBetweenPoints } from "../../utils/math";

export class Mortus extends PersonMale {
  protected rig: PersonRig = MODEL_RIGS["mortus"] as PersonRig;

  constructor(width: number, height: number) {
    super(width, height);
    this.face = new MortusFaceModel(width, height);
    this.eyes = new MortusEyesModel(width, height);
    this.nose = new MortusNoseModel(width, height);
    this.mouth = new MortusMouthModel(width, height);
    this.eyebrows = new MortusEyebrowsModel(width, height);
    this.ears = new MortusEarModel(width, height);
    this.hair = new MortusHairModel(width, height);
    this.neck = new MortusNeckModel(width, height);

    this.arms = new MortusArmModel(width, height);
    this.hands = new MortusHandModel(width, height);
    this.torso = new MortusTorsoModel(width, height);
    this.leftArmDrawMode = "lower_over";
    // this.rightArmDrawMode = "upper_over";

    this.legs = new MortusLegModel(width, height);
    this.boots = new MortusBootModel(width, height);
  }
}

let faceColor = "#f1d5c9";
faceColor = "#edd5cb";
faceColor = PERSON_COLORS.skin; // default face color

class MortusFaceModel extends FaceModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.face = MORTUS_FACE;
    this.color = faceColor;
  }
}

class MortusEyesModel extends EyeModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.white = MALE_EYE;
    this.bottomEyelash = MORTUS_BOTTOM_EYELASH;
    this.topEyelash = MORTUS_TOP_EYELASH;
    this.iris = MORTUS_IRIS;
    this.faceColor = faceColor;
    this.eyelashColor = "#230505";
    this.irisColor = "#61786f";
    this.coverWidth = undefined;
    this.coverHeight = undefined;
  }
}

class MortusNoseModel extends NoseModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.nose = MALE_NOSE;
    this.noseTip = MALE_NOSE_TIP;
  }
}

class MortusMouthModel extends MouthMaleModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.upperLip = MORTUS_UPPER_LIP;
  }
}

class MortusEyebrowsModel extends EyebrowMaleModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.eyebrow = MORTUS_EYEBROW;
    this.color = "#4f1b10";
  }
}

class MortusEarModel extends EarModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.ear = MORTUS_EAR;
  }
}

class MortusNeckModel extends NeckModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.neck = MORTUS_NECK;
  }
}

class MortusArmModel extends ArmModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.arm = MORTUS_ARM;
    this.color = "#361a0c";
    this.color = "#635958";
    this.color = "#534948";
    this.filter = "mortus-arm-filter";

    this.filters[this.filter] = cloudFilter({
      color: "#363534",
      baseFrequency: "0.02 0.02",
      opacity: "0.8",
    });
  }
}

class MortusHandModel extends HandModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.hand = MALE_HAND;
    this.color = "#433938";
  }
}

class MortusTorsoModel extends TorsoModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.torso = MALE_TORSO_VEST;
    this.color = "#361a0c";
    this.color = "#534948";
    this.filter = "mortus-torso-filter";

    const filterKind: string = "cloud";
    switch (filterKind) {
      case "marble": {
        // this.color = "#222"; // xelai cloak
        this.filters[this.filter] = marbleFilter({
          color: this.color,
          contrast: "2",
          // flood: "#181818", // xelai cloak
          flood: "#635958",
          opacity: "1",
          baseFrequency: "0.01 0.01",
          // baseFrequency: "0.09 0.01",
          scale: "100",
          stdDeviation1: "4",
          stdDeviation2: "7",
          specularConstant: "0.7",
          specularExponent: "20",
          azimuth: "220",
          elevation: "60",
        });
        break;
      }
      case "stone": {
        // this.filters[this.filter] = stoneFilter({
        //   color: this.color,
        //   baseFrequency: "0.06",
        //   surfaceScale: "10",
        //   azimuth: "100",
        //   elevation: "40",
        // });
        this.color = "#635958";
        this.filters[this.filter] = stoneFilter({
          color: this.color,
          baseFrequency: "2.025",
          surfaceScale: "3",
          azimuth: "120",
          elevation: "60",
        });
        break;
      }
      case "cloud": {
        this.filters[this.filter] = cloudFilter({
          // color: "#473d3c",
          color: "#3a3938",
          baseFrequency: "0.02 0.02",
          opacity: "0.8",
        });
        break;
      }
      case "fur": {
        this.overlayColor = this.color;
        this.color = "#373737";
        this.overlayFilter = this.filter;
        this.filter = "";
        this.filters[this.overlayFilter] = furFilter({
          color: this.color,
          baseFrequency1: "0.01 0.03",
          baseFrequency2: "0.02 0.03",
          lightingScale: "8",
          specularConstant: "5",
          specularExponent: "100",
        });
        break;
      }
      case "wood": {
        this.overlayColor = this.color;
        this.color = "#837978";
        this.overlayFilter = this.filter;
        this.filter = "";
        // this.overlayThickness = 0.01;
        this.filters[this.overlayFilter] = woodFilter(this.overlayColor);
        break;
      }
      case "dottedEdges": {
        this.filters[this.filter] = dottedEdgesFilter();
        break;
      }
      case "wavyEdges": {
        this.filters[this.filter] = wavyEdgesFilter();
        break;
      }
    }
  }

  detailsFront = (data: ReturnType<typeof this.getFrontPointsData>) => {
    const { position } = this.rig.torso;
    const style = this.getTorsoStyle();

    const {
      collarUp,
      collarIn,
      collarDown,
      inset,
      leftInset,
      leftCollarDown,
      leftCollarIn,
      bottomCenter,
      hem,
      hip,
      leftWaist,
      leftHip,
      leftHem,
    } = data;
    inset[inset.length - 1] += 0.3;

    const detailFilter = "mortus-torso-detail-filter";
    this.filters[detailFilter] = furFilter({
      color: "#555",
      baseFrequency1: "0.01 0.03",
      baseFrequency2: "0.02 0.03",
      lightingScale: "8",
      specularConstant: "5",
      specularExponent: "100",
    });

    const props = {
      stroke: "#333",
      thickness: 5,
      filter: detailFilter,
      style,
    };

    const addDetail = (
      id: string,
      data: { [key: string]: number[] | number[][] },
    ) => {
      const points: number[][] = [];
      this.drawPoints(data, addArr(points));
      this.elts[id] = this.path(points, position, props);
    };

    const singleCollarDetail = false;

    if (singleCollarDetail) {
      addDetail("torsocollardetail", {
        collarUp,
        collarIn,
        collarDown,
        inset,
        leftInset,
        leftCollarDown,
        leftCollarIn,
      });
      return;
    } else {
      addDetail("torsorightcollardetail", {
        collarUp,
        collarIn,
        collarDown,
        inset,
      });
      addDetail("torsoleftcollardetail", {
        inset,
        leftInset,
        leftCollarDown,
        leftCollarIn,
      });
    }

    const singleHemDetail = true;

    if (singleHemDetail) {
      addDetail("torsohipdetail", {
        leftWaist,
        leftHip,
        leftHem,
        bottomCenter,
        hem,
        hip,
      });
    } else {
      addDetail("torsorighthipdetail", { bottomCenter, hem, hip });
      addDetail("torsolefthipdetail", {
        leftWaist,
        leftHip,
        leftHem,
        bottomCenter,
      });
    }
  };

  backgroundFront = (data: ReturnType<typeof this.getFrontPointsData>) => {
    const { position } = this.rig.torso;
    const style = this.getTorsoStyle();

    const { collarDown, inset, leftInset } = data;
    const insetY = getEndpoint(inset)[1] + 0.5;

    const topRight = shift1D(getEndpoint(collarDown), 0.5, 0);
    const topLeft = shift1D(getEndpoint(leftInset), -0.5, 0.0);

    const pointsData = {
      topRight,
      bottomRight: shift1D(getEndpoint(collarDown), 0.5, insetY - topRight[1]),
      bottomLeft: shift1D(getEndpoint(leftInset), -0.5, insetY - topRight[1]),
      topLeft,
      end: curveBetweenPoints(topLeft, topRight, [
        { t: 0.3, dy: 0.6 },
        { t: 0.7, dy: 0.6 },
      ]),
    };

    const points: number[][] = [];
    this.drawPoints(pointsData, addArr(points));

    this.elts["torsobackground"] = this.path(points, position, {
      fill: "#514746",
      style,
    });
  };
}

class MortusLegModel extends LegMaleModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.leg = LEG;
    this.color = "#441e09";
    this.color = "#736968";
  }
}

class MortusBootModel extends BootModel {
  constructor(width: number, height: number) {
    super(width, height);

    this.boot = MALE_BOOT;
    this.cuff = MALE_CUFF;
    this.color = "#2f170b";
    this.cuffColor = "#1f0500";
    this.color = "#534948";
    this.cuffColor = "#433938";
    this.filter = "mortus-boot-filter";
    this.cuffFilter = "mortus-boot-cuff-filter";

    this.filters[this.filter] = cloudFilter({
      // color: "#473d3c",
      color: "#2a2928",
      baseFrequency: "0.02 0.02",
      opacity: "0.8",
    });
    this.filters[this.cuffFilter] = cloudFilter({
      // color: "#473d3c",
      color: "#1a1918",
      baseFrequency: "0.02 0.02",
      opacity: "0.8",
    });
  }
}
