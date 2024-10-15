import { StyleSheet, View } from "react-native";
import { GoBackButton } from "@/components/custom-utils/Buttons/GoBackButton";
import { AudioPlayer } from "@/components/content/Audio";
import { ThemedText } from "@/components/ThemedText";

interface DayHeaderProps {
    dayId: number | null;
}

export const DayHeader: React.FC<DayHeaderProps> = ({ dayId }) => {
    return (
        <View style={[styles.container]}>
            {/* <GoBackButton route={"/calendar"} /> */}

            <ThemedText type="subtitle">Jour {dayId} du calendrier</ThemedText>

            <AudioPlayer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginTop: 15,
        alignItems: "center",
    },
});
