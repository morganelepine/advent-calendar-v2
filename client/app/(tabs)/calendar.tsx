import React, { useCallback, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Days } from "@/components/days/Days";

interface Day {
    id: number;
    dayNumber: number;
}

export default function CalendarScreen() {
    const [days, setDays] = useState<Day[]>([]);
    const [hasShuffled, setHasShuffled] = useState<boolean>(false);

    const shuffleDays = (arr: Day[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index
            [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
        }
        return arr;
    };

    useFocusEffect(
        useCallback(() => {
            const fetchDays = async () => {
                try {
                    const response = await fetch(
                        "http://192.168.1.16:3000/days"
                    );
                    const data = await response.json();
                    if (!hasShuffled) {
                        const shuffledData = shuffleDays([...data]);
                        setDays(shuffledData);
                        setHasShuffled(true);
                    } else {
                        setDays(data);
                    }
                    // setDays(data);
                } catch (error) {
                    console.error("Error fetching days:", error);
                }
            };

            fetchDays();
        }, [])
    );

    return (
        <ImageBackground
            source={require("@/assets/images/annie.jpg")}
            resizeMode="cover"
            style={styles.background}
        >
            <SafeAreaView style={styles.safeArea}>
                <Days days={days} />
            </SafeAreaView>
        </ImageBackground>
    );
}

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
        paddingBottom: 20,
        // borderColor: "red",
        // borderWidth: 2,
    },
});
