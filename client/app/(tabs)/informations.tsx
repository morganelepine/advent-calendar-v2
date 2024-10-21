import { StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FirstLaunch } from "@/components/calendar/FirstLaunch";
import { ThemedText } from "@/components/ThemedText";

export default function InformationsScreen() {
    return (
        <ImageBackground
            source={require("@/assets/images/1.png")}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <SafeAreaView style={styles.safeArea}>
                <ThemedText type="modalTitle" style={styles.title}>
                    Présentation du&nbsp;calendrier
                </ThemedText>
                <FirstLaunch />
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    safeArea: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    title: {
        paddingTop: 30,
        paddingHorizontal: 20,
    },
});
