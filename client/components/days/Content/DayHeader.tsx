import { StyleSheet, View } from "react-native";
import { GoBackButton } from "@/components/custom-utils/Buttons/GoBackButton";
import { AudioPlayer } from "@/components/content/Audio";
import { ThemedText } from "@/components/ThemedText";

export const DayHeader = () => {
    let options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    const today = new Date().toLocaleDateString("fr-FR", options);
    const capitalizedToday = today.charAt(0).toUpperCase() + today.slice(1);

    return (
        <View style={[styles.container]}>
            <GoBackButton route={"/calendar"} />

            <ThemedText type="subtitle">{capitalizedToday}</ThemedText>

            <AudioPlayer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 5,
        marginTop: 15,
        alignItems: "center",
    },
});
