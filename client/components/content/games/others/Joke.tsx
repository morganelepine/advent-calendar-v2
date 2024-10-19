import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/custom-utils/Markdown";
import { CustomButton } from "@/components/custom-utils/Buttons/Button";
import { useState } from "react";
import { Colors } from "@/constants/Colors";

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
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <View key={game.id}>
            <ThemedText type="modalSubtitle" style={styles.title}>
                {game.title}
            </ThemedText>

            <CustomMarkdown>{game.content1}</CustomMarkdown>

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
                        <ThemedText>{game.content4}</ThemedText>
                    ) : null}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginBottom: 20,
        textAlign: "center",
    },
    shortAnswer: {
        fontFamily: "PallyBold",
        fontSize: 20,
        marginBottom: 10,
    },
    longAnswer: {
        color: Colors.blue,
        marginBottom: 10,
    },
});
