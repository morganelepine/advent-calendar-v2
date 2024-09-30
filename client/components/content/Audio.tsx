import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ContentProps {
    content: {
        id: number;
        type: string;
        urlContent: string;
        textContent: string;
    };
}

export const AudioPlayer: React.FC<ContentProps> = ({ content }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require("../../assets/musics/jingle-bells-rock.mp3")
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
        // playSound();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    // Stop music when returning to the calendar
    useFocusEffect(
        useCallback(() => {
            return () => {
                if (sound) {
                    sound.stopAsync();
                    sound.unloadAsync();
                }
            };
        }, [sound])
    );

    return (
        <TouchableOpacity onPress={togglePlayPause} style={styles.iconButton}>
            <Ionicons
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={50}
                color="#ffd181"
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconButton: {
        alignItems: "flex-end",
        padding: 10,
    },
});