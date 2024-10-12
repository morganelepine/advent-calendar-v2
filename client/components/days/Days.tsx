import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { DayButton } from "@/components/days/Button/DayButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Day {
    id: number;
    dayNumber: number;
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

    return (
        <View style={styles.daysContainer}>
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
        margin: 10,
        gap: 10,
    },
});
