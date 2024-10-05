import { StyleSheet, View } from "react-native";
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

interface JokeProps {
    game: Content;
}

export const Joke: React.FC<JokeProps> = ({ game }) => {
    return (
        <View key={game.id}>
            <ThemedText style={[styles.texts, styles.title]}>
                {game.title}
            </ThemedText>

            {game.content1 ? (
                <ThemedText style={styles.texts}>{game.content1}</ThemedText>
            ) : null}

            {game.content2 ? (
                <ThemedText style={styles.texts}>{game.content2}</ThemedText>
            ) : null}

            {game.content3 ? (
                <ThemedText style={styles.texts}>{game.content3}</ThemedText>
            ) : null}

            {game.content4 ? (
                <ThemedText style={styles.texts}>{game.content4}</ThemedText>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    texts: {
        color: "#22311d",
        textAlign: "left",
        fontFamily: "AnonymousPro",
    },
    title: {
        color: "#22311d",
        marginTop: 10,
    },
});
