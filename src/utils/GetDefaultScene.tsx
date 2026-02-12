import * as PIXI from "pixi.js";
import { getBackground } from "../utils/GetBackground";
import { Live2DModel } from "@sekai-world/pixi-live2d-display-mulmotion";
import { Dispatch, SetStateAction } from "react";
import { Assets } from "@pixi/assets";
import IBackground from "../types/IBackground";
import { ISplitBackground } from "../types/ISplitBackground";
import IText from "../types/IText";
import ISceneText from "../types/ISceneText";
import IGuideline from "../types/IGuideline";
import IModel from "../types/IModel";
import { IFilter } from "../types/IFilter";
import { AdjustmentFilter } from "pixi-filters";
import { ILighting } from "../types/ILighting";
import { InitialScene } from "../types/IInitialScene";
import { CheckSceneCategory, randomInitialScene } from "../data/Scenes";

interface GetDefaultSceneProps {
    app: PIXI.Application | undefined;
    setStartingMessage: Dispatch<SetStateAction<string>>;
    setLoading: Dispatch<SetStateAction<number>>;
    blankCanvas: boolean;
}

const LoadInitialScene = (scene: string): InitialScene => {
    return randomInitialScene[scene][
        Math.floor(Math.random() * randomInitialScene[scene].length)
    ];
};

const firstSplitBackgroundFilename = "/background_compressed/bg_e000303.jpg";
const secondSplitBackgroundFilename = "/background_compressed/bg_e000403.jpg";

const LoadBackground = async (
    container: PIXI.Container,
    childAt: number,
    fileName: string,
): Promise<IBackground> => {
    const backgroundContainer = new PIXI.Container();
    const backgroundSprite = await getBackground(fileName);
    backgroundContainer.addChild(backgroundSprite);
    container.addChildAt(backgroundContainer, childAt);

    return {
        backgroundContainer: backgroundContainer,
        filename: fileName,
        upload: false,
    };
};

const LoadSplitBackground = async (
    container: PIXI.Container,
    childAt: number,
): Promise<ISplitBackground> => {
    const splitBackgroundContainer = new PIXI.Container();
    const firstBackground = new PIXI.Container();
    const firstBackgroundSprite = await getBackground(
        firstSplitBackgroundFilename,
    );
    const firstMask = new PIXI.Graphics();
    firstMask.beginFill();
    firstMask.moveTo(0, 0);
    firstMask.lineTo(985, 0);
    firstMask.lineTo(905, 1080);
    firstMask.lineTo(0, 1080);
    firstMask.endFill();
    firstBackground.mask = firstMask;
    firstBackground.addChild(firstBackgroundSprite);
    const secondBackground = new PIXI.Container();
    const secondBackgroundSprite = await getBackground(
        secondSplitBackgroundFilename,
    );
    const secondMask = new PIXI.Graphics();
    secondMask.beginFill();
    secondMask.moveTo(1920, 0);
    secondMask.lineTo(1005, 0);
    secondMask.lineTo(925, 1080);
    secondMask.lineTo(1920, 1080);
    secondMask.endFill();
    secondBackground.mask = secondMask;
    secondBackground.addChild(secondBackgroundSprite);
    const line = new PIXI.Graphics();
    line.beginFill(0xffffff);
    line.moveTo(985, 0);
    line.lineTo(1005, 0);
    line.lineTo(925, 1080);
    line.lineTo(905, 1080);
    line.endFill();
    splitBackgroundContainer.addChildAt(firstBackground, 0);
    splitBackgroundContainer.addChildAt(secondBackground, 1);
    splitBackgroundContainer.addChildAt(line, 2);
    container.addChildAt(splitBackgroundContainer, childAt);
    splitBackgroundContainer.visible = false;

    return {
        splitContainer: splitBackgroundContainer,
        first: {
            backgroundContainer: firstBackground,
            filename: firstSplitBackgroundFilename,
            upload: false,
        },
        second: {
            backgroundContainer: secondBackground,
            filename: secondSplitBackgroundFilename,
            upload: false,
        },
        visible: false,
    };
};

const LoadModel = async (
    container: PIXI.Container,
    childAt: number,
    file: string,
    x: number,
    y: number,
    scale?: number,
): Promise<{
    model: Record<string, IModel>;
    modelWrapper: PIXI.Container;
    lighting: ILighting;
}> => {
    const modelWrapper = new PIXI.Container();
    const modelContainer = new PIXI.Container();
    const texture = await PIXI.Texture.fromURL(`/img/characters/${file}.png`);
    const sprite = new PIXI.Sprite(texture);
    modelContainer.addChildAt(sprite, 0);
    modelWrapper.addChildAt(modelContainer, 0);
    modelContainer.pivot.set(
        modelContainer.width / 2,
        modelContainer.height / 2,
    );
    modelContainer.position.set(x, y);
    modelContainer.scale.set(scale, scale);
    const lighting: ILighting = {
        red: 1,
        green: 1,
        blue: 1,
        saturation: 1,
        brightness: 1,
    };
    const adjustmentFilter = new AdjustmentFilter(lighting);
    modelWrapper.filters = [adjustmentFilter];

    const blurFilter = new PIXI.BlurFilter(0);
    modelContainer.filters = [blurFilter];

    container.addChildAt(modelWrapper, childAt);
    return {
        model: {
            character1: {
                character: "custom",
                root: modelContainer,
                model: sprite,
                modelName: file,
                modelX: modelContainer.x,
                modelY: modelContainer.y,
                modelScale: modelContainer.scale.x,
                modelRotation: 0,
                modelBlur: 0,
                modelData: undefined,
                virtualEffect: false,
                expression: 0,
                pose: 0,
                idle: true,
                visible: true,
                from: "sekai",
                parametersChanged: {},
            },
        },
        modelWrapper: modelWrapper,
        lighting: lighting,
    };
};

/**
 * TODO: Refactor this massive block of shit.
 */
const LoadText = async (
    app: PIXI.Application,
    childAt: number,
    nameTag: string,
    dialogue: string,
): Promise<IText> => {
    const textAlignmentCookie = Number(
        localStorage.getItem("textAlignment-v2") ?? 0,
    );

    const textContainer = new PIXI.Container();

    // Default Texture
    const defaultTextBackgroundTexture = await Assets.load(
        "/img/Dialogue_Background.png",
    );
    const defaultTextBackgroundSprite = new PIXI.Sprite(
        defaultTextBackgroundTexture,
    );
    defaultTextBackgroundSprite.width = 1920;
    defaultTextBackgroundSprite.height = 1080;

    const defaultTextNameTag = new PIXI.Text(nameTag, {
        fontFamily: "FOT-RodinNTLGPro-EB",
        fontSize: 44,
        fill: 0xebebef,
        stroke: 0x5d5d79,
        strokeThickness: 8,
    });
    defaultTextNameTag.position.set(225, 775 + textAlignmentCookie);

    const defaultTextDialogue = new PIXI.Text(dialogue, {
        fontFamily: "FOT-RodinNTLGPro-DB",
        fontSize: 44,
        fill: 0xffffff,
        stroke: 0x5d5d79,
        strokeThickness: 8,
        wordWrap: true,
        wordWrapWidth: 1300,
        breakWords: true,
        lineHeight: 55,
    });
    defaultTextDialogue.position.set(245, 845 + textAlignmentCookie);

    const defaultTextBox = new PIXI.Container();
    defaultTextBox.addChildAt(defaultTextBackgroundSprite, 0);
    defaultTextBox.addChildAt(defaultTextNameTag, 1);
    defaultTextBox.addChildAt(defaultTextDialogue, 2);

    // Classic Texture
    const classicTextBackgroundTexture = await Assets.load(
        "/img/Dialogue_Background_Classic.png",
    );
    const classicTextBackgroundSprite = new PIXI.Sprite(
        classicTextBackgroundTexture,
    );
    classicTextBackgroundSprite.width = 1920;
    classicTextBackgroundSprite.height = 1080;

    const classicTextNameTag = new PIXI.Text(nameTag, {
        fontFamily: "FOT-RodinNTLGPro-DB",
        fontSize: 44,
        fill: 0xffffff,
    });
    classicTextNameTag.position.set(295, 730 + textAlignmentCookie);

    const classicTextDialogue = new PIXI.Text(dialogue, {
        fontFamily: "FOT-RodinNTLGPro-DB",
        fontSize: 44,
        fill: 0x444466,
        wordWrap: true,
        wordWrapWidth: 1300,
        breakWords: true,
        lineHeight: 55,
    });
    classicTextDialogue.position.set(245, 805 + textAlignmentCookie);

    const classicTextBox = new PIXI.Container();
    classicTextBox.addChildAt(classicTextBackgroundSprite, 0);
    classicTextBox.addChildAt(classicTextNameTag, 1);
    classicTextBox.addChildAt(classicTextDialogue, 2);

    classicTextBox.visible = false;

    // MYSEKAI Texture
    const mySekaiTextBackgroundTexture = await Assets.load(
        "/img/Dialogue_Background_MYSEKAI.png",
    );
    const mySekaiTextBackgroundSprite = new PIXI.Sprite(
        mySekaiTextBackgroundTexture,
    );
    mySekaiTextBackgroundSprite.width = 1920;
    mySekaiTextBackgroundSprite.height = 1080;

    const mySekaiTextNameTag = new PIXI.Text(nameTag, {
        fontFamily: "FOT-RodinNTLGPro-EB",
        fontSize: 44,
        fill: 0x444466,
    });
    mySekaiTextNameTag.position.set(265, 745 + textAlignmentCookie);

    const mySekaiTextDialogue = new PIXI.Text(dialogue, {
        fontFamily: "FOT-RodinNTLGPro-DB",
        fontSize: 44,
        fill: 0x444466,
        wordWrap: true,
        wordWrapWidth: 1300,
        breakWords: true,
        lineHeight: 55,
    });
    mySekaiTextDialogue.position.set(265, 810 + textAlignmentCookie);

    const mySekaiTextBox = new PIXI.Container();
    mySekaiTextBox.addChildAt(mySekaiTextBackgroundSprite, 0);
    mySekaiTextBox.addChildAt(mySekaiTextNameTag, 1);
    mySekaiTextBox.addChildAt(mySekaiTextDialogue, 2);
    mySekaiTextBox.visible = false;

    textContainer.addChildAt(defaultTextBox, 0);
    textContainer.addChildAt(classicTextBox, 1);
    textContainer.addChildAt(mySekaiTextBox, 2);

    app.stage.addChildAt(textContainer, childAt);

    return {
        textContainer: textContainer,
        type: {
            default: defaultTextBox,
            classic: classicTextBox,
            mySekai: mySekaiTextBox,
        },
        nameTag: [defaultTextNameTag, classicTextNameTag, mySekaiTextNameTag],
        dialogue: [
            defaultTextDialogue,
            classicTextDialogue,
            mySekaiTextDialogue,
        ],
        nameTagString: nameTag,
        dialogueString: dialogue,
        fontSize: 44,
        visible: true,
        yOffset: textAlignmentCookie,
        hideEverything: false,
        typeSelected: "default",
    };
};

/**
 * TODO: Refactor this massive block of shit.
 */
const LoadSceneText = async (
    app: PIXI.Application,
    childAt: number,
    scene: string,
): Promise<ISceneText> => {
    const sceneTextContainer = new PIXI.Container();

    // Default Middle Texture
    const defaultSceneTextMiddleTexture = await Assets.load(
        "/img/SceneText_Background.png",
    );
    const defaultSceneTextMiddleSprite = new PIXI.Sprite(
        defaultSceneTextMiddleTexture,
    );
    const defaultSceneTextMiddle = new PIXI.Text(scene, {
        fontFamily: "FOT-RodinNTLGPro-DB",
        fontSize: 44,
        fill: 0xffffff,
        align: "center",
    });
    defaultSceneTextMiddle.anchor.set(0.5, 0.5);
    defaultSceneTextMiddle.position.set(960, 540);

    const defaultSceneTextMiddleContainer = new PIXI.Container();
    defaultSceneTextMiddleContainer.addChildAt(defaultSceneTextMiddleSprite, 0);
    defaultSceneTextMiddleContainer.addChildAt(defaultSceneTextMiddle, 1);

    // Default Top-left Texture
    const defaultSceneTextTopLeftTexture = await Assets.load(
        "/img/SceneText_TopLeft.png",
    );
    const defaultSceneTextTopLeftSprite = new PIXI.Sprite(
        defaultSceneTextTopLeftTexture,
    );
    const defaultSceneTextTopLeft = new PIXI.Text(scene, {
        fontFamily: "FOT-RodinNTLGPro-DB",
        fontSize: 39,
        fill: 0xffffff,
        align: "center",
    });
    defaultSceneTextTopLeft.anchor.set(0, 0.5);
    defaultSceneTextTopLeft.position.set(120, 62);

    const defaultSceneTextTopLeftContainer = new PIXI.Container();
    defaultSceneTextTopLeftContainer.addChildAt(
        defaultSceneTextTopLeftSprite,
        0,
    );
    defaultSceneTextTopLeftContainer.addChildAt(defaultSceneTextTopLeft, 1);
    defaultSceneTextTopLeftContainer.visible = false;

    const defaultSceneTextBox = new PIXI.Container();
    defaultSceneTextBox.addChildAt(defaultSceneTextMiddleContainer, 0);
    defaultSceneTextBox.addChildAt(defaultSceneTextTopLeftContainer, 1);

    // Classic Center Texture
    const classicSceneTextMiddleTexture = await Assets.load(
        "/img/SceneText_Background_Classic.png",
    );
    const classicSceneTextMiddleSprite = new PIXI.Sprite(
        classicSceneTextMiddleTexture,
    );
    const classicSceneTextMiddle = new PIXI.Text(scene, {
        fontFamily: "FOT-RodinNTLGPro-DB",
        fontSize: 40,
        fill: 0xffffff,
        align: "center",
    });
    classicSceneTextMiddle.anchor.set(0.5, 0.5);
    classicSceneTextMiddle.position.set(960, 540);

    const classicSceneTextMiddleContainer = new PIXI.Container();
    classicSceneTextMiddleContainer.addChildAt(classicSceneTextMiddleSprite, 0);
    classicSceneTextMiddleContainer.addChildAt(classicSceneTextMiddle, 1);

    // Clssic Top-left Texture
    const classicSceneTextTopLeftTexture = await Assets.load(
        "/img/SceneText_TopLeft_Classic.png",
    );
    const classicSceneTextTopLeftSprite = new PIXI.Sprite(
        classicSceneTextTopLeftTexture,
    );
    const classicSceneTextTopLeft = new PIXI.Text(scene, {
        fontFamily: "FOT-RodinNTLGPro-DB",
        fontSize: 32,
        fill: 0xffffff,
        align: "center",
    });
    classicSceneTextTopLeft.anchor.set(0, 0.5);
    classicSceneTextTopLeft.position.set(62, 76);

    const classicSceneTextTopLeftContainer = new PIXI.Container();
    classicSceneTextTopLeftContainer.addChildAt(
        classicSceneTextTopLeftSprite,
        0,
    );
    classicSceneTextTopLeftContainer.addChildAt(classicSceneTextTopLeft, 1);
    classicSceneTextTopLeftContainer.visible = false;

    const classicSceneTextBox = new PIXI.Container();
    classicSceneTextBox.addChildAt(classicSceneTextMiddleContainer, 0);
    classicSceneTextBox.addChildAt(classicSceneTextTopLeftContainer, 1);
    classicSceneTextBox.visible = false;

    sceneTextContainer.addChildAt(defaultSceneTextBox, 0);
    sceneTextContainer.addChildAt(classicSceneTextBox, 1);

    app.stage.addChildAt(sceneTextContainer, childAt);

    sceneTextContainer.visible = false;

    return {
        sceneTextContainer: sceneTextContainer,
        type: {
            default: defaultSceneTextBox,
            classic: classicSceneTextBox,
        },
        variant: {
            middle: [
                defaultSceneTextMiddleContainer,
                classicSceneTextMiddleContainer,
            ],
            topLeft: [
                defaultSceneTextTopLeftContainer,
                classicSceneTextTopLeftContainer,
            ],
        },
        text: [
            defaultSceneTextMiddle,
            defaultSceneTextTopLeft,
            classicSceneTextMiddle,
            classicSceneTextTopLeft,
        ],
        textString: scene,
        visible: false,
        typeSelected: "default",
        variantSelected: "middle",
    };
};

const LoadGuideline = async (
    app: PIXI.Application,
    childAt: number,
): Promise<IGuideline> => {
    const guidelineContainer = new PIXI.Container();
    const gridTexture = await Assets.load("/img/grid.png");
    const gridSprite = new PIXI.Sprite(gridTexture);
    guidelineContainer.addChild(gridSprite);
    guidelineContainer.visible = false;
    guidelineContainer.alpha = 0.2;
    app.stage.addChildAt(guidelineContainer, childAt);

    return {
        container: guidelineContainer,
        visible: false,
    };
};

export const LoadScene = async ({
    app,
    setStartingMessage,
    setLoading,
    blankCanvas,
}: GetDefaultSceneProps) => {
    const scene = CheckSceneCategory(blankCanvas);

    setLoading(0);
    const initialScene: InitialScene = LoadInitialScene(scene);

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    if (app) {
        app.stop();
    }

    setLoading(10);
    const initApplication = new PIXI.Application({
        view: canvas,
        autoStart: true,
        width: 1920,
        height: 1080,
        backgroundColor: 0x000000,
    });

    Live2DModel.registerTicker(PIXI.Ticker);

    setLoading(20);
    // Load Transparent (for development. idk why it causes issues before production)
    const transparentContainer = new PIXI.Container();
    const transparentSprite = await getBackground(
        "/background_special/Background_Transparent.png",
    );
    transparentContainer.addChildAt(transparentSprite, 0);
    initApplication.stage.addChildAt(transparentContainer, 0);

    setLoading(30);
    // Load Filter Container
    const filterContainer = new PIXI.Container();
    filterContainer.pivot.set(1920 / 2, 1080 / 2);
    filterContainer.position.set(1920 / 2, 1080 / 2);
    filterContainer.scale.set(1, 1);
    initApplication.stage.addChildAt(filterContainer, 1);
    const filter: IFilter = { container: filterContainer };

    setLoading(40);
    // Load Background
    setStartingMessage("Adding background...");
    const background = await LoadBackground(
        filterContainer,
        0,
        initialScene["background"],
    );

    setLoading(50);
    // Load Split Background
    const splitBackground = await LoadSplitBackground(filterContainer, 1);

    setLoading(60);
    // Load Sample PNG Sprite
    const { model, modelWrapper, lighting } = await LoadModel(
        filterContainer,
        2,
        initialScene.pngName,
        initialScene.modelX,
        initialScene.modelY,
        initialScene.modelScale ?? 1,
    );

    setLoading(70);
    // Load Text
    setStartingMessage("Adding text...");
    const text = await LoadText(
        initApplication,
        2,
        initialScene.nameTag,
        initialScene.text,
    );

    setLoading(80);
    // Load Scene Setting Text
    const sceneText = await LoadSceneText(
        initApplication,
        3,
        initialScene.sceneText,
    );

    setLoading(90);
    // Load Guideline Tools
    const guideline = await LoadGuideline(initApplication, 4);

    setLoading(100);
    return {
        app: initApplication,
        model: model,
        currentKey: "character1",
        currentModel: model["character1"],
        modelWrapper: modelWrapper,
        lighting: lighting,
        background: background,
        splitBackground: splitBackground,
        text: text,
        sceneText: sceneText,
        filter: filter,
        guideline: guideline,
    };
};
