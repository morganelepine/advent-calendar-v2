import { useCallback, useRef, useState } from "react";
import { StyleSheet, View, Pressable, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Href, router, useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";

type IconName =
    | "alarm-outline"
    | "gift-outline"
    | "game-controller-outline"
    | "snow-outline"
    | "sparkles-sharp";

export const MenuButton = () => {
    const animation = useRef(new Animated.Value(0)).current;
    const [open, setOpen] = useState(false);

    const rotation = () => ({
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "180deg"],
                }),
            },
        ],
    });

    const getAnimatedStyle = (translateY: number) => ({
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, translateY],
                }),
            },
        ],
    });

    const toggleMenu = useCallback(() => {
        const toValue = open ? 0 : 1;
        Animated.spring(animation, {
            toValue,
            friction: 6,
            useNativeDriver: true,
        }).start();
        setOpen(!open);
    }, [open]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                if (open) {
                    Animated.spring(animation, {
                        toValue: 0,
                        friction: 6,
                        useNativeDriver: true,
                    }).start();
                    setOpen(false);
                }
            };
        }, [open])
    );

    const onPress = (route: Href<string | object>) => {
        router.push(route);
    };

    const renderButton = (
        iconName: IconName,
        label: string,
        translateY: number,
        route: Href<string | object>
    ) => (
        <Animated.View style={[styles.secondary, getAnimatedStyle(translateY)]}>
            <Pressable onPress={() => onPress(route)} style={styles.secondary}>
                <View style={styles.buttonBackground} />
                <Ionicons name={iconName} size={24} color={Colors.blue} />
                <ThemedText style={styles.text}>{label}</ThemedText>
            </Pressable>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <View style={[styles.background]} />

            <View style={styles.bottomContainer}>
                {renderButton(
                    "gift-outline",
                    "Calendrier de l'avent",
                    80,
                    "/calendar"
                )}
                {renderButton(
                    "game-controller-outline",
                    "Scores",
                    130,
                    "/score"
                )}
                {renderButton(
                    "snow-outline",
                    "Informations",
                    180,
                    "/informations"
                )}
                {/* {renderButton("alarm-outline", "Compte à rebours", 230, "/")} */}

                <Pressable onPress={toggleMenu} style={styles.button}>
                    <View style={[styles.buttonBackground]} />
                    <Animated.View style={rotation()}>
                        <Ionicons
                            name="sparkles-sharp"
                            size={36}
                            color={Colors.blue}
                        ></Ionicons>
                    </Animated.View>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 1,
        height: "55%",
        width: "65%",
        top: 0,
        left: 0,
        // borderColor: "red",
        // borderWidth: 2,
    },
    background: {
        ...StyleSheet.absoluteFillObject, // Remplit tout l'espace du parent
        // backgroundColor: "#FBF5F3",
        borderBottomRightRadius: 50,
        opacity: 0.8,
    },
    bottomContainer: {
        top: 40,
        left: 20,
        flexDirection: "column",
        // borderColor: "red",
        // borderWidth: 2,
    },
    button: {
        position: "absolute",
        height: 60,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    secondary: {
        position: "absolute",
        height: 36,
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 8,
        paddingRight: 12,
        gap: 4,
    },
    buttonBackground: {
        ...StyleSheet.absoluteFillObject, // Remplit tout l'espace du parent
        backgroundColor: "#FBF5F3",
        borderRadius: 50,
        opacity: 0.8,
    },
    text: {
        fontSize: 12,
        color: Colors.blue,
        fontFamily: "PoppinsBold",
        paddingTop: 1,
    },
});
