import { StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { AdvancedImage } from "cloudinary-react-native";
import cld from "@/config/cloudinaryConfig";

interface DayNumberProps {
    day: {
        dayNumber: number;
        isOpen: boolean;
        background: string;
        width: string;
        height: string;
        color: string;
        textColor: string;
        image: string;
        aspectRatio: number;
        quote: string;
        quoteAuthor: string;
        quoteSource: string;
    };
    dayIsOpen: boolean | null;
}

export const DayNumber: React.FC<DayNumberProps> = ({ day, dayIsOpen }) => {
    return (
        <>
            <AdvancedImage
                cldImg={cld.image(day.image)}
                style={[
                    styles.itemBackground,
                    {
                        aspectRatio: day.aspectRatio,
                    },
                ]}
                resizeMode="contain"
            />
            <Text
                style={[
                    styles.itemText,
                    {
                        color: dayIsOpen ? Colors.blue : day.textColor,
                    },
                ]}
            >
                {day.dayNumber}
            </Text>
        </>
    );
};

const styles = StyleSheet.create({
    itemBackground: {
        width: "100%",
        height: undefined,
    },
    itemText: {
        fontSize: 30,
        fontFamily: "Pally",
        paddingVertical: 2,
        paddingHorizontal: 5,
        position: "absolute",
        top: 0,
        zIndex: 1,
    },
});
