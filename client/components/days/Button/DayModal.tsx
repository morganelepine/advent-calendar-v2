import { StyleSheet, View, Modal, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";

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

interface DayModalProps {
    day: Day;
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

export const DayModal: React.FC<DayModalProps> = ({
    day,
    modalVisible,
    setModalVisible,
}) => {
    let options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    const today = new Date().toLocaleDateString("fr-FR", options);
    const capitalizedToday = today.charAt(0).toUpperCase() + today.slice(1);

    const openDay = () => {
        router.push({
            pathname: "/day",
            params: { dayId: day.dayNumber },
        });
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                setModalVisible(false);
            };
        }, [day.dayNumber])
    );

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ThemedText style={styles.date}>
                        {capitalizedToday}
                    </ThemedText>

                    <View style={styles.quoteContainer}>
                        <ThemedText style={styles.quotationMark}>«</ThemedText>
                        <ThemedText style={styles.quote}>
                            {day.quote}
                        </ThemedText>
                        <ThemedText style={styles.quotationMark}>»</ThemedText>
                    </View>

                    {day.quoteAuthor ? (
                        <ThemedText style={styles.author}>
                            {day.quoteAuthor}
                        </ThemedText>
                    ) : null}

                    <Pressable onPress={openDay} style={styles.button}>
                        {/* <ThemedText style={styles.buttonText}>
                            ✨ Ouvrir la case du jour ✨
                        </ThemedText> */}
                        <Ionicons
                            name={"arrow-forward-outline"}
                            size={25}
                            color={Colors.snow}
                        />
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: Colors.snow,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    date: { fontFamily: "PallyBold", marginBottom: 20 },
    quoteContainer: { marginBottom: 10 },
    quotationMark: {
        fontSize: 50,
        lineHeight: 50,
    },
    quote: {
        fontSize: 20,
        fontStyle: "italic",
        marginBottom: 20,
    },
    author: {
        fontSize: 14,
        fontFamily: "AnonymousProItalic",
    },
    button: {
        borderRadius: 50,
        backgroundColor: Colors.blue,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 30,
        alignSelf: "center",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 14,
    },
});
