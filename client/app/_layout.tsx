import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpecialElite: require("../assets/fonts/SpecialElite-Regular.ttf"),
        AnonymousPro: require("../assets/fonts/Anonymous/AnonymousPro-Regular.ttf"),
        AnonymousProBold: require("../assets/fonts/Anonymous/AnonymousPro-Bold.ttf"),
        AnonymousProItalic: require("../assets/fonts/Anonymous/AnonymousPro-Italic.ttf"),
        AnonymousProBoldItalic: require("../assets/fonts/Anonymous/AnonymousPro-BoldItalic.ttf"),
        Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
        PoppinsBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
        PoppinsItalic: require("../assets/fonts/Poppins/Poppins-Italic.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <Stack
                screenOptions={{
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontFamily: "AnonymousPro",
                    },
                    headerBackTitleVisible: false,
                }}
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen
                    name="Days"
                    options={{
                        title: "Retour au calendrier",
                        headerShown: false,
                        headerTitle: (props) => (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                }}
                            >
                                <ThemedText type="headerTab">
                                    {props.children}
                                </ThemedText>
                            </View>
                        ),
                    }}
                />
            </Stack>
        </ThemeProvider>
    );
}
