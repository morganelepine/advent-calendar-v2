import { useEffect, useState } from "react";
import { StyleSheet, Pressable, ToastAndroid } from "react-native";
import { router } from "expo-router";
import { DayNumber } from "@/components/days/Button/DayNumber";

interface DayButtonProps {
    day: { id: number; dayNumber: number };
    userUuid: string;
}

export const DayButton: React.FC<DayButtonProps> = ({ day, userUuid }) => {
    /*****************************************/
    /********** HANDLE DAY STATE **********/
    /*****************************************/

    const [dayIsOpen, setDayIsOpen] = useState<boolean | null>(null);

    const isDayOpen = async (userUuid: string, day: number) => {
        try {
            const response = await fetch(
                `http://192.168.1.16:3000/days-opened/${userUuid}/${day}`
            );
            if (!response.ok) {
                throw new Error("Failed to check if the day is open");
            }
            const data = await response.json();
            // setDayIsOpen(data.isOpen);
            return data;
        } catch (error) {
            console.log("Error checking if day is open: ", error);
            return false;
        }
    };

    useEffect(() => {
        const checkIfDayIsOpen = async () => {
            const openState = await isDayOpen(userUuid, day.id);
            setDayIsOpen(openState);
        };

        checkIfDayIsOpen();
    }, [userUuid, day.id]);

    /*****************************************/
    /********** HANDLE DAY CLICK **********/
    /*****************************************/

    const handleDayPress = async () => {
        const today = new Date();

        if (dayIsOpen) {
            openDay();
        }

        if (day.dayNumber <= today.getDate()) {
            await addDayOpening();
            // await updateScore();
            openDay();
        } else {
            ToastAndroid.show("Un peu de patience...", ToastAndroid.SHORT);
        }
    };

    const openDay = () => {
        router.push({
            pathname: "/Days",
            params: { dayId: day.id },
        });
    };

    const addDayOpening = async () => {
        try {
            const response = await fetch(
                "http://192.168.1.16:3000/days-opened",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userUuid: userUuid, dayId: day.id }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to add day's opening");
            }
        } catch (error) {
            console.log("Error adding day opening: ", error);
        }
    };

    const updateScore = async () => {
        try {
            const response = await fetch(
                `http://192.168.1.16:3000/users/${userUuid}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ score: 20 }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to update user's score");
            }
        } catch (error) {
            console.log("Error updating user's score: ", error);
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
        width: "30%",
        justifyContent: "center",
        // paddingVertical: 25,
    },
});
