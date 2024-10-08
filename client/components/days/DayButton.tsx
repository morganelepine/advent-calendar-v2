import { StyleSheet, Pressable, ToastAndroid, View } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

interface DayButtonProps {
    day: { id: number; dayNumber: number; isOpen: boolean };
}

export const DayButton: React.FC<DayButtonProps> = ({ day }) => {
    const handleDayPress = async () => {
        const today = new Date();
        if (day.isOpen) {
            router.push({
                pathname: "/Days",
                params: { dayId: day.id },
            });
        } else if (day.dayNumber > today.getDate()) {
            try {
                await fetch(`http://192.168.1.16:3000/days/${day.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ isOpen: true, openAt: today }),
                });
            } catch (error) {
                console.error("Error updating day:", error);
            }

            router.push({
                pathname: "/Days",
                params: { dayId: day.id },
            });
        } else {
            ToastAndroid.show("Un peu de patience...", ToastAndroid.SHORT);
        }
    };

    return (
        <Pressable onPress={handleDayPress} style={styles.container}>
            <View
                style={[
                    styles.background,
                    { backgroundColor: day.isOpen ? "black" : "white" },
                ]}
            />
            <ThemedText type="calendarDay">{day.dayNumber}</ThemedText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "30%",
        // height: 68,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        ...StyleSheet.absoluteFillObject, // Remplit tout l'espace du parent
        backgroundColor: "white",
        opacity: 0.15,
        borderRadius: 5,
    },
});
