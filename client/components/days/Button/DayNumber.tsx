import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "cloudinary-react-native";

const cld = new Cloudinary({
    cloud: {
        cloudName: "deauthz29",
    },
});

interface DayNumberProps {
    day: {
        id: number;
        dayNumber: number;
        background: string;
        width: string;
        height: string;
        color: string;
        textColor: string;
        aspectRatio: number;
        image: string;
    };
    dayIsOpen: boolean | null;
}

export const DayNumber: React.FC<DayNumberProps> = ({ day, dayIsOpen }) => {
    // const version = new Date().getTime(); // Génère un timestamp unique
    // const imageUrl = cld.image(day.image).setVersion(version);
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
