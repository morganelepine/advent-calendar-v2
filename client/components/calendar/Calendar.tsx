import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Day } from "../days/Day";

export const Calendar = () => {
    interface Day {
        id: number;
        dayNumber: number;
        isOpen: boolean;
        openAt: Date;
    }

    const [days, setDays] = useState<Day[]>([]);

    const shuffleDays = (arr: Day[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index
            [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
        }
        return arr;
    };

    useEffect(() => {
        fetch("http://192.168.1.16:3000/days")
            .then((response) => response.json())
            .then((data) => {
                const shuffledData = shuffleDays([...data]);
                setDays(shuffledData);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <ImageBackground
                source={require("@/assets/images/annie.jpg")}
                resizeMode="cover"
                style={styles.background}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.daysContainer}>
                        {days.map((day) => (
                            <Day key={day.id} day={day} />
                        ))}
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    safeArea: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },

    daysContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 4,
        margin: 20,
    },
});
