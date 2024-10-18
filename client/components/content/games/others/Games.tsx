import { StyleSheet, View } from "react-native";
import { GameIdea } from "@/components/content/games/others/GameIdea";
import { Joke } from "@/components/content/games/others/Joke";

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
    return (
        <View key={game.id}>
            {game.title === "Idée" ? (
                <GameIdea game={game} />
            ) : (
                <Joke game={game} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({});
