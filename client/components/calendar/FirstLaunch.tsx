import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";

export const FirstLaunch = () => {
    const today = "Bienvenue !";

    return (
        <ImageBackground
            source={require("@/assets/images/sapin.jpg")}
            resizeMode="cover"
            style={styles.background}
        >
            <SafeAreaView style={styles.safeArea}>
                <ThemedText type="homeTitle">{today}</ThemedText>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
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
    text1: {
        letterSpacing: 8,
    },
    text2: {
        letterSpacing: 9,
    },
});
