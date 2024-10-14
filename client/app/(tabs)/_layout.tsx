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
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Compte à rebours",
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
                    title: "Calendrier de l'avent",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "calendar" : "calendar-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="rules"
                options={{
                    title: "Règles du jeu",
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
            {/* <Tabs.Screen
                name="day"
                options={{
                    href: null,
                }}
            /> */}
        </Tabs>
    );
}
