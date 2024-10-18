import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

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
                    {
                        backgroundColor: dayIsOpen ? Colors.snow : Colors.green,
                    },
                    { opacity: dayIsOpen ? 0.8 : 0.7 },
                ]}
            />
            <ThemedText
                style={[
                    styles.calendarDay,
                    { opacity: dayIsOpen ? 0.5 : 1 },
                    {
                        color: dayIsOpen ? Colors.green : Colors.snow,
                    },
                ]}
            >
                {day.dayNumber}
            </ThemedText>
        </>
    );
};

const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject, // Remplit tout l'espace du parent
        backgroundColor: "white",
        borderRadius: 50,
        borderColor: Colors.green,
        borderWidth: 1,
    },
    calendarDay: {
        fontSize: 45,
        fontFamily: "Pally",
        textAlign: "center",
        paddingBottom: 8,
    },
});
