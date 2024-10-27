import { StyleSheet, View } from "react-native";
import { Href } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Video } from "@/components/utils/custom/Video";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { Colors } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";
import { IdeaType } from "@/enums/enums";

const cld = new Cloudinary({
    cloud: {
        cloudName: "deauthz29",
    },
});

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
                <CustomMarkdown style={styles.title}>
                    {idea.content1}
                </CustomMarkdown>
            ) : null}

            {idea.content3 ? (
                <ThemedText style={styles.author}>
                    de {idea.content3}
                </ThemedText>
            ) : null}

            {idea.content5 === IdeaType.Book && idea.content4 ? (
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

            {(idea.content5 === IdeaType.TvShow ||
                idea.content5 === IdeaType.List) &&
            idea.content4 ? (
                <Video videoId={idea.content4} />
            ) : null}

            <CustomMarkdown style={styles.description}>
                {idea.content2}
            </CustomMarkdown>

            {idea.content5 === IdeaType.Idea && idea.content4 ? (
                <ExternalLink
                    href={idea.content4 as Href}
                    style={styles.button}
                >
                    <ThemedText style={styles.buttonText}>
                        {idea.content3}
                    </ThemedText>
                </ExternalLink>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
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
        borderColor: Colors.blue,
        borderWidth: 0.2,
        marginBottom: 5,
    },
    button: {
        backgroundColor: Colors.blue,
        padding: 10,
        borderRadius: 20,
        marginBottom: 20,
        textAlign: "center",
    },
    buttonText: { color: "white" },
});
