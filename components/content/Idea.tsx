import { useState, useEffect } from "react";
import { Dimensions, Image, View, ScrollView } from "react-native";
import { ContentButton } from "@/components/content/ContentButton";
import { Reco } from "@/components/content/ideas/Reco";
import { Recipe } from "@/components/content/ideas/Recipe";
import { Content } from "@/interfaces/contentInterface";
import { ContentType, IdeaType } from "@/enums/enums";
import { ModalWithText } from "@/components/utils/custom/ModalWithText";
import { List } from "./ideas/List";
import { CloudinaryImage } from "@cloudinary/url-gen";
import cld from "@/config/cloudinaryConfig";

interface IdeaProps {
    ideas: Content[];
    dayId: number;
}

export const Idea: React.FC<IdeaProps> = ({ ideas, dayId }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const backgroundImage = cld.image("se-divertir_xvdksq");
    const [modalBackground, setModalBackground] =
        useState<CloudinaryImage>(backgroundImage);

    const [imageDimensions, setImageDimensions] = useState<{
        [key: string]: { width: number; height: number };
    }>({});

    const screenWidth = Dimensions.get("window").width;
    const maxHeight = 200;

    const formatImage = (idea: Content) => {
        const image = cld.image(idea.content4).toURL();
        Image.getSize(image, (width, height) => {
            const ratio = Math.min(screenWidth / width, maxHeight / height);
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
    };

    const getmodalImage = (idea: Content) => {
        if (idea.content5 === IdeaType.Recipe) {
            setModalBackground(cld.image(idea.content3));
        } else {
            setModalBackground(backgroundImage);
        }
    };

    useEffect(() => {
        ideas.forEach((idea) => {
            if (idea.content5 === IdeaType.Book) {
                formatImage(idea);
            }
            getmodalImage(idea);
        });
    }, [ideas]);

    return (
        <>
            <ContentButton
                ideas={ideas}
                setModalVisible={setModalVisible}
                dayId={dayId}
                backgroundImage={backgroundImage}
            />

            {ideas.map((idea) => (
                <ModalWithText
                    isVisible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    contentType={ContentType.Idea}
                    backgroundImage={modalBackground}
                    key={idea.id}
                >
                    <ScrollView style={{ width: "100%" }}>
                        <View>
                            {idea.content5 === IdeaType.Recipe ? (
                                <Recipe content={idea} />
                            ) : idea.content5 === IdeaType.List ? (
                                <List idea={idea} />
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
                    </ScrollView>
                </ModalWithText>
            ))}
        </>
    );
};
