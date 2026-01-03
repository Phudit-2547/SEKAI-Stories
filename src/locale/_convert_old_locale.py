import json
import os
import argparse


def safe_get(data, keys):
    current = data
    for key in keys:
        if isinstance(current, dict):
            current = current.get(key)
        else:
            return None

    return current


def transform_json(source):
    target = {
        "global": {
            "toggles": safe_get(source, ["text", "toggles"]),
            "close": safe_get(source, ["close"]),
            "clear-ok": safe_get(source, ["clear-ok"]),
            "copy": safe_get(source, ["model", "copy"]),
            "continue-ok": safe_get(source, ["continue-ok"]),
            "cancel": safe_get(source, ["cancel"]),
            "next": safe_get(source, ["next"]),
            "input": safe_get(source, ["input"]),
            "adjust": safe_get(source, ["adjust"]),
            "enter-value": safe_get(source, ["enter-value"]),
            "visible": safe_get(source, ["visible"]),
            "import": safe_get(source, ["import-export", "import"]),
            "export": safe_get(source, ["import-export", "export"]),
        },
        "background": {
            "header": safe_get(source, ["background", "header"]),
            "select": {
                "header": safe_get(source, ["background", "select"]),
                "button": "Select",
                "split-location": safe_get(source, ["background", "split-location"]),
                "upload": safe_get(source, ["background", "upload"]),
                "upload-info": safe_get(source, ["background", "upload-info"]),
            },
            "lighting": {
                "header": safe_get(source, ["background", "lighting"]),
                "preset": safe_get(source, ["background", "preset"]),
                "red": safe_get(source, ["background", "red"]),
                "green": safe_get(source, ["background", "green"]),
                "blue": safe_get(source, ["background", "blue"]),
                "brightness": safe_get(source, ["background", "brightness"]),
                "saturation": safe_get(source, ["background", "saturation"]),
                "presets": {
                    "select-preset": safe_get(source, ["background", "select-preset"]),
                    "default": safe_get(source, ["background", "default"]),
                    "warm": safe_get(source, ["background", "warm"]),
                    "night": safe_get(source, ["background", "night"]),
                    "off": safe_get(source, ["background", "off"]),
                    "bright": safe_get(source, ["background", "bright"]),
                    "silhoutte": safe_get(source, ["background", "silhoutte"]),
                    "custom-preset": safe_get(source, ["background", "custom-preset"]),
                },
            },
            "filters": {
                "header": safe_get(source, ["background", "filters"]),
                "flashback": safe_get(source, ["background", "flashback"]),
                "sick": safe_get(source, ["background", "sick"]),
                "drooping-lines": safe_get(source, ["background", "drooping-lines"]),
                "pov": safe_get(source, ["background", "pov"]),
                "pov-settings": {
                    "zoom": safe_get(source, ["background", "zoom"]),
                    "povx": safe_get(source, ["background", "povx"]),
                    "povy": safe_get(source, ["background", "povy"]),
                },
            },
        },
        "text": {
            "header": safe_get(source, ["text", "header"]),
            "name-tag": {
                "header": safe_get(source, ["text", "name-tag"]),
                "easy-switch": safe_get(source, ["text", "easy-switch"]),
            },
            "dialogue": {
                "header": safe_get(source, ["text", "dialogue"]),
                "font-size": safe_get(source, ["text", "font-size"]),
                "enter-font-size": safe_get(source, ["text", "enter-font-size"]),
                "add-symbol": safe_get(source, ["text", "add-symbol"]),
            },
            "scene-text": {
                "header": safe_get(source, ["text", "scene-text"]),
                "variant": {
                    "header": safe_get(source, ["text", "scene-text-variant"]),
                    "middle": safe_get(source, ["text", "scene-text-middle"]),
                    "top-left": safe_get(source, ["text", "scene-text-top-left"]),
                },
                "hide-everything": safe_get(source, ["text", "hide-everything"]),
            },
            "y-offset": {
                "header": safe_get(source, ["text", "y-offset"]),
                "details": safe_get(source, ["text", "y-offset-details"]),
            },
            "toggles": safe_get(source, ["text", "toggles"]),
        },
        "model": {
            "header": safe_get(source, ["model", "header"]),
            "selected-layer": {
                "header": safe_get(source, ["model", "selected-layer"]),
                "layer": safe_get(source, ["model", "layer"]),
                "add-model": {
                    "header": safe_get(source, ["model", "add-model-header"]),
                    "description": safe_get(source, ["model", "add-model-description"]),
                    "sekai": safe_get(source, ["model", "add-model-sekai"]),
                    "sekai-description": safe_get(
                        source, ["model", "add-model-sekai-description"]
                    ),
                    "static": safe_get(source, ["model", "add-model-static"]),
                    "static-description": safe_get(
                        source, ["model", "add-model-static-description"]
                    ),
                    "upload-image": safe_get(source, ["model", "upload-image"]),
                    "upload-image-description": safe_get(
                        source, ["model", "upload-image-description"]
                    ),
                },
                "delete-model-warn": safe_get(source, ["model", "delete-model-warn"]),
            },
            "character": {
                "header": safe_get(source, ["model", "character"]),
                "select-character": safe_get(source, ["model", "select-character"]),
            },
            "costume": {
                "header": safe_get(source, ["model", "costume"]),
                "live2d-issue": safe_get(source, ["model", "live2d-issue"]),
                "live2d-issue-github": safe_get(
                    source, ["model", "live2d-issue-github"]
                ),
                "virtual": safe_get(source, ["model", "virtual"]),
            },
            "emotion": {
                "header": safe_get(source, ["model", "emotion"]),
                "rename-emotion": safe_get(source, ["model", "rename-emotion"]),
                "pose": safe_get(source, ["model", "pose"]),
                "select-pose": safe_get(source, ["model", "select-pose"]),
                "expression": safe_get(source, ["model", "expression"]),
                "select-expression": safe_get(source, ["model", "select-expression"]),
            },
            "transform": {
                "header": safe_get(source, ["model", "transform"]),
                "x-position": safe_get(source, ["model", "x-position"]),
                "y-position": safe_get(source, ["model", "y-position"]),
                "scale": safe_get(source, ["model", "scale"]),
                "rotation": safe_get(source, ["model", "rotation"]),
                "blur": safe_get(source, ["model", "blur"]),
                "layering": safe_get(source, ["model", "layering"]),
            },
            "mouth": {
                "header": safe_get(source, ["model", "mouth"]),
                "ParamMouthForm": safe_get(source, ["model", "ParamMouthForm"]),
                "ParamMouthOpenY": safe_get(source, ["model", "ParamMouthOpenY"]),
                "ParamMouthForm2": safe_get(source, ["model", "ParamMouthForm2"]),
                "ParamMouthScaleX": safe_get(source, ["model", "ParamMouthScaleX"]),
                "ParamMouthScaleY": safe_get(source, ["model", "ParamMouthScaleY"]),
                "ParamMouthPositionY": safe_get(
                    source, ["model", "ParamMouthPositionY"]
                ),
                "ParamMouthShadow": safe_get(source, ["model", "ParamMouthShadow"]),
            },
            "live2d": {
                "header": safe_get(source, ["model", "live2d"]),
                "parameters": {
                    "header": safe_get(source, ["model", "parameters"]),
                    "select-parameter": safe_get(source, ["model", "select-parameter"]),
                    "tooltip": safe_get(source, ["model", "live2d-tooltip"]),
                },
                "idle": safe_get(source, ["model", "idle"]),
                "import-export": {
                    "header": safe_get(source, ["model", "import-export"]),
                    "description": safe_get(
                        source, ["model", "live2d-import-export-description"]
                    ),
                },
                "emotion-copy": {
                    "header": safe_get(source, ["model", "emotion-copy"]),
                    "description": safe_get(
                        source, ["model", "emotion-copy-description"]
                    ),
                    "confirm-header": safe_get(
                        source, ["model", "emotion-copy-confirm-header"]
                    ),
                    "confirm-description": safe_get(
                        source, ["model", "emotion-copy-confirm-description"]
                    ),
                },
                "show-live2d-parts": safe_get(source, ["model", "show-live2d-parts"]),
                "access-live2d-parts": safe_get(
                    source, ["model", "access-live2d-parts"]
                ),
            },
            "live2d-changed-warn": safe_get(source, ["model", "live2d-changed-warn"]),
            "long-wait": safe_get(source, ["model", "long-wait"]),
            "re-apply": safe_get(source, ["model", "re-apply"]),
            "advanced": safe_get(source, ["model", "advanced"]),
        },
        "experimental": source.get("experimental", {}),
        "clear": {
            "message": safe_get(source, ["clear"]),
            "start-blank": safe_get(source, ["start-blank"]),
        },
        "support": source.get("support", {}),
        "loadings": {
            "please-wait": safe_get(source, ["please-wait"]),
            "loading-1": safe_get(source, ["loading-1"]),
            "loading-2": safe_get(source, ["loading-2"]),
            "loading-3": safe_get(source, ["loading-3"]),
            "loading-4": safe_get(source, ["loading-4"]),
            "loading-5": safe_get(source, ["loading-5"]),
            "loading-6": safe_get(source, ["loading-6"]),
            "loading-7": safe_get(source, ["loading-7"]),
            "failed-load": safe_get(source, ["failed-load"]),
        },
        "character": source.get("character", {}),
        "group": source.get("group", {}),
        "settings": source.get("settings", {}),
        "import-export": {
            "header": safe_get(source, ["import-export", "header"]),
            "description": safe_get(source, ["import-export", "description"]),
        },
        "save": source.get("save", {}),
        "error": source.get("error", {}),
        "mental-health": source.get("mental-health", {}),
        "tutorial": source.get("tutorial", {}),
    }

    return target


def main(filename: str):
    if filename.lower().endswith(".json"):
        print("You don't need the .json extension, darling.")
        return

    input_filename = f"{filename}.json"
    output_filename = f"{filename}_new.json"

    if not os.path.exists(input_filename):
        print(f"Error: {input_filename} not found.")
        return

    try:
        with open(input_filename, "r", encoding="utf-8") as f:
            source_data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return

    print("Transforming data...")
    new_data = transform_json(source_data)

    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(new_data, f, indent=4, ensure_ascii=False)

    print(f"Success! Converted file saved as {output_filename}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Convert old locale JSON to new format."
    )
    parser.add_argument(
        "--filename",
        type=str,
        help="file name of the old locale JSON file",
        required=True,
    )

    args = parser.parse_args()
    input_filename = args.filename
    if not input_filename:
        print("Please provide the input filename using --filename")
        exit(1)
    main(input_filename)
