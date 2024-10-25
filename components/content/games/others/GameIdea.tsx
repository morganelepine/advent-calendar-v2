import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { AdvancedImage } from "cloudinary-react-native";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
    cloud: {
        cloudName: "deauthz29",
    },
});

interface Content {
    id: number;
    dayNumber: number;
    type: string;
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    content5: string;
}

interface GameIdeaProps {
    game: Content;
}

export const GameIdea: React.FC<GameIdeaProps> = ({ game }) => {
    return (
        <View key={game.id}>
            <ThemedText type="modalSubtitle" style={styles.title}>
                Une idée de jeu pour animer le réveillon
            </ThemedText>

            <ThemedText style={styles.subtitle}>{game.content1}</ThemedText>
            <CustomMarkdown>{game.content2}</CustomMarkdown>

            {game.content4 ? (
                <AdvancedImage
                    cldImg={cld.image(game.content4)}
                    style={styles.image}
                />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginBottom: 20,
        textAlign: "center",
    },
    subtitle: {
        fontFamily: "PoppinsBold",
        marginBottom: 15,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        height: undefined,
    },
});
