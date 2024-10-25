import { View } from "react-native";
import { GameIdea } from "@/components/content/games/others/GameIdea";
import { Joke } from "@/components/content/games/others/Joke";
import { Content } from '../../../../interfaces/contentInterface';

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
