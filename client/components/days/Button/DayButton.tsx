import { useCallback, useState } from "react";
import { StyleSheet, Pressable, ToastAndroid } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { DayNumber } from "@/components/days/Button/DayNumber";
import { saveScore } from "@/services/score.service";
import { isDayOpen, addDayOpening } from "@/services/day.service";

interface DayButtonProps {
    day: { id: number; dayNumber: number };
    userUuid: string;
}

export const DayButton: React.FC<DayButtonProps> = ({ day, userUuid }) => {
    /*****************************************/
    /********** HANDLE DAY STATE **********/
    /*****************************************/

    const [dayIsOpen, setDayIsOpen] = useState<boolean | null>(null);

    useFocusEffect(
        useCallback(() => {
            const checkIfDayIsOpen = async () => {
                const openState = await isDayOpen(userUuid, day.id);
                setDayIsOpen(openState);
            };

            checkIfDayIsOpen();
        }, [userUuid, day.id])
    );

    /*****************************************/
    /********** HANDLE DAY CLICK **********/
    /*****************************************/

    const openDay = () => {
        router.push({
            pathname: "/day",
            params: { dayId: day.id },
        });
    };

    const handleDayPress = async () => {
        const today = new Date();

        if (dayIsOpen) {
            openDay();
        } else if (day.dayNumber <= today.getDate()) {
            await addDayOpening(userUuid, day.id);
            if (day.dayNumber === today.getDate()) {
                await saveScore(
                    userUuid,
                    day.id,
                    25,
                    "l'ouverture de la case du jour"
                );
            }
            openDay();
        } else {
            ToastAndroid.show("Un peu de patience...", ToastAndroid.SHORT);
        }
    };

    return (
        <Pressable onPress={handleDayPress} style={styles.container}>
            <DayNumber day={day} dayIsOpen={dayIsOpen} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "31%",
        justifyContent: "center",
    },
});
