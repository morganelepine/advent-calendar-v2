import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Home } from "@/components/calendar/Home";
import { FirstLaunchModal } from "@/components/calendar/FirstLaunchModal";

async function resetDataIfNeeded() {
    const today = new Date();
    const currentYear = today.getFullYear();

    const lastResetYear = await AsyncStorage.getItem("lastResetYear");

    if (
        (!lastResetYear && today.getMonth() === 11) ||
        lastResetYear !== currentYear.toString()
    ) {
        await AsyncStorage.multiRemove(["playMusic", "calendar", "scoresData"]);
        await AsyncStorage.setItem("lastResetYear", currentYear.toString());
    }
}

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            await resetDataIfNeeded();
            await checkFirstLaunch();
        };

        initializeApp();
    }, []);

    const checkFirstLaunch = async () => {
        const userUuid = await AsyncStorage.getItem("userUuid");
        console.log({ userUuid });

        if (!userUuid) {
            const newUserUuid: string = uuid.v4() as string;
            await AsyncStorage.setItem("userUuid", newUserUuid);
            console.log({ newUserUuid });

            setModalVisible(true);
        }

        // if (userUuid) {
        //     await AsyncStorage.multiRemove([
        //         "userUuid",
        //         "playMusic",
        //         "calendar",
        //         "scoresData",
        //     ]);
        // }
    };

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
