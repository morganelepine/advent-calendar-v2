import { StyleSheet, View } from "react-native";
import { Quote } from "@/components/content/Quote";
import { Anecdote } from "@/components/content/Anecdote";
import { Idea } from "@/components/content/Idea";
import { Game } from "@/components/content/Game";

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

interface DayContentProps {
    contents: Content[];
    dayId: number | null;
}

export const DayContent: React.FC<DayContentProps> = ({ contents, dayId }) => {
    const contentsByType: {
        quote?: Content;
        anecdote?: Content;
        ideas: Content[];
        games: Content[];
    } = { ideas: [], games: [] };

    contents.forEach((content) => {
        switch (content.type) {
            case "quote":
                contentsByType.quote = content;
                break;
            case "anecdote":
                contentsByType.anecdote = content;
                break;
            case "idea":
                contentsByType.ideas.push(content);
                break;
            case "game":
                contentsByType.games.push(content);
                break;
        }
    });

    return (
        <View style={[styles.contentsContainer]}>
            {contentsByType.quote && (
                <View style={styles.contentContainer}>
                    <Quote content={contentsByType.quote} dayId={dayId} />
                </View>
            )}

            {contentsByType.anecdote && (
                <View style={styles.contentContainer}>
                    <Anecdote content={contentsByType.anecdote} dayId={dayId} />
                </View>
            )}

            {contentsByType.ideas.length > 0 && (
                <View style={styles.contentContainer}>
                    <Idea ideas={contentsByType.ideas} dayId={dayId} />
                </View>
            )}

            {contentsByType.games.length > 0 && (
                <View style={styles.contentContainer}>
                    <Game games={contentsByType.games} dayId={dayId} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    contentsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        flexGrow: 1,
        alignContent: "center",
        paddingHorizontal: 5,
        // borderWidth: 2,
        // borderColor: "red",
    },
    contentContainer: {
        width: "100%",
        height: "25%",
        padding: 5,
    },
});
