import { useState, useEffect } from "react";
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
    dayNumber: number;
    type: string;
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
    const [imageDimensions, setImageDimensions] = useState<{
        [key: string]: { width: number; height: number };
    }>({});

    const screenWidth = Dimensions.get("window").width;
    const maxHeight = 200;

    useEffect(() => {
        ideas.forEach((idea) => {
            if (idea.content5 === "Un livre") {
                const image = cld.image(idea.content4).toURL();
                Image.getSize(image, (width, height) => {
                    const ratio = Math.min(
                        screenWidth / width,
                        maxHeight / height
                    );
                    const adjustedWidth = width * ratio;
                    const adjustedHeight = height * ratio;

                    setImageDimensions((prev) => ({
                        ...prev,
                        [idea.dayNumber]: {
                            width: adjustedWidth,
                            height: adjustedHeight,
                        },
                    }));
                });
            }
        });
    }, [ideas]);

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
                                    imageWidth={
                                        imageDimensions[idea.dayNumber]?.width
                                    }
                                    imageHeight={
                                        imageDimensions[idea.dayNumber]?.height
                                    }
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