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

interface QuizProps {
    games: Content[];
}

export const Quiz: React.FC<QuizProps> = ({ games }) => {
    return (
        <>
            {games.map((game) => {
                const answers = game.content2.split(",");

                return (
                    <View key={game.id}>
                        <ThemedText style={[styles.texts, styles.question]}>
                            {game.content1}
                        </ThemedText>

                        {answers.map((answer) => (
                            <ThemedText style={[styles.answers]} key={answer}>
                                {answer}
                            </ThemedText>
                        ))}

                        <ThemedText style={[styles.texts, styles.answer]}>
                            Réponse : {game.content3}
                        </ThemedText>

                        {game.content4 ? (
                            <ThemedText
                                style={[styles.texts, styles.explanations]}
                            >
                                Bravo ! {game.content4}
                            </ThemedText>
                        ) : null}
                    </View>
                );
            })}
        </>
    );
};

const styles = StyleSheet.create({
    texts: {
        color: "#22311d",
        textAlign: "center",
        fontFamily: "AnonymousPro",
    },
    question: {
        fontFamily: "AnonymousProBoldItalic",
        marginVertical: 20,
    },
    answers: {
        backgroundColor: "#136F63",
        margin: 5,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    answer: {},
    explanations: {},
});
