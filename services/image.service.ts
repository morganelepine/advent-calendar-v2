import { Dimensions, Image } from "react-native";
import cld from "@/config/cloudinaryConfig";

export const formatImage = (
    day: number,
    image: string | undefined,
    maxHeight: number,
    setImageDimensions: React.Dispatch<
        React.SetStateAction<{
            [key: string]: { width: number; height: number };
        }>
    >
): void => {
    const screenWidth = Dimensions.get("window").width;

    const imageUrl = cld.image(image).toURL();

    Image.getSize(imageUrl, (width, height) => {
        const ratio = Math.min(screenWidth / width, maxHeight / height);
        const adjustedWidth = width * ratio;
        const adjustedHeight = height * ratio;

        setImageDimensions((prev) => ({
            ...prev,
            [day]: {
                width: adjustedWidth,
                height: adjustedHeight,
            },
        }));
    });
};
