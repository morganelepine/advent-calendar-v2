import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/custom-utils/Markdown";
import { CustomButton } from "@/components/custom-utils/Buttons/Button";
import { useState } from "react";

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

interface GamesProps {
    game: Content;
}

export const Games: React.FC<GamesProps> = ({ game }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <View key={game.id}>
            <ThemedText style={styles.title}>Charade de Noël</ThemedText>

            {game.content1 ? (
                <CustomMarkdown>{game.content1}</CustomMarkdown>
            ) : null}

            <CustomButton
                onPress={() => {
                    setShowAnswer(!showAnswer);
                }}
            >
                {showAnswer ? "Cacher la réponse" : "Voir la réponse"}
            </CustomButton>

            {showAnswer && (
                <View>
                    {game.content2 ? (
                        <ThemedText style={styles.shortAnswer}>
                            {game.content2}
                        </ThemedText>
                    ) : null}

                    {game.content3 ? (
                        <ThemedText style={styles.longAnswer}>
                            {game.content3}
                        </ThemedText>
                    ) : null}

                    {game.content4 ? (
                        <ThemedText style={styles.explanation}>
                            {game.content4}
                        </ThemedText>
                    ) : null}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        color: "#22311d",
        marginTop: 10,
        fontFamily: "AnonymousProBold",
        marginBottom: 20,
    },
    shortAnswer: {
        fontFamily: "AnonymousProBold",
        fontSize: 24,
        marginBottom: 10,
    },
    longAnswer: {
        fontFamily: "AnonymousProBold",
        fontSize: 20,
        marginBottom: 10,
    },
    explanation: {
        fontFamily: "AnonymousProItalic",
    },
});
