import React, { useState } from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import { DayButton } from "@/components/days/Button/DayButton";
import { Colors } from "@/constants/Colors";
import { updateScores } from "../../services/score.service";

interface Day {
    dayNumber: number;
    isOpen: boolean;
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
    setDays: (days: Day[]) => void;
}

export const Days: React.FC<DaysProps> = ({ days, setDays }) => {
    const [dayModalVisible, setDayModalVisible] = useState<number | null>(null);

    const handleDayOpening = async (dayNumber: number) => {
        const today = new Date().getDate();

        const updatedDays = days.map((day) => {
            return day.dayNumber === dayNumber &&
                (dayNumber === 1 || dayNumber === 2 || dayNumber <= today) &&
                !day.isOpen
                ? { ...day, isOpen: !day.isOpen }
                : day;
        });
        setDays(updatedDays);

        if (dayNumber === 1 || dayNumber === 2 || dayNumber <= today) {
            setDayModalVisible(dayNumber);
        } else {
            ToastAndroid.show("Un peu de patience...", ToastAndroid.SHORT);
        }

        if (dayNumber === today) {
            await updateScores(dayNumber, 25, "dayOpening");
        }
    };

    return (
        <View style={[styles.daysContainer]}>
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
