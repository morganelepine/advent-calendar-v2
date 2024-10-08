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
                    title: "Days to Christmas",
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
                    title: "Advent calendar",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "calendar" : "calendar-outline"}
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
            {/* <Tabs.Screen
                name="admin"
                options={{
                    title: "Admin",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={
                                focused
                                    ? "extension-puzzle"
                                    : "extension-puzzle-outline"
                            }
                            color={color}
                        />
                    ),
                }}
            /> */}
        </Tabs>
    );
}
