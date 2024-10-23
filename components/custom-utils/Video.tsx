import { StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useCallback, useState } from "react";

interface VideoProps {
    videoId: string;
}

export const Video: React.FC<VideoProps> = ({ videoId }) => {
    const [playing, setPlaying] = useState<boolean>(false);

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    return (
        <YoutubePlayer
            height={170}
            play={playing}
            videoId={videoId}
            onChangeState={onStateChange}
        />
    );
};

const styles = StyleSheet.create({});
