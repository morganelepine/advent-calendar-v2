import React from "react";
import { StyleSheet, ImageBackground, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
    const today = new Date();

    let christmasDay = new Date(today.getFullYear(), 11, 25);
    // Check if Christmas has already passed
    if (today > christmasDay) {
        christmasDay.setFullYear(christmasDay.getFullYear() + 1);
    }

    const daysToChristmas = Math.ceil(
        (christmasDay.getTime() - today.getTime()) / MILLISECONDS_IN_A_DAY
    );

    // console.log({ today });
    // console.log({ christmasDay });

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
