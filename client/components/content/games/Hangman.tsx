import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Game } from "@/components/content/games/Hangman/Game";

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

interface HangmanProps {
    game: Content;
}

export const Hangman: React.FC<HangmanProps> = ({ game }) => {
    return (
        <View key={game.id}>
            <ThemedText style={[styles.texts, styles.quizTitle]}>
                Trouvez 4 mots autour de l'hiver et de Noël
            </ThemedText>

            <Game game={game} />
        </View>
    );
};

const styles = StyleSheet.create({
    texts: {
        color: "#22311d",
        textAlign: "center",
        fontFamily: "AnonymousPro",
    },
    quizTitle: {
        marginVertical: 10,
    },
});
