import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
    cloud: {
        cloudName: "deauthz29",
    },
});

interface RecipeProps {
    content: {
        dayNumber: number;
        type: string;
        title: string;
        content1: string;
        content2: string;
        content3: string;
        content4: string;
        content5: string;
    };
}

export const Recipe: React.FC<RecipeProps> = ({ content }) => {
    return (
        <View>
            <ThemedText type="modalSubtitle">{content.title}</ThemedText>

            <View>
                {content.content3 ? (
                    <AdvancedImage
                        cldImg={cld.image(content.content3)}
                        style={styles.image}
                    />
                ) : null}

                {content.content4 ? (
                    <CustomMarkdown style={styles.sourcePhoto}>
                        {content.content4}
                    </CustomMarkdown>
                ) : null}
            </View>

            <View style={styles.contentContainer}>
                <ThemedText style={styles.contentTitle}>Ingrédients</ThemedText>
                <CustomMarkdown style={styles.ingredients}>
                    {content.content2}
                </CustomMarkdown>
            </View>

            <View style={styles.contentContainer}>
                <ThemedText style={styles.contentTitle}>Recette</ThemedText>
                <ThemedText style={styles.recipe}>
                    {content.content1}
                </ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    recipe: {
        textAlign: "left",
    },
    contentContainer: { textAlign: "left", marginTop: 20 },
    contentTitle: {
        fontFamily: "PallyBold",
        textAlign: "left",
        marginBottom: 10,
        fontSize: 20,
    },
    ingredients: {
        marginBottom: 5,
        fontSize: 16,
        textAlign: "left",
    },
    image: {
        marginTop: 20,
        width: "100%",
        aspectRatio: 1,
        height: undefined,
    },
    sourcePhoto: {
        fontSize: 12,
        fontFamily: "AnonymousProItalic",
    },
});
