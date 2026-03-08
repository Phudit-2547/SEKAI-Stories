import React, { useContext } from "react";
import RadioButton from "../../../UI/RadioButton";
import { useTranslation } from "react-i18next";
import { SceneContext } from "../../../../contexts/SceneContext";
import { Checkbox } from "../../../UI/Checkbox";

const SceneText: React.FC = () => {
    const { t } = useTranslation();

    const scene = useContext(SceneContext);
    if (!scene) throw new Error("Context not loaded");

    const { text, setText, sceneText, setSceneText, modelWrapper } = scene;

    if (!text || !sceneText) return <p>{t("loadings.please-wait")}</p>;

    const handleSceneTextVisible = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const visible = Boolean(event?.target.checked);
        if (sceneText?.sceneTextContainer) {
            sceneText.sceneTextContainer.visible = visible;
        }
        if (!visible && text.hideEverything) {
            if (modelWrapper) {
                modelWrapper.visible = true;
            }
            text.textContainer.visible = true;
        }
        setSceneText({
            ...sceneText,
            visible: visible,
        });
        setText({
            ...text,
            hideEverything: false,
        });
    };

    const handleHideEverything = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!modelWrapper) {
            return;
        }
        const hide = Boolean(event?.target.checked);

        modelWrapper.visible = !hide;
        text.textContainer.visible = !hide;

        setText({
            ...text,
            hideEverything: hide,
        });
    };

    const handleSceneTextChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const changedSceneText = event.target.value
            .replace(/“|”/g, '"')
            .replace(/‘|’/g, "'");

        sceneText.text.forEach((t) => {
            t.text = changedSceneText;
            t.updateText(true);
        });

        setSceneText({
            ...sceneText,
            textString: changedSceneText,
        });
    };

    const handleSceneTextVariantChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value;

        Object.entries(sceneText.variant).forEach(([type, containers]) => {
            containers.forEach(
                (container) => (container.visible = value === type),
            );
        });

        setSceneText({
            ...sceneText,
            variantSelected: value,
        });
    };
    const handleSceneTextBoxTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value;

        Object.entries(sceneText.type).forEach(([type, container]) => {
            container.visible = value === type;
        });

        Object.entries(sceneText.variant).forEach(([type, containers]) => {
            containers.forEach(
                (container) =>
                    (container.visible = sceneText.variantSelected === type),
            );
        });

        setSceneText({
            ...sceneText,
            typeSelected: value,
        });
    };

    return (
        <>
            <div className="option__content">
                <input
                    type="text"
                    name="scene-text"
                    id="scene-text"
                    value={sceneText.textString}
                    onChange={handleSceneTextChange}
                />
            </div>
            <div className="option__content">
                <h3>{t("text.scene-text.variant.header")}</h3>
                <div className="flex-horizontal center padding-top-bottom-10">
                    <RadioButton
                        name="scene-text-variant"
                        value="middle"
                        onChange={handleSceneTextVariantChange}
                        id="middle"
                        data={sceneText.variantSelected}
                    />
                    <label className="width-100 radio__label" htmlFor="middle">
                        {t("text.scene-text.variant.middle")}
                    </label>
                </div>
                <div className="flex-horizontal center padding-top-bottom-10">
                    <RadioButton
                        name="scene-text-variant"
                        value="topLeft"
                        id="topLeft"
                        onChange={handleSceneTextVariantChange}
                        data={sceneText.variantSelected}
                    />
                    <label className="width-100 radio__label" htmlFor="topLeft">
                        {t("text.scene-text.variant.top-left")}
                    </label>
                </div>
            </div>
            <div className="option__content">
                <h3>{t("text.scene-text.box-type.header")}</h3>
                <div className="flex-horizontal center padding-top-bottom-10">
                    <RadioButton
                        name="scene-text-box-type"
                        value="default"
                        onChange={handleSceneTextBoxTypeChange}
                        id="default"
                        data={sceneText.typeSelected}
                    />
                    <label className="width-100 radio__label" htmlFor="default">
                        {t("text.scene-text.box-type.default")}
                    </label>
                </div>
                <div className="flex-horizontal center padding-top-bottom-10">
                    <RadioButton
                        name="scene-text-box-type"
                        value="classic"
                        id="classic"
                        onChange={handleSceneTextBoxTypeChange}
                        data={sceneText.typeSelected}
                    />
                    <label className="width-100 radio__label" htmlFor="classic">
                        {t("text.scene-text.box-type.classic")}
                    </label>
                </div>
            </div>
            <div className="option__content">
                <h3>{t("global.toggles")}</h3>
                <Checkbox
                    id="visible"
                    label={t("global.visible")}
                    checked={sceneText.visible}
                    onChange={handleSceneTextVisible}
                />
                {sceneText.visible && (
                    <Checkbox
                        id="hide-everything"
                        label={t("text.scene-text.hide-everything")}
                        checked={text.hideEverything}
                        onChange={handleHideEverything}
                    />
                )}
            </div>
        </>
    );
};

export default SceneText;
