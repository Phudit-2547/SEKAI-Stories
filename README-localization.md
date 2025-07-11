# Contributing for Localization

## Simple
If you wish to contribute but do not know how to code or use GitHub, you can download the [`en-US.json`](./src/locale/en-US.json) file, translate it into your desired language, and send it to me via Discord (@lezzthanthree).

## Advanced
To contribute to the localization of the project, please follow these steps:
1. Fork the repository and clone it to your local machine.
2. Translate the [`en-US.json`](./src/locale/en-US.json) file into your desired language. This is located at [`src/locale`](./src/locale) folder. Save this file with the appropriate locale code (eg: `ja-JP.json`).
3. At [`src/utils/i18ninit.tsx`](./src/utils/i18ninit.tsx), import the locale file. For example, if you are adding Japanese, you would add the following line:
   ```ts
   import ja from '../locale/ja-JP.json';
   ```
4. On the same file, add the locale to the `resources` object.
   ```ts
    resources: {
         en: { translation: en },
         ja: { translation: ja },
    },
    ```
5. Also on the same file, add the language name to the `languageNames` array:
    ```ts
    export const languageNames = {
        en: "English",
        ja: "日本語",
        es: "Español",
        ...
    };
    ```
6. Open a pull request with your changes. 

#### Optional
For creativity, you can translate the flavor texts or add your own at [`src/components/FlavorText.tsx`](./src/components/FlavorText.tsx). **Make sure not to add any offensive or inappropriate texts**.

## List of languages translated
| Language   | Locale Code | Translator/s  | Status           |
|------------|-------------|---------------|------------------|
| Polish     | pl-PL       | counter185    | Some are missing |
| Spanish    | es-ES       | GatoMago      | Complete         |
| S. Chinese | zh-CN       | MiddleRed     | Some are missing |
| Filipino   | tl-PH       | lezzthanthree | Complete         | 

## About fonts
Currently, the project uses Noto Sans via Google Fonts.

If the font is not supported in the language, I'll be adding an additional font that would fit the language and aesthetic of the project.