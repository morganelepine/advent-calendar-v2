import { View, Text, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useCallback, useState } from "react";

interface ContentProps {
    content: {
        id: number;
        type: string;
        urlContent: string;
        textContent: string;
    };
}

export const Video: React.FC<ContentProps> = ({ content }) => {
    const [playing, setPlaying] = useState<boolean>(false);

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    return (
        <View style={styles.videoPlayer}>
            <YoutubePlayer
                height={160}
                play={playing}
                videoId={"Cm-WAIyBO1A"}
                onChangeState={onStateChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    videoPlayer: {
        borderWidth: 1,
        borderColor: "white",
    },
});
