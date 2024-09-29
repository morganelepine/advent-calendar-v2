import { StyleSheet, Image } from "react-native";
import { SparkleWave } from "@/components/SparkleWave";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function AdminScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
            headerImage={
                <Image
                    source={require("@/assets/images/sparkle.jpg")}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Add content</ThemedText>
                <SparkleWave />
            </ThemedView>
            <ThemedText>
                This app includes example code to help you get started.
            </ThemedText>
            <Collapsible title="Images">
                <ThemedText>
                    For static images, you can use the{" "}
                    <ThemedText type="subtitle">@2x</ThemedText> and{" "}
                    <ThemedText type="subtitle">@3x</ThemedText> suffixes to
                    provide files for different screen densities
                </ThemedText>
                <Image
                    source={require("@/assets/images/react-logo.png")}
                    style={{ alignSelf: "center" }}
                />
                <ExternalLink href="https://reactnative.dev/docs/images">
                    <ThemedText type="link">Learn more</ThemedText>
                </ExternalLink>
                <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
                    <ThemedText type="link">Learn more</ThemedText>
                </ExternalLink>
            </Collapsible>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: "100%",
        width: "100%",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
});
