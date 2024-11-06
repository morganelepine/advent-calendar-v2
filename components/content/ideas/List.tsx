import { StyleSheet, View, Image } from "react-native";
import { Href } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Video } from "@/components/utils/custom/Video";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { Content } from "@/interfaces/contentInterface";
import { Collapsible } from "@/components/utils/Collapsible";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { useEffect, useState } from "react";
import { getImageDimensions } from "@/services/image.service";

interface ListProps {
    idea: Content;
}

export const List: React.FC<ListProps> = ({ idea }) => {
    const [imageDimensions, setImageDimensions] = useState<{
        [key: string]: { width: number; height: number };
    }>({});

    useEffect(() => {
        const dimensions = getImageDimensions(idea, 300);
        setImageDimensions(dimensions);
    }, [idea]);

    return (
        <View>
            <ThemedText type="modalSubtitle" style={{ marginBottom: 20 }}>
                {idea.title}
            </ThemedText>

            {idea.content1 ? (
                <CustomMarkdown style={{ marginBottom: 20 }}>
                    {idea.content1}
                </CustomMarkdown>
            ) : null}

            <>
                {idea.listOfContents?.map((content) => (
                    <View key={content.id}>
                        {content.description ? (
                            <Collapsible
                                title={content.title}
                                style={{ width: "90%" }}
                            >
                                {content.author ? (
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
                                <Image
                                    source={content.image}
                                    style={[
                                        styles.image,
                                        {
                                            width: imageDimensions[
                                                idea.dayNumber
                                            ]?.width,
                                        },
                                        {
                                            height: imageDimensions[
                                                idea.dayNumber
                                            ]?.height,
                                        },
                                    ]}
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
    description: { textAlign: "left", fontSize: 15, marginBottom: 20 },
    videoTitle: { fontFamily: "PoppinsBold", fontSize: 18, marginBottom: -5 },
    video: { marginBottom: 20 },
    image: {
        aspectRatio: 1,
    },
});
