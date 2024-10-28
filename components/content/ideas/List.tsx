import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Video } from "@/components/utils/custom/Video";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { Content } from "@/interfaces/contentInterface";
import { Collapsible } from "@/components/utils/Collapsible";

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
                    <View key={content.url}>
                        {content.description ? (
                            <Collapsible title={content.title}>
                                <CustomMarkdown style={styles.description}>
                                    {content.description}
                                </CustomMarkdown>
                            </Collapsible>
                        ) : (
                            <ThemedText style={styles.title}>
                                {content.title}
                            </ThemedText>
                        )}

                        <View style={styles.video}>
                            <Video videoId={content.url} />
                        </View>
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
    description: { textAlign: "left", fontSize: 15, marginTop: -10 },
    videoTitle: { fontFamily: "PoppinsBold", fontSize: 18, marginBottom: -5 },
    video: { marginTop: 10, marginBottom: 30 },
});
