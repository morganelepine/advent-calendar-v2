import {
    StyleSheet,
    View,
    Modal,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import YoutubePlayer from "react-native-youtube-iframe";
import { useCallback, useState } from "react";
import { ContentButton } from "@/components/content/ContentButton";
import Ionicons from "@expo/vector-icons/Ionicons";

interface VideoProps {
    content: {
        id: number;
        type: "quote" | "tip" | "recipe" | "video" | "game";
        title: string;
        content: string;
    };
}

export const Video: React.FC<VideoProps> = ({ content }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const [playing, setPlaying] = useState<boolean>(false);

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <ImageBackground
                    source={require("@/assets/images/sapin-lumineux.jpg")}
                    resizeMode="cover"
                    style={styles.imageBackground}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.background} />

                            <ThemedText type="title" style={styles.title}>
                                Vidéo du jour
                            </ThemedText>

                            <View>
                                {content.title ? (
                                    <ThemedText
                                        type="subtitle"
                                        style={styles.subTitle}
                                    >
                                        {content.title}
                                    </ThemedText>
                                ) : null}

                                <View style={styles.videoPlayer}>
                                    <YoutubePlayer
                                        height={160}
                                        play={playing}
                                        videoId={content.content}
                                        onChangeState={onStateChange}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                            >
                                <Ionicons
                                    name={"close-outline"}
                                    size={35}
                                    color="#22311d"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </Modal>

            <ContentButton
                content={content}
                setModalVisible={setModalVisible}
            />
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageBackground: {
        flex: 1,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "white",
        opacity: 0.6,
        borderRadius: 50,
    },
    modalView: {
        borderRadius: 50,
        margin: 15,
        padding: 25,
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
    },
    title: {
        color: "#22311d",
        marginTop: 10,
    },
    subTitle: {
        color: "#22311d",
        marginBottom: 20,
    },
    videoPlayer: {},
});
