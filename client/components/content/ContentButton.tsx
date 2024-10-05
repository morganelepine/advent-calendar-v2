import { StyleSheet, Pressable, ImageBackground } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface Content {
    id: number;
    type: "quote" | "recipe" | "anecdote" | "idea" | "game";
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    content5: string;
}

interface ContentButtonProps {
    content?: Content;
    ideas?: Content[];
    games?: Content[];
    setModalVisible: (visible: boolean) => void;
}

export const ContentButton: React.FC<ContentButtonProps> = ({
    content = {
        id: 0,
        type: "quote",
        title: "",
        content1: "",
        content2: "",
        content3: "",
        content4: "",
        content5: "",
    },
    ideas = [],
    games = [],
    setModalVisible,
}) => {
    const getImage = (content: Content, ideas: Content[], games: Content[]) => {
        if (ideas.length > 0) {
            return require("@/assets/images/katie-azi-AHIS5FUW0gk-unsplash.jpg");
        }
        if (games.length > 0) {
            return require("@/assets/images/amy-chen-0JSwEitKjOw-unsplash.jpg");
        }
        switch (content.type) {
            case "quote":
                return require("@/assets/images/pomme-de-pin.jpg");
            case "recipe":
                return require("@/assets/images/libby-penner-jnkmQ1cEm7Q-unsplash.jpg");
            case "anecdote":
                return require("@/assets/images/annie-spratt-UPZ3PpDzk2Y-unsplash.jpg");
            default:
                return require("@/assets/images/alisa-anton-ujKXJFlENXg-unsplash.jpg");
        }
    };
    const image = getImage(content, ideas, games);

    const getTitle = (content: Content, ideas: Content[], games: Content[]) => {
        if (ideas.length > 0) {
            return "Se divertir";
        }
        if (games.length > 0) {
            return "S'amuser";
        }
        switch (content.type) {
            case "quote":
                return "S'inspirer";
            case "recipe":
                return "Se régaler";
            case "anecdote":
                return "S'instuire";
            default:
                return "Contenu du jour";
        }
    };

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
                    {getTitle(content, ideas, games)}
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
