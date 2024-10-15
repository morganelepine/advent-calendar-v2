/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const red = "#b52936";
const green = "#165d4b"; // #22311d
const snow = "#f7f5f6";
const paleRed = "#b52936";
const paleGreen = "#9EC5AB";
const gold = "#d6ae72";
const paleGold = "#eee6d9";

const tintColorLight = green;
const tintColorDark = paleGold;

export const Colors = {
    light: {
        text: "#11181C",
        background: "#f7f5f6",
        tint: tintColorLight,
        icon: "#687076",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight,
    },
    dark: {
        text: "#ECEDEE",
        background: "#151718",
        tint: tintColorDark,
        icon: "#eee6d9",
        tabIconDefault: "#eee6d9",
        tabIconSelected: tintColorDark,
    },
};
