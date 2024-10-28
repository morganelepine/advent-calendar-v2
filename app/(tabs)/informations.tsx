import { StyleSheet, Image } from "react-native";
import ParallaxScrollView from "@/components/utils/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { FirstLaunch } from "@/components/calendar/FirstLaunch";
import { Colors } from "@/constants/Colors";

export default function InformationsScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{
                light: Colors.snow,
                dark: Colors.darkBlue,
            }}
            headerImage={
                <Image
                    source={require("@/assets/images/christmas.jpg")}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
            }
        >
            <ThemedText type="modalTitle">
                Présentation du&nbsp;calendrier
            </ThemedText>
            <FirstLaunch />
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: "100%",
        width: "100%",
    },
});
