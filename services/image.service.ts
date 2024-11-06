import { Dimensions, Image } from "react-native";
import { Content } from "@/interfaces/contentInterface";

export const getImageDimensions = (
    idea: Content,
    maxHeight: number
): {
    [key: string]: { width: number; height: number };
} => {
    const screenWidth = Dimensions.get("window").width;

    const imageSource = idea.image
        ? idea.image
        : require("@/assets/images/splash.png");

    const { width, height } = Image.resolveAssetSource(imageSource);

    const ratio = Math.min(screenWidth / width, maxHeight / height);
    const adjustedWidth = width * ratio;
    const adjustedHeight = height * ratio;

    const imageDimensions = {
        [idea.dayNumber]: {
            width: adjustedWidth,
            height: adjustedHeight,
        },
    };

    return imageDimensions;
};
