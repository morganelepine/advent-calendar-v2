import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Days } from "@/components/days/Days";

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

export default function CalendarScreen() {
    const [days, setDays] = useState<Day[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchDays = async () => {
                try {
                    const response = await fetch(
                        "http://192.168.1.16:3000/days"
                    );
                    const data = await response.json();
                    setDays(data);
                } catch (error) {
                    console.error("Error fetching days:", error);
                }
            };

            fetchDays();
        }, [])
    );

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <Days days={days} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
