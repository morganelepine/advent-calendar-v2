import { StyleSheet, View, Pressable, TextStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Markdown from "react-native-markdown-display";
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
            <ThemedText style={[styles.texts, styles.title]}>
                Charade de Noël
            </ThemedText>

            {game.content1 ? (
                <Markdown
                    style={{
                        body: [styles.texts] as TextStyle,
                    }}
                >
                    {game.content1}
                </Markdown>
            ) : null}

            <Pressable
                onPress={() => {
                    setShowAnswer(!showAnswer);
                }}
                style={styles.button}
            >
                <ThemedText>
                    {showAnswer ? "Cacher la réponse" : "Voir la réponse"}
                </ThemedText>
            </Pressable>

            {showAnswer && (
                <View>
                    {game.content2 ? (
                        <ThemedText style={[styles.texts, styles.shortAnswer]}>
                            {game.content2}
                        </ThemedText>
                    ) : null}

                    {game.content3 ? (
                        <ThemedText style={[styles.texts, styles.longAnswer]}>
                            {game.content3}
                        </ThemedText>
                    ) : null}

                    {game.content4 ? (
                        <ThemedText style={[styles.texts, styles.explanation]}>
                            {game.content4}
                        </ThemedText>
                    ) : null}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    texts: {
        color: "#22311d",
        textAlign: "center",
        fontFamily: "AnonymousPro",
        fontSize: 20,
    },
    title: {
        color: "#22311d",
        marginTop: 10,
        fontFamily: "AnonymousProBold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#22311d",
        paddingVertical: 10,
        borderRadius: 20,
        marginVertical: 20,
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
