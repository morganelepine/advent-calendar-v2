import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Image, Pressable, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ParallaxScrollView from "@/components/utils/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { FirstLaunch } from "@/components/calendar/FirstLaunch";
import { Colors } from "@/constants/Colors";
import { MusicPreference } from "@/types/types";
import { useFocusEffect } from "expo-router";
import cld from "@/config/cloudinaryConfig";

export default function InformationsScreen() {
    const [playMusic, setPlayMusic] = useState<MusicPreference>(null);
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const getMusicPreference = async (): Promise<void> => {
            const musicPref = await AsyncStorage.getItem("playMusic");
            setPlayMusic(musicPref as MusicPreference);
        };
        getMusicPreference();
    }, []);

    const handleMusicPreference = async (
        preference: MusicPreference
    ): Promise<void> => {
        if (preference) {
            try {
                await AsyncStorage.setItem("playMusic", preference);
                setPlayMusic(preference);
                setVisible(false);
            } catch (error) {
                console.error("Error setting music preference", error);
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                setVisible(true);
            };
        }, [])
    );

    const backgroundImage = cld.image("christmas_gssam3");

    return (
        <ParallaxScrollView
            headerBackgroundColor={{
                light: Colors.snow,
                dark: Colors.darkGreen,
            }}
            headerImage={
                <Image
                    source={{ uri: backgroundImage.toURL() }}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
            }
        >
            <ThemedText type="modalTitle" style={{ color: Colors.blue }}>
                Présentation du&nbsp;calendrier
            </ThemedText>

            <FirstLaunch />

            <View style={styles.musicContainer}>
                <View style={styles.background} />

                {visible ? (
                    playMusic === "yes" ? (
                        <>
                            <ThemedText>
                                Souhaitez-vous désactiver le fond musical dans
                                l'application ?
                            </ThemedText>
                            <ThemedText style={styles.textExplaination}>
                                La musique ne se déclenchera plus lorsque vous
                                ouvrirez l'app mais vous pourrez toujours
                                l'activer dans l'onglet "Décompte".
                            </ThemedText>
                            <Pressable
                                onPress={() => {
                                    handleMusicPreference("no");
                                }}
                                style={styles.button}
                            >
                                <View style={styles.buttonBackground} />
                                <ThemedText style={{ color: Colors.snow }}>
                                    Désactiver
                                </ThemedText>
                            </Pressable>
                        </>
                    ) : (
                        <>
                            <ThemedText>
                                Souhaitez-vous activer un fond musical dans
                                l'application ?
                            </ThemedText>
                            <ThemedText style={styles.textExplaination}>
                                La musique se déclenchera lorsque vous ouvrez
                                l'app, mais vous pourrez l'arrêter à tout moment
                                dans l'onglet "Décompte".
                            </ThemedText>
                            <Pressable
                                onPress={() => {
                                    handleMusicPreference("yes");
                                }}
                                style={styles.button}
                            >
                                <View style={styles.buttonBackground} />
                                <ThemedText style={{ color: Colors.snow }}>
                                    Activer
                                </ThemedText>
                            </Pressable>
                        </>
                    )
                ) : (
                    <ThemedText style={styles.confirmation}>
                        Votre préférence a bien été prise en compte. Vous
                        pourrez la modifier plus tard si besoin.
                    </ThemedText>
                )}
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: "100%",
        width: "100%",
    },
    musicContainer: {
        marginBottom: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 1,
        borderColor: Colors.green,
        borderRadius: 20,
        backgroundColor: "white",
        opacity: 0.6,
    },
    button: {
        padding: 6,
    },
    buttonBackground: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 50,
        backgroundColor: Colors.green,
    },
    textExplaination: {
        fontSize: 12,
        flexShrink: 1,
        marginVertical: 10,
    },
    confirmation: {
        fontSize: 12,
        fontFamily: "PoppinsItalic",
        color: Colors.green,
    },
});
