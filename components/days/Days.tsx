import React, { useState } from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import { DayButton } from "@/components/days/Button/DayButton";
import { Colors } from "@/constants/Colors";
import { updateScores } from "@/services/score.service";
import { Day } from "@/interfaces/dayInterface";
import { ScoreType } from "@/enums/enums";

interface DaysProps {
    days: Day[];
    setDays: (days: Day[]) => void;
}

export const Days: React.FC<DaysProps> = ({ days, setDays }) => {
    const [dayModalVisible, setDayModalVisible] = useState<number | null>(null);

    const handleDayOpening = async (dayNumber: number) => {
        const todayDay = new Date().getDate();
        const todayMonth = new Date().getMonth();

        const updatedDays = days.map((day) => {
            return todayMonth === 11 &&
                day.dayNumber === dayNumber &&
                dayNumber <= todayDay &&
                !day.isOpen
                ? { ...day, isOpen: !day.isOpen }
                : day;
        });
        setDays(updatedDays);

        if (todayMonth === 11 && dayNumber <= todayDay) {
            setDayModalVisible(dayNumber);
        } else {
            ToastAndroid.show("Un peu de patience...", ToastAndroid.SHORT);
        }

        if (todayMonth === 11 && dayNumber === todayDay) {
            await updateScores(dayNumber, ScoreType.DayOpening);
        }
    };

    return (
        <View style={styles.daysContainer}>
            {days.map((day) => (
                <DayButton
                    key={day.dayNumber}
                    day={day}
                    handleDayOpening={handleDayOpening}
                    modalVisible={dayModalVisible === day.dayNumber}
                    setModalVisible={() => setDayModalVisible(null)}
                />
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
        backgroundColor: Colors.green,
        padding: 5,
    },
});
