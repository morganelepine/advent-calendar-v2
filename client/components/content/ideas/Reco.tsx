import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Video } from "@/components/custom-utils/Video";
import { CustomMarkdown } from "@/components/custom-utils/Markdown";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import { ExternalLink } from "@/components/utils/ExternalLink";

const cld = new Cloudinary({
    cloud: {
        cloudName: "deauthz29",
    },
});

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

interface RecoProps {
    idea: Content;
    imageWidth: number;
    imageHeight: number;
}

export const Reco: React.FC<RecoProps> = ({
    idea,
    imageWidth,
    imageHeight,
}) => {
    return (
        <View>
            <ThemedText type="modalSubtitle">{idea.title}</ThemedText>

            {idea.content1 ? (
                <CustomMarkdown style={styles.subtitle}>
                    {idea.content1}
                </CustomMarkdown>
            ) : null}

            {idea.content3 ? (
                <ThemedText style={styles.author}>
                    de {idea.content3}
                </ThemedText>
            ) : null}

            {idea.content5 === "Un livre" && idea.content4 ? (
                <View>
                    <AdvancedImage
                        cldImg={cld.image(idea.content4)}
                        style={[
                            styles.image,
                            { width: imageWidth },
                            { height: imageHeight },
                        ]}
                        resizeMode="contain"
                    />
                </View>
            ) : null}

            {(idea.content5 === "Une série" || idea.content5 === "Des films") &&
            idea.content4 ? (
                <Video videoId={idea.content4} />
            ) : null}

            <CustomMarkdown style={styles.description}>
                {idea.content2}
            </CustomMarkdown>

            {(idea.content5 === "Une playlist" || idea.content5 === "Un jeu") &&
            idea.content4 ? (
                <ExternalLink href={idea.content4} style={styles.button}>
                    <ThemedText style={styles.buttonText}>
                        {idea.title.includes("Bingo")
                            ? "Télécharger le bingo"
                            : "Écouter la playlist"}
                    </ThemedText>
                </ExternalLink>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    subtitle: {
        marginTop: 15,
        fontFamily: "PoppinsBold",
    },
    author: {
        marginTop: -10,
        marginBottom: 15,
        fontSize: 12,
        fontFamily: "PoppinsItalic",
        textAlign: "left",
    },
    description: {
        marginTop: 15,
        marginBottom: 5,
    },
    image: {
        borderColor: "#165d4b",
        borderWidth: 0.2,
        marginBottom: 5,
    },
    button: {
        backgroundColor: "#165d4b",
        padding: 10,
        borderRadius: 20,
        marginBottom: 20,
        textAlign: "center",
    },
    buttonText: { color: "white" },
});
