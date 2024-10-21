import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { DayButton } from "@/components/days/Button/DayButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

interface Day {
    id: number;
    dayNumber: number;
    background: string;
    width: string;
    height: string;
    color: string;
    textColor: string;
    image: string;
    aspectRatio: number;
    quote: string;
    quoteAuthor: string;
    quoteSource: string;
}

interface DaysProps {
    days: Day[];
}

export const Days: React.FC<DaysProps> = ({ days }) => {
    const [userUuid, setUserUuid] = useState<string>("");
    useEffect(() => {
        const getUserUuid = async () => {
            const uuid = await AsyncStorage.getItem("userUuid");
            if (uuid) {
                setUserUuid(uuid);
            }
        };
        getUserUuid();
    }, []);

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.daysContainer]}>
            {days.map((day) => (
                <DayButton key={day.id} day={day} userUuid={userUuid} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    daysContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-between",
        // gap: 4,
        backgroundColor: Colors.green,
        padding: 5,
    },
});
