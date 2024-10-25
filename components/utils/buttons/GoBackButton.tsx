import { StyleSheet, TextStyle, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Href, router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface GoBackButtonProps {
    children?: React.ReactNode;
    style?: TextStyle;
    route: Href<string | object>;
}

export const GoBackButton: React.FC<GoBackButtonProps> = ({
    children,
    style = {},
    route,
}) => {
    const colorScheme = useColorScheme();

    const goBack = () => {
        router.push(route);
    };

    return (
        <Pressable onPress={goBack} style={{ ...style }}>
            {children}
            <Ionicons
                name={"arrow-back-circle-outline"}
                size={40}
                color={Colors[colorScheme ?? "light"].tint}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 8,
        alignSelf: "center",
        position: "absolute",
        bottom: 10,
        right: 10,
    },
});
