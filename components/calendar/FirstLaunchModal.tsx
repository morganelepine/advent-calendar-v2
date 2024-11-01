import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import {
    StyleSheet,
    View,
    Modal,
    ImageBackground,
    ScrollView,
} from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { FirstLaunch } from "@/components/calendar/FirstLaunch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MusicPreferences } from "@/components/calendar/MusicPreferences";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";

interface FirstLaunchModalProps {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
    insets: EdgeInsets;
}

type MusicPreference = "yes" | "no" | null;

export const FirstLaunchModal: React.FC<FirstLaunchModalProps> = ({
    modalVisible,
    setModalVisible,
    insets,
}) => {
    const scrollViewRef = useRef<ScrollView>(null);

    const [playMusic, setPlayMusic] = useState<MusicPreference>(null);

    useEffect(() => {
        const setMusicPreference = async (
            preference: MusicPreference
        ): Promise<void> => {
            if (preference) {
                try {
                    await AsyncStorage.setItem("playMusic", preference);
                } catch (error) {
                    console.error("Error saving music preference", error);
                }
            }
        };
        setMusicPreference(playMusic);
    }, [playMusic]);

    const handleStart = () => {
        setModalVisible(false);
        router.push({
            pathname: "/",
        });
    };

    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
            statusBarTranslucent={true}
        >
            <ImageBackground
                source={require("@/assets/images/background/background.png")}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <View style={styles.modalView}>
                    <ThemedText
                        type="modalTitle"
                        style={[
                            styles.modalTitle,
                            { paddingTop: insets.top + 15 },
                        ]}
                    >
                        Bienvenue dans votre&nbsp;calendrier de&nbsp;l'avent
                    </ThemedText>
                    <ScrollView
                        ref={scrollViewRef}
                        style={{ paddingHorizontal: 20 }}
                        // persistentScrollbar={true} // Android only
                    >
                        <FirstLaunch />

                        <MusicPreferences
                            setPlayMusic={setPlayMusic}
                            firstLaunch={true}
                        />

                        <CustomButton
                            onPress={handleStart}
                            style={styles.button}
                        >
                            Commencer l'aventure 🚀
                        </CustomButton>
                    </ScrollView>
                </View>
            </ImageBackground>
        </Modal>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    modalView: {
        flex: 1,
        alignItems: "center",
    },
    modalTitle: { paddingHorizontal: 15, color: Colors.blue },
    button: { marginBottom: 30, backgroundColor: Colors.blue },
});
