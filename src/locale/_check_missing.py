import json
import argparse


def load_keys(json_data, parent_key=""):
    keys = []
    for key, value in json_data.items():
        if value is None:
            continue
        full_key = f"{parent_key}.{key}" if parent_key else key
        keys.append(full_key)
        if isinstance(value, dict):
            keys.extend(load_keys(value, full_key))
    return keys


def main(filename: str):
    if filename.lower().endswith(".json"):
        print("You don't need the .json extension, darling.")
        return

    en_json = "./en-US.json"
    with open(en_json, "r", encoding="utf-8") as f:
        en_data = json.load(f)

    en_keys = load_keys(en_data)

    locale = f"./{filename}.json"

    with open(locale, "r", encoding="utf-8") as f:
        locale_data = json.load(f)

    locale_keys = load_keys(locale_data)

    missing_keys = set(en_keys) - set(locale_keys) - {"character.blank"}
    if missing_keys:
        print(f"Missing keys in {locale}:")
        for key in sorted(missing_keys):
            print(f"  {key}")
    else:
        print(f"All keys are present in {locale}.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Check locale JSON file for missing.")
    parser.add_argument(
        "--filename",
        type=str,
        help="file name of the locale JSON file",
        required=True,
    )

    args = parser.parse_args()
    input_filename = args.filename
    if not input_filename:
        print("Please provide the input filename using --filename")
        exit(1)
    main(input_filename)
