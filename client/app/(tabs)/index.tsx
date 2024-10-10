import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Home } from "@/components/calendar/Home";
import { FirstLaunch } from "@/components/calendar/FirstLaunch";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
    const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);

    useEffect(() => {
        checkFirstLaunch();
    }, []);

    const checkFirstLaunch = async () => {
        try {
            const userUuid = await AsyncStorage.getItem("userUuid");

            if (!userUuid) {
                const newUserUuid: string = uuid.v4() as string;
                try {
                    await AsyncStorage.setItem("userUuid", newUserUuid);
                    const response = await fetch(
                        "http://192.168.1.16:3000/users",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                uuid: newUserUuid,
                                score: 0,
                            }),
                        }
                    );
                    if (!response.ok) {
                        throw new Error("Failed to create user");
                    }
                    setFirstLaunch(true);
                } catch (error) {
                    console.error("Error saving uuid: ", error);
                }
            } else {
                // await AsyncStorage.removeItem("userUuid");
                setFirstLaunch(false);
            }
        } catch (error) {
            console.error("Error checking first launch: ", error);
        }
    };

    if (firstLaunch === null) {
        return <ActivityIndicator size="large" color="white" />;
    }

    return <>{firstLaunch ? <FirstLaunch /> : <Home />}</>;
}

const styles = StyleSheet.create({});
