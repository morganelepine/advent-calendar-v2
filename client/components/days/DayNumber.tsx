import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface DayProps {
    day: { dayNumber: number; isOpen: boolean };
}

export const DayNumber: React.FC<DayProps> = ({ day }) => {
    return (
        <>
            <View
                style={[
                    styles.background,
                    { backgroundColor: day.isOpen ? "black" : "white" },
                ]}
            />
            <ThemedText type="calendarDay">{day.dayNumber}</ThemedText>
        </>
    );
};

const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject, // Remplit tout l'espace du parent
        backgroundColor: "white",
        opacity: 0.15,
        borderRadius: 5,
        borderColor: "white",
        borderWidth: 2,
    },
});
