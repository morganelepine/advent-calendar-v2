import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface DayNumberProps {
    day: { id: number; dayNumber: number };
    dayIsOpen: boolean | null;
}

export const DayNumber: React.FC<DayNumberProps> = ({ day, dayIsOpen }) => {
    return (
        <>
            <View
                style={[
                    styles.background,
                    { backgroundColor: dayIsOpen ? "black" : "white" },
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
        opacity: 0.2,
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 1.2,
    },
});
