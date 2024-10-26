import { StyleSheet, Pressable } from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

export const AudioPlayer = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require("@/assets/musics/we-wish-you-a-merry-christmas.mp3")
        );
        setSound(sound);
        await sound.playAsync();
        setIsPlaying(true);
    };

    const togglePlayPause = async () => {
        if (sound) {
            const status: AVPlaybackStatus = await sound.getStatusAsync();
            if (status.isLoaded) {
                if (status.isPlaying) {
                    await sound.pauseAsync();
                    setIsPlaying(false);
                } else {
                    await sound.playAsync();
                    setIsPlaying(true);
                }
            }
        }
    };

    useEffect(() => {
        playSound();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    return (
        <Pressable onPress={togglePlayPause} style={styles.iconButton}>
            <Ionicons
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={60}
                color={Colors.snow}
                style={styles.iconButton}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    iconButton: {},
});
