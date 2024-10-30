import { StyleSheet, View } from "react-native";
import { Href } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Video } from "@/components/utils/custom/Video";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { Content } from "@/interfaces/contentInterface";
import { Collapsible } from "@/components/utils/Collapsible";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { AdvancedImage } from "cloudinary-react-native";
import cld from "@/config/cloudinaryConfig";

interface ListProps {
    idea: Content;
}

export const List: React.FC<ListProps> = ({ idea }) => {
    return (
        <View>
            <ThemedText type="modalSubtitle" style={{ marginBottom: 20 }}>
                {idea.title}
            </ThemedText>

            {idea.content1 && (
                <CustomMarkdown style={{ marginBottom: 20 }}>
                    {idea.content1}
                </CustomMarkdown>
            )}

            <>
                {idea.listOfContents?.map((content) => (
                    <View key={content.id}>
                        {content.description ? (
                            <Collapsible title={content.title}>
                                {content.author ? (
                                    <>
                                        <ThemedText style={styles.description}>
                                            {content.description}
                                            <ExternalLink
                                                href={content.link as Href}
                                            >
                                                <ThemedText
                                                    style={[
                                                        styles.description,
                                                        {
                                                            textDecorationLine:
                                                                "underline",
                                                        },
                                                    ]}
                                                >
                                                    {content.author}
                                                </ThemedText>
                                            </ExternalLink>
                                        </ThemedText>
                                    </>
                                ) : (
                                    <ThemedText style={styles.description}>
                                        {content.description}
                                    </ThemedText>
                                )}
                            </Collapsible>
                        ) : (
                            <ThemedText style={styles.title}>
                                {content.title}
                            </ThemedText>
                        )}

                        {content.url ? (
                            <View style={styles.video}>
                                <Video videoId={content.url} />
                            </View>
                        ) : null}

                        {content.image ? (
                            <View style={styles.video}>
                                <AdvancedImage
                                    cldImg={cld.image(content.image)}
                                    resizeMode="contain"
                                    style={styles.image}
                                />
                            </View>
                        ) : null}
                    </View>
                ))}
            </>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: "PoppinsBold",
        textAlign: "left",
    },
    description: { textAlign: "left", fontSize: 15 },
    videoTitle: { fontFamily: "PoppinsBold", fontSize: 18, marginBottom: -5 },
    video: { marginTop: 10, marginBottom: 30 },
    image: {
        aspectRatio: 1,
        height: undefined,
    },
});
