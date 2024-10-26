import { StyleSheet, View } from "react-native";
import { Quote } from "@/components/content/Quote";
import { Anecdote } from "@/components/content/Anecdote";
import { Idea } from "@/components/content/Idea";
import { Game } from "@/components/content/Game";
import { Content } from '../../../interfaces/contentInterface';

interface DayContentProps {
    quoteOfTheDay: Content | undefined;
    anecdoteOfTheDay: Content | undefined;
    ideas: Content[];
    games: Content[];
    dayId: number;
}

export const DayContent: React.FC<DayContentProps> = ({
    quoteOfTheDay,
    anecdoteOfTheDay,
    ideas,
    games,
    dayId,
}) => {
    return (
        <View style={styles.contentsContainer}>
            <View style={styles.contentContainer}>
                {quoteOfTheDay && (
                    <Quote content={quoteOfTheDay} dayId={dayId} />
                )}
            </View>

            <View style={styles.contentContainer}>
                {anecdoteOfTheDay && (
                    <Anecdote content={anecdoteOfTheDay} dayId={dayId} />
                )}
            </View>

            <View style={styles.contentContainer}>
                {ideas.length > 0 && <Idea ideas={ideas} dayId={dayId} />}
            </View>

            <View style={styles.contentContainer}>
                {games.length > 0 && <Game games={games} dayId={dayId} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contentsContainer: {
        flexGrow: 1,
        gap: 5,
    },
    contentContainer: {
        flexGrow: 1,
    },
});
