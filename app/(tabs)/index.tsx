import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Home } from "@/components/calendar/Home";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadScores, updateScores } from "../../services/score.service";
import { FirstLaunchModal } from "@/components/calendar/FirstLaunchModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Score {
    dayNumber: number;
    scoreTotal: number;
    scoreDetails: [
        { firstLogin: number },
        { dayOpening: number },
        { contentOpening: number },
        { gameCorrectAnswer: number }
    ];
}

export default function HomeScreen() {
    const today = new Date();
    const day = today.getDate();

    const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [scoreHistory, setScoreHistory] = useState<Score[]>([]);

    useEffect(() => {
        const getScores = async () => {
            const scores = await loadScores();
            setScoreHistory(scores);
        };
        getScores();
        checkFirstLaunch();
    }, []);

    const checkFirstLaunch = async () => {
        const userUuid = await AsyncStorage.getItem("userUuid");
        console.log({ userUuid });

        if (!userUuid) {
            const newUserUuid: string = uuid.v4() as string;
            await AsyncStorage.setItem("userUuid", newUserUuid);
            console.log({ newUserUuid });

            await updateScores(day, 40, "firstLogin");

            setFirstLaunch(true);
            setModalVisible(true);
        } else {
            // await AsyncStorage.multiRemove([
            //     "userUuid",
            //     "calendar",
            //     "scoresData",
            // ]);
            setFirstLaunch(false);
        }
    };

    const insets = useSafeAreaInsets();

    if (firstLaunch === null) {
        return (
            <View style={styles.activityIndicator}>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    return (
        <>
            <Home insets={insets} />
            <FirstLaunchModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                insets={insets}
            />
        </>
    );
}

const styles = StyleSheet.create({
    activityIndicator: { justifyContent: "center", flex: 1 },
});