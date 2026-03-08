import React, { useContext } from "react";
import RadioButton from "../../../UI/RadioButton";
import { useTranslation } from "react-i18next";
import { SceneContext } from "../../../../contexts/SceneContext";
import { Checkbox } from "../../../UI/Checkbox";

const ChoicesText: React.FC = () => {
    const { t } = useTranslation();

    const scene = useContext(SceneContext);
    if (!scene) throw new Error("Context not loaded");

    const { text, setText, choicesText, setChoicesText } = scene;

    if (!text || !choicesText) return <p>{t("loadings.please-wait")}</p>;

    const handleChoicesTextVisible = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const visible = Boolean(event?.target.checked);
        if (choicesText?.choicesTextContainer) {
            choicesText.choicesTextContainer.visible = visible;
        }
        setChoicesText({
            ...choicesText,
            visible: visible,
        });
        text.textContainer.visible = true;
        setText({
            ...text,
            visible: true,
        });
    };

    const handleChoicesTextChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        choice: number,
    ) => {
        const changedChoicesText = event.target.value
            .replace(/“|”/g, '"')
            .replace(/‘|’/g, "'");

        switch (choice) {
            case 1:
                choicesText.firstChoiceText.forEach((t) => {
                    t.text = changedChoicesText;
                    t.updateText(true);
                });
                setChoicesText({
                    ...choicesText,
                    firstChoiceTextString: changedChoicesText,
                });
                break;
            case 2:
                choicesText.secondChoiceText.forEach((t) => {
                    t.text = changedChoicesText;
                    t.updateText(true);
                });
                setChoicesText({
                    ...choicesText,
                    secondChoiceTextString: changedChoicesText,
                });
                break;
        }
    };

    const handleChoicesTextBoxTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value;

        Object.entries(choicesText.type).forEach(([type, container]) => {
            container.visible = value === type;
        });

        setChoicesText({
            ...choicesText,
            typeSelected: value,
        });
    };

    const handleDialogueBoxVisible = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const visible = Boolean(event?.target.checked);
        if (text?.textContainer) {
            text.textContainer.visible = visible;
        }
        setText({
            ...text,
            visible: visible,
        });
    };

    return (
        <>
            <div className="option__content">
                <input
                    type="text"
                    name="first-choices-text"
                    id="first-choices-text"
                    value={choicesText.firstChoiceTextString}
                    onChange={(e) => {
                        handleChoicesTextChange(e, 1);
                    }}
                />
                <input
                    type="text"
                    name="second-choices-text"
                    id="second-choices-text"
                    value={choicesText.secondChoiceTextString}
                    onChange={(e) => {
                        handleChoicesTextChange(e, 2);
                    }}
                />
            </div>
            <div className="option__content">
                <h3>{t("text.choices-text.box-type.header")}</h3>
                <div className="flex-horizontal center padding-top-bottom-10">
                    <RadioButton
                        name="choices-text-box-type"
                        value="default"
                        onChange={handleChoicesTextBoxTypeChange}
                        id="default"
                        data={choicesText.typeSelected}
                    />
                    <label className="width-100 radio__label" htmlFor="default">
                        {t("text.choices-text.box-type.default")}
                    </label>
                </div>
                <div className="flex-horizontal center padding-top-bottom-10">
                    <RadioButton
                        name="choices-text-box-type"
                        value="classic"
                        id="classic"
                        onChange={handleChoicesTextBoxTypeChange}
                        data={choicesText.typeSelected}
                    />
                    <label className="width-100 radio__label" htmlFor="classic">
                        {t("text.choices-text.box-type.classic")}
                    </label>
                </div>
            </div>
            <div className="option__content">
                <h3>{t("global.toggles")}</h3>
                <Checkbox
                    id="visible"
                    label={t("global.visible")}
                    checked={choicesText.visible}
                    onChange={handleChoicesTextVisible}
                />
                {choicesText.visible && (
                    <Checkbox
                        id="hide-dialogue-box"
                        label={t("text.choices-text.dialogue-box-visible")}
                        checked={text.visible}
                        onChange={handleDialogueBoxVisible}
                    />
                )}
            </div>
        </>
    );
};

export default ChoicesText;
