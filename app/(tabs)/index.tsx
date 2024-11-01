import React, { useEffect, useState } from "react";
import { Home } from "@/components/calendar/Home";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateScores } from "@/services/score.service";
import { FirstLaunchModal } from "@/components/calendar/FirstLaunchModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScoreType } from "@/enums/enums";

export default function HomeScreen() {
    const today = new Date();
    const day = today.getDate();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        checkFirstLaunch();
    }, []);

    const checkFirstLaunch = async () => {
        const userUuid = await AsyncStorage.getItem("userUuid");
        console.log({ userUuid });

        if (!userUuid) {
            const newUserUuid: string = uuid.v4() as string;
            await AsyncStorage.setItem("userUuid", newUserUuid);
            console.log({ newUserUuid });

            const connexionDay = day > 24 ? 1 : day;
            await updateScores(connexionDay, ScoreType.FirstLogin);

            setModalVisible(true);
        }
        // else {
        //     await AsyncStorage.multiRemove([
        //         "userUuid",
        //         "playMusic",
        //         "calendar",
        //         "scoresData",
        //     ]);
        // }
    };

    const insets = useSafeAreaInsets();

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
