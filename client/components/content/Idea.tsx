import { useState } from "react";
import { StyleSheet, Dimensions, Image, View } from "react-native";
import { CustomModal } from "@/components/custom-utils/Modal";
import { CustomScrollView } from "@/components/custom-utils/ScrollView";
import { ContentButton } from "@/components/content/ContentButton";
import { Cloudinary } from "@cloudinary/url-gen";
import { Reco } from "@/components/content/ideas/Reco";
import { Recipe } from "@/components/content/ideas/Recipe";

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

interface IdeaProps {
    ideas: Content[];
    dayId: number | null;
}

export const Idea: React.FC<IdeaProps> = ({ ideas, dayId }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [imageWidth, setImageWidth] = useState<number>(0);
    const [imageHeight, setImageHeight] = useState<number>(0);

    const screenWidth = Dimensions.get("window").width;
    const maxHeight = 200;

    ideas.forEach((idea) => {
        if (idea.content5 === "Un livre") {
            const image = cld.image(idea.content4);
            const imageUrl = image.toURL();

            Image.getSize(imageUrl, (width, height) => {
                const ratio = Math.min(screenWidth / width, maxHeight / height);
                const adjustedWidth = width * ratio;
                const adjustedHeight = height * ratio;

                setImageWidth(adjustedWidth);
                setImageHeight(adjustedHeight);
            });
        }
    });

    return (
        <>
            <ContentButton
                ideas={ideas}
                setModalVisible={setModalVisible}
                dayId={dayId}
            />
            <CustomModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                contentType={"ideas"}
            >
                <CustomScrollView>
                    {ideas.map((idea) => (
                        <View key={idea.id}>
                            {idea.content5 === "Une recette" ? (
                                <Recipe content={idea} />
                            ) : (
                                <Reco
                                    idea={idea}
                                    imageWidth={imageWidth}
                                    imageHeight={imageHeight}
                                />
                            )}
                        </View>
                    ))}
                </CustomScrollView>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({});
