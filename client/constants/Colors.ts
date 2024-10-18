/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const snow = "#f7f5f6";
const paleGold = "#eee6d9";

const tintColorLight = "#165d4b";
const tintColorDark = paleGold;

export const Colors = {
    red: "#b52936",
    darkGreen: "#09261f",
    green: "#165d4b",
    snow: "#f7f5f6",
    paleRed: "#b52936",
    paleGreen: "#8db9bc",
    gold: "#d6ae72",
    paleGold: "#eee6d9",
    light: {
        text: "#11181C",
        background: snow,
        tint: tintColorLight,
        icon: "#687076",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight,
    },
    dark: {
        text: "#ECEDEE",
        background: "black",
        tint: tintColorDark,
        icon: paleGold,
        tabIconDefault: paleGold,
        tabIconSelected: tintColorDark,
    },
};
