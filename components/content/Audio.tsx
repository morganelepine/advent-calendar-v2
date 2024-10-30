import { useEffect, useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio, AVPlaybackStatus } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { MusicPreference } from "@/types/types";

export const AudioPlayer = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [playMusic, setPlayMusic] = useState<MusicPreference>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playSound = async () => {
        if (!sound) {
            const { sound: newSound } = await Audio.Sound.createAsync(
                require("@/assets/musics/we-wish-you-a-merry-christmas.mp3")
            );
            setSound(newSound);
            await newSound.playAsync();
            setIsPlaying(true);
        } else {
            await sound.playAsync();
            setIsPlaying(true);
        }
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
        } else {
            playSound();
        }
    };

    useEffect(() => {
        const getMusicPreference = async (): Promise<void> => {
            try {
                const musicPref = await AsyncStorage.getItem("playMusic");
                setPlayMusic(musicPref as MusicPreference);
            } catch (error) {
                console.error("Error fetching music preference", error);
            }
        };
        getMusicPreference();
    }, []);

    useEffect(() => {
        if (playMusic === "yes") {
            playSound();
        }

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [playMusic]);

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
