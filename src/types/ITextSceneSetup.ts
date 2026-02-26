export interface IBaseTextSceneSetup {
    textString?: string;
    textStyle: ITextStyle;
    textPosition: ITextPosition;
    textAnchor?: {
        x: number;
        y: number;
    };
}

export interface IDialogueTextSetup {
    bg: string;
    nameTag: IBaseTextSceneSetup;
    dialogue: IBaseTextSceneSetup;
    visible: boolean;
}

export interface IChoicesTextSetup {
    bg: string;
    choice1: IBaseTextSceneSetup;
    choice2: IBaseTextSceneSetup;
    visible: boolean;
}

export interface ISceneTextSetup {
    bg: string;
    text: IBaseTextSceneSetup;
    visible: boolean;
}

interface ITextPosition {
    x: number;
    y: number;
}
interface ITextStyle {
    fontFamily: string;
    fontSize: number;
    fill: number;
    align?: "left" | "center" | "right";
    stroke?: number;
    strokeThickness?: number;
    wordWrap?: boolean;
    wordWrapWidth?: number;
    breakWords?: boolean;
    lineHeight?: number;
}
