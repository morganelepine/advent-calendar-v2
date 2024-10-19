import { Tabs } from "expo-router";
import React from "react";
import { TabBar } from "@/components/navigation/TabBar";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            // tabBar={(props) => <TabBar {...props} />}
            screenOptions={{
                // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                tabBarActiveTintColor: Colors.blue,
                headerShown: false,
                tabBarStyle: {
                    // display: "none",
                    backgroundColor: Colors.snow,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Décompte",
                    tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 10 },
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "sparkles" : "sparkles-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="calendar"
                options={{
                    title: "Calendrier",
                    tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 10 },
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
                    tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 10 },
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
                    title: "Infos",
                    tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 10 },
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
                    title: "Jour",
                }}
            />
        </Tabs>
    );
}
