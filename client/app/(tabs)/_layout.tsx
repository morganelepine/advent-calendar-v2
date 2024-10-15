import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false,
                tabBarStyle: {
                    // position: "absolute",
                    // display: "none",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Compte à rebours",
                    tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 9 },
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "gift" : "gift-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="calendar"
                options={{
                    title: "Calendrier",
                    tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 9 },
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "calendar" : "calendar-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="score"
                options={{
                    title: "Score",
                    tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 9 },
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={
                                focused
                                    ? "game-controller"
                                    : "game-controller-outline"
                            }
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="informations"
                options={{
                    title: "Informations",
                    tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 9 },
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "snow" : "snow-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="day"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
