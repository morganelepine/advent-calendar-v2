import { StyleSheet, ImageBackground, View } from "react-native";
import { EdgeInsets, SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { Cloudinary } from "@cloudinary/url-gen";
import { daysArray } from "@/data/days_data";
import { AudioPlayer } from "@/components/content/Audio";

const cld = new Cloudinary({
    cloud: {
        cloudName: "deauthz29",
    },
});

interface HomeProps {
    insets: EdgeInsets;
}

export const Home: React.FC<HomeProps> = ({ insets }) => {
    const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
    const today = new Date();
    const todayDay = today.getDate();
    const christmasDay = new Date(today.getFullYear(), 11, 25);
    // console.log({ today });
    // console.log({ christmasDay });

    if (today > christmasDay) {
        christmasDay.setFullYear(christmasDay.getFullYear() + 1);
    }

    const daysToChristmas = Math.ceil(
        (christmasDay.getTime() - today.getTime()) / MILLISECONDS_IN_A_DAY
    );

    const daysMap = new Map(daysArray.map((day) => [day.dayNumber, day]));
    const day = daysMap.get(todayDay);
    let backgroundImage = cld.image(day?.background);

    return (
        <ImageBackground
            source={{ uri: backgroundImage.toURL() }}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                <View
                    style={{
                        position: "absolute",
                        top: insets.top,
                        right: insets.top,
                    }}
                >
                    <AudioPlayer />
                </View>

                <View style={styles.textContainer}>
                    <ThemedText type="homeTitle" style={styles.text1}>
                        {daysToChristmas} nuits
                    </ThemedText>
                    <ThemedText type="homeTitle">avant Noël</ThemedText>
                </View>
            </SafeAreaView>
        </ImageBackground>
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