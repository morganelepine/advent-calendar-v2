import { StyleSheet, View } from "react-native";
import { GoBackButton } from "@/components/custom-utils/Buttons/GoBackButton";
import { AudioPlayer } from "@/components/content/Audio";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

interface DayHeaderProps {
    dayId: number | null;
}

export const DayHeader: React.FC<DayHeaderProps> = ({ dayId }) => {
    return (
        <View style={[styles.container]}>
            {/* <GoBackButton route={"/calendar"} /> */}

            <ThemedText style={styles.title}>
                Jour {dayId} du calendrier
            </ThemedText>

            <AudioPlayer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginTop: 20,
        alignItems: "center",
        // borderWidth: 2,
        // borderColor: "red",
    },
    title: {
        fontFamily: "PallyBold",
        paddingTop: 2,
        fontSize: 20,
        textAlign: "center",
        letterSpacing: 1,
        color: Colors.green,
    },
});
