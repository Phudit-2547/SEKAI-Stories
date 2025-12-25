import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { SceneContext } from "../../../../contexts/SceneContext";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../../../UI/Checkbox";
import InputWindow from "../../../UI/InputWindow";
import { SoftErrorContext } from "../../../../contexts/SoftErrorContext";
import Window from "../../../UI/Window";
import { mentalCheck } from "../../../../utils/MentalCheck";
import { SettingsContext } from "../../../../contexts/SettingsContext";

const symbols = {
    star: "☆",
    "star-filled": "★",
    squiggly: "～",
    "em-dash": "—",
    heart: "♡",
    "heart-filled": "❤︎",
    "quarter-note": "♩",
    "eighth-note": "♪",
    "beamed-eight-note": "♫",
    "beamed-sixteenth-note": "♬",
    "japanese-ellipsis": "…",
    "japanese-circle": "〇",
    "japanese-cross": "×",
};

interface DialogueProps {
    bell: boolean;
    setBell: Dispatch<SetStateAction<boolean>>;
    mentalFound: boolean;
    setMentalFound: Dispatch<SetStateAction<boolean>>;
    lockFontSizeState: boolean;
    setLockFontSizeState: Dispatch<SetStateAction<boolean>>;
}

const Dialogue: React.FC<DialogueProps> = ({
    bell,
    setBell,
    mentalFound,
    setMentalFound,
    lockFontSizeState,
    setLockFontSizeState,
}) => {
    const { t } = useTranslation();

    const scene = useContext(SceneContext);
    const settings = useContext(SettingsContext);
    const error = useContext(SoftErrorContext);
    if (!scene || !error || !settings) throw new Error("Context not loaded");
    const { text, setText } = scene;
    const { setErrorInformation } = error;
    const { showMentalHealthWindow } = settings;
    const [showFontSizeInput, setShowFontSizeInput] = useState<boolean>(false);
    const [mentalWindow, setMentalWindow] = useState<boolean>(false);

    if (!text) return <p>{t("please-wait")}</p>;

    const handleDialogueBoxVisible = (
        event: React.ChangeEvent<HTMLInputElement>
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

    const handleDialogueChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const changedDialogue = event.target.value
            .replace(/“|”/g, '"')
            .replace(/‘|’/g, "'");
        text.dialogue.text = changedDialogue;
        text.dialogue.updateText(true);

        if (
            /bell/gim.test(changedDialogue) &&
            /mizuki/gim.test(text.nameTagString) &&
            !bell
        ) {
            window.open("https://ominous-bells.vercel.app/");
            setErrorInformation("Let Mizuki rest. She's happy now.");
            setBell(true);
        }
        const mentalResult = mentalCheck(changedDialogue);
        if (mentalResult && !mentalFound && showMentalHealthWindow) {
            setMentalWindow(true);
            setMentalFound(true);
            localStorage.setItem("mentalHealthWordFound", "true");
        }
        setText({
            ...text,
            dialogueString: changedDialogue,
        });
    };

    const handleAddSymbol = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const symbol = event.target.value;
        if (symbol !== "none") {
            text.dialogue.text += symbol;
            text.dialogue.updateText(true);
            setText({
                ...text,
                dialogueString: text.dialogue.text,
            });
        }
    };

    const handleFontSizeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const changedFontSize = Number(event.target.value);
        text.dialogue.style.fontSize = changedFontSize;
        text.dialogue.style.strokeThickness = Math.floor(
            8 + (changedFontSize / 44 - 1) * 2
        );
        text.dialogue.style.lineHeight = Math.floor(
            55 + (changedFontSize / 44 - 1) * 40
        );
        text.dialogue.updateText(true);
        setText({
            ...text,
            fontSize: changedFontSize,
        });
    };

    const handleInputFontSizeChange = async (inputChange: string) => {
        if (inputChange == null || isNaN(Number(inputChange))) return;
        const changedFontSize = Number(inputChange);
        text.dialogue.style.fontSize = changedFontSize;
        text.dialogue.style.strokeThickness =
            8 + (changedFontSize / 44 - 1) * 2;
        text.dialogue.style.lineHeight = Math.floor(
            55 + (changedFontSize / 44 - 1) * 40
        );
        text.dialogue.updateText(true);
        setText({
            ...text,
            fontSize: changedFontSize,
        });
    };

    return (
        <>
            <textarea
                name="dialogue"
                id="dialogue"
                value={text?.dialogueString}
                onChange={handleDialogueChange}
            ></textarea>
            <select
                name="add-symbol"
                id="add-symbol"
                value="none"
                onChange={handleAddSymbol}
            >
                <option value="none" disabled>
                    {t("text.add-symbol")}
                </option>
                {Object.entries(symbols).map(([key, value]) => (
                    <option key={key} value={value}>
                        {`${value} (${key})`}
                    </option>
                ))}
            </select>
            <div className="transform-icons">
                <h3>
                    {t("text.font-size")} ({text.fontSize} px)
                </h3>
                <div>
                    <i
                        className="bi bi-pencil-fill"
                        onClick={() => setShowFontSizeInput(true)}
                    ></i>
                    <i
                        className={
                            lockFontSizeState
                                ? "bi bi-unlock-fill"
                                : "bi bi-lock-fill"
                        }
                        onClick={() => {
                            setLockFontSizeState(!lockFontSizeState);
                            localStorage.setItem(
                                "lockFontSize",
                                String(!lockFontSizeState)
                            );
                        }}
                    ></i>
                </div>
            </div>
            <input
                type="range"
                name="font-size"
                id="font-size"
                value={text.fontSize}
                min={10}
                max={120}
                onChange={handleFontSizeChange}
                {...(lockFontSizeState ? { disabled: true } : {})}
            />
            <Checkbox
                id="visible"
                label={t("visible")}
                checked={text.visible}
                onChange={handleDialogueBoxVisible}
            />
            {showFontSizeInput && (
                <InputWindow
                    show={setShowFontSizeInput}
                    confirmFunction={(x: string) =>
                        handleInputFontSizeChange(x)
                    }
                    description={t("text.enter-font-size")}
                />
            )}
            {mentalWindow && (
                <Window
                    show={setMentalWindow}
                    buttons={
                        <button
                            onClick={() => {
                                window.open(
                                    "https://www.google.com/search?q=suicide+hotline",
                                    "_blank"
                                );
                                setMentalFound(true);
                            }}
                            className="btn-regular btn-blue"
                        >
                            Take me there
                        </button>
                    }
                    danger
                >
                    <div className="window__content">
                        <h1>It's okay to reach out</h1>
                        <p>
                            What you are feeling matters and you are not alone.
                            If you're going through a difficult moment, you can
                            click the button below to find resources and people
                            who are there to help.
                        </p>
                        <p>You can disable this message on Settings.</p>
                    </div>
                </Window>
            )}
        </>
    );
};

export default Dialogue;
