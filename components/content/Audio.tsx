import { useEffect, useState } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio, AVPlaybackStatus } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { MusicPreference } from "@/types/types";

interface AudioPlayerProps {
    music: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ music }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [playMusic, setPlayMusic] = useState<MusicPreference>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playSound = async () => {
        if (!sound) {
            const { sound: newSound } = await Audio.Sound.createAsync({
                uri: music,
            });
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
        <Pressable onPress={togglePlayPause} style={styles.button}>
            <View style={styles.buttonBackground} />
            <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={26}
                color={Colors.blue}
            ></Ionicons>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.snow,
        borderRadius: 50,
        opacity: 0.8,
    },
    button: {
        height: 48,
        width: 48,
        alignItems: "center",
        justifyContent: "center",
    },
});
