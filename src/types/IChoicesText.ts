import * as PIXI from "pixi.js";

export default interface IChoicesText {
    choicesTextContainer: PIXI.Container;
    type: {
        default: PIXI.Container;
        classic: PIXI.Container;
    };
    firstChoiceText: PIXI.Text[];
    secondChoiceText: PIXI.Text[];
    firstChoiceTextString: string;
    secondChoiceTextString: string;
    typeSelected: string;
    visible: boolean;
}
