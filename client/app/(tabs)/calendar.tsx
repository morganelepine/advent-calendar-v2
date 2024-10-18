import React, { useCallback, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Days } from "@/components/days/Days";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
    cloud: {
        cloudName: "deauthz29",
    },
});
interface Day {
    id: number;
    dayNumber: number;
}

export default function CalendarScreen() {
    const [days, setDays] = useState<Day[]>([]);
    const [hasShuffled, setHasShuffled] = useState<boolean>(false);

    const shuffleDays = (arr: Day[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index
            [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
        }
        return arr;
    };

    useFocusEffect(
        useCallback(() => {
            const fetchDays = async () => {
                try {
                    const response = await fetch(
                        "http://192.168.1.16:3000/days"
                    );
                    const data = await response.json();
                    if (!hasShuffled) {
                        const shuffledData = shuffleDays([...data]);
                        setDays(shuffledData);
                        setHasShuffled(true);
                    } else {
                        setDays(data);
                    }
                    // setDays(data);
                } catch (error) {
                    console.error("Error fetching days:", error);
                }
            };

            fetchDays();
        }, [])
    );

    const insets = useSafeAreaInsets();
    const backgroundImage = cld.image("sapin_sao6oe");

    return (
        <ImageBackground
            // source={{ uri: backgroundImage.toURL() }}
            source={require("@/assets/images/6.png")}
            // defaultSource={require("@/assets/images/sapin-rouge.jpg")}
            resizeMode="cover"
            style={{
                flex: 1,
            }}
        >
            <SafeAreaView
                style={{
                    flex: 1,
                    paddingBottom: insets.top,
                }}
            >
                <Days days={days} />
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({});
