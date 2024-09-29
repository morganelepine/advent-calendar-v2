import React from "react";
import { StyleSheet, ImageBackground, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const day = 1000 * 60 * 60 * 24;
    let today = new Date();

    let christmasDay = new Date(today.getFullYear(), 11, 25);
    // Check if Christmas if passed already
    if (today.getMonth() == 11 && today.getDate() > 25) {
        christmasDay.setFullYear(christmasDay.getFullYear() + 1);
    }

    const daysToChristmas = Math.round(
        (christmasDay.getTime() - today.getTime()) / day
    ).toFixed(0);

    return (
        <ImageBackground
            source={require("@/assets/images/sapin.jpg")}
            resizeMode="cover"
            style={styles.background}
        >
            <SafeAreaView style={styles.safeArea}>
                <Text style={[styles.text, styles.text1]}>Plus que</Text>
                <Text style={[styles.text, styles.text2]}>
                    {daysToChristmas} nuits
                </Text>
                <Text style={styles.text}>avant Noël</Text>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },

    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },

    text: {
        color: "white",
        fontSize: 50,
        fontFamily: "SpecialElite",
    },

    text1: {
        letterSpacing: 8,
    },

    text2: {
        letterSpacing: 9,
    },
});
