import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Home } from "@/components/calendar/Home";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveUser } from "../../services/user.service";
import { saveScore } from "../../services/score.service";
import { FirstLaunchModal } from "@/components/calendar/FirstLaunchModal";

export default function HomeScreen() {
    const today = new Date();
    const day = today.getDate();

    const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);
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

            await saveUser(newUserUuid, 0);
            await saveScore(newUserUuid, day, 40, "la première connexion");

            setFirstLaunch(true);
            setModalVisible(true);
        } else {
            // await AsyncStorage.removeItem("userUuid");
            setFirstLaunch(false);
        }
    };

    if (firstLaunch === null) {
        return (
            <View style={styles.activityIndicator}>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    return (
        <>
            <Home />
            <FirstLaunchModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
}

const styles = StyleSheet.create({
    activityIndicator: { justifyContent: "center", flex: 1 },
});
