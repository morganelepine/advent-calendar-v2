import { StyleSheet, ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { MenuButton } from "@/components/navigation/MenuButton";
import { getDayImage } from "@/services/day.service";
import { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
    cloud: {
        cloudName: "deauthz29",
    },
});

export const Home = () => {
    const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
    const today = new Date();

    let christmasDay = new Date(today.getFullYear(), 11, 25);
    // Check if Christmas has already passed
    if (today > christmasDay) {
        christmasDay.setFullYear(christmasDay.getFullYear() + 1);
    }

    const daysToChristmas = Math.ceil(
        (christmasDay.getTime() - today.getTime()) / MILLISECONDS_IN_A_DAY
    );

    // console.log({ today });
    // console.log({ christmasDay });

    const [image, setImage] = useState<string>();
    const [isImageReady, setIsImageReady] = useState<boolean>(false);
    useEffect(() => {
        const retrieveDayImage = async () => {
            const dayImage = await getDayImage(today.getDate());
            setImage(dayImage);
            setIsImageReady(true);
        };
        retrieveDayImage();
    }, [image]);

    let backgroundImage = cld.image(image);

    return (
        <>
            {isImageReady && (
                <ImageBackground
                    source={{ uri: backgroundImage.toURL() }}
                    style={styles.background}
                    resizeMode="cover"
                >
                    <SafeAreaView style={styles.safeArea}>
                        <MenuButton />

                        <View style={styles.textContainer}>
                            <ThemedText type="homeTitle" style={styles.text1}>
                                {daysToChristmas} nuits
                            </ThemedText>
                            <ThemedText type="homeTitle">avant Noël</ThemedText>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    safeArea: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    textContainer: {
        marginBottom: 180,
    },
    text1: {
        letterSpacing: 8,
    },
});
