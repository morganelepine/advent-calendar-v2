import { StyleSheet, Pressable, View, ImageBackground } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface ContentButtonProps {
    content: {
        id: number;
        type: "quote" | "recipe" | "anecdote" | "idea" | "game";
        title: string;
        content1: string;
        content2: string;
        content3: string;
        content4: string;
    };
    setModalVisible: (visible: boolean) => void;
}

export const ContentButton: React.FC<ContentButtonProps> = ({
    content,
    setModalVisible,
}) => {
    const imageMap: { [key: string]: any } = {
        quote: require("@/assets/images/pomme-de-pin.jpg"),
        recipe: require("@/assets/images/libby-penner-jnkmQ1cEm7Q-unsplash.jpg"),
        anecdote: require("@/assets/images/annie-spratt-UPZ3PpDzk2Y-unsplash.jpg"),
        idea: require("@/assets/images/katie-azi-AHIS5FUW0gk-unsplash.jpg"),
        game: require("@/assets/images/amy-chen-0JSwEitKjOw-unsplash.jpg"),
        default: require("@/assets/images/sapin-dore.jpg"),
    };

    const image = imageMap[content.type] || imageMap.default;

    const title = (() => {
        switch (content.type) {
            case "quote":
                return "S'inspirer";
            case "recipe":
                return "Se régaler";
            case "anecdote":
                return "S'instuire";
            case "idea":
                return "Se divertir";
            case "game":
                return "S'amuser";
            default:
                return "Contenu du jour";
        }
    })();

    const colors = ["#95192E", "#DDC9B4", "#136F63"];

    return (
        <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.background}
        >
            <Pressable
                style={[styles.button]}
                onPress={() => setModalVisible(true)}
            >
                <ThemedText style={[styles.title]} type="subtitle">
                    {title}
                </ThemedText>
            </Pressable>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    button: {
        padding: 5,
        flexGrow: 1,
        justifyContent: "center",
    },
    title: {
        color: "white",
    },
});
