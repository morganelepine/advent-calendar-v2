import { Href } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { Content } from "@/interfaces/contentInterface";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { Colors } from "@/constants/Colors";
import { AdvancedImage } from "cloudinary-react-native";
import cld from "@/config/cloudinaryConfig";

interface GameIdeaProps {
    game: Content;
}

export const GameIdea: React.FC<GameIdeaProps> = ({ game }) => {
    return (
        <View key={game.id}>
            {!game.content1.includes("Bingo") ? (
                <>
                    <ThemedText type="modalSubtitle" style={styles.title}>
                        Une idée de jeu pour animer le&nbsp;réveillon
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>
                        {game.content1}
                    </ThemedText>
                </>
            ) : (
                <ThemedText type="modalSubtitle" style={styles.title}>
                    {game.content1}
                </ThemedText>
            )}
            <CustomMarkdown>{game.content2}</CustomMarkdown>

            {game.content3 ? (
                <ExternalLink
                    href={game.content3 as Href}
                    style={styles.button}
                >
                    <ThemedText style={styles.buttonText}>
                        Télécharger le bingo
                    </ThemedText>
                </ExternalLink>
            ) : null}

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
        marginBottom: 15,
        textAlign: "center",
    },
    subtitle: {
        fontFamily: "PoppinsBold",
        marginBottom: 10,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        height: undefined,
    },
    button: {
        backgroundColor: Colors.blue,
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 20,
        textAlign: "center",
    },
    buttonText: { color: "white" },
});
