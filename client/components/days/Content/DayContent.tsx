import { StyleSheet, View } from "react-native";
import { Quote } from "@/components/content/Quote";
import { Anecdote } from "@/components/content/Anecdote";
import { Idea } from "@/components/content/Idea";
import { Game } from "@/components/content/Game";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

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

    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView
            style={{
                flexGrow: 1,
                paddingTop: -insets.top,
            }}
        >
            <View style={styles.contentsContainer}>
                <View style={styles.contentContainer}>
                    {contentsByType.quote && (
                        <Quote content={contentsByType.quote} dayId={dayId} />
                    )}
                </View>

                <View style={styles.contentContainer}>
                    {contentsByType.anecdote && (
                        <Anecdote
                            content={contentsByType.anecdote}
                            dayId={dayId}
                        />
                    )}
                </View>

                <View style={styles.contentContainer}>
                    {contentsByType.ideas.length > 0 && (
                        <Idea ideas={contentsByType.ideas} dayId={dayId} />
                    )}
                </View>

                <View style={styles.contentContainer}>
                    {contentsByType.games.length > 0 && (
                        <Game games={contentsByType.games} dayId={dayId} />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contentsContainer: {
        flexGrow: 1,
        gap: 8,
        padding: 8,
        // borderWidth: 2,
        // borderColor: "red",
    },
    contentContainer: {
        flexGrow: 1,
    },
});
