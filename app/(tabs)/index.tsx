import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Home } from "@/components/calendar/Home";
import { FirstLaunchModal } from "@/components/calendar/FirstLaunchModal";

export default function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        checkFirstLaunch();
    }, []);

    const checkFirstLaunch = async () => {
        const userUuid = await AsyncStorage.getItem("userUuid");
        console.log({ userUuid });

        const playMusic = await AsyncStorage.getItem("playMusic");
        const scoresData = await AsyncStorage.getItem("scoresData");
        const calendar = await AsyncStorage.getItem("calendar");
        // console.log({ playMusic });
        // console.log({ scoresData });
        // console.log({ calendar });

        if (!userUuid) {
            const newUserUuid: string = uuid.v4() as string;
            await AsyncStorage.setItem("userUuid", newUserUuid);
            console.log({ newUserUuid });

            setModalVisible(true);
        }
        // else {
        //     AsyncStorage.removeItem("userUuid");

        //     if (playMusic) {
        //         await AsyncStorage.removeItem("playMusic");
        //     }
        //     if (scoresData) {
        //         await AsyncStorage.removeItem("scoresData");
        //     }
        //     if (calendar) {
        //         await AsyncStorage.removeItem("calendar");
        //     }
        //     // await AsyncStorage.multiRemove([
        //     //     "userUuid",
        //     //     "playMusic",
        //     //     "calendar",
        //     //     "scoresData",
        //     // ]);
        //     // await Promise.all([
        //     //     AsyncStorage.removeItem("userUuid"),
        //     //     AsyncStorage.removeItem("playMusic"),
        //     //     AsyncStorage.removeItem("scoresData"),
        //     //     AsyncStorage.removeItem("calendar"),
        //     // ]);
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
