import { useCallback } from "react";
import {
    StyleSheet,
    View,
    Pressable,
    TouchableWithoutFeedback,
} from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Day } from "@/interfaces/dayInterface";

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
    const openDay = () => {
        router.push({
            pathname: "/day",
            params: { dayId: day.dayNumber },
        });
    };

    const onClose = () => {
        setModalVisible(false);
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                setModalVisible(false);
            };
        }, [])
    );

    return (
        <CustomModal visible={modalVisible} onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <View style={styles.quoteContainer}>
                                <ThemedText style={styles.quotationMark}>
                                    «
                                </ThemedText>
                                <ThemedText style={styles.quote}>
                                    {day.quote}
                                </ThemedText>
                                <ThemedText style={styles.quotationMark}>
                                    »
                                </ThemedText>
                            </View>

                            {day.quoteAuthor ? (
                                <ThemedText style={styles.author}>
                                    {day.quoteAuthor}
                                </ThemedText>
                            ) : null}

                            <Pressable onPress={openDay} style={styles.button}>
                                <Ionicons
                                    name={"arrow-forward-outline"}
                                    size={25}
                                    color={Colors.snow}
                                />
                            </Pressable>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
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
        color: Colors.green,
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
        backgroundColor: Colors.green,
        marginTop: 30,
        height: 48,
        width: 48,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 14,
    },
});
