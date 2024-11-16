import { StyleSheet, ImageBackground, View } from "react-native";
import { EdgeInsets, SafeAreaView } from "react-native-safe-area-context";
import { daysArray } from "@/data/days_data";
import { ThemedText } from "@/components/ThemedText";
import { Snowfall } from "@/components/utils/Snow";
import { AudioPlayer } from "@/components/content/Audio";
import { Colors } from "@/constants/Colors";
import cld from "@/config/cloudinaryConfig";

interface HomeProps {
    insets: EdgeInsets;
}

export const Home: React.FC<HomeProps> = ({ insets }) => {
    const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
    const today = new Date();
    const todayDay = today.getDate();
    const christmasDay = new Date(today.getFullYear(), 11, 25);
    const calendarDay = new Date(today.getFullYear(), 11, 1);
    // console.log({ today });
    // console.log({ christmasDay });

    if (today > christmasDay) {
        christmasDay.setFullYear(christmasDay.getFullYear() + 1);
    }

    const daysToChristmas = Math.ceil(
        (christmasDay.getTime() - today.getTime()) / MILLISECONDS_IN_A_DAY
    );
    const daysToCalendar = Math.ceil(
        (calendarDay.getTime() - today.getTime()) / MILLISECONDS_IN_A_DAY
    );

    const daysMap = new Map(daysArray.map((day) => [day.dayNumber, day]));
    const day = daysMap.get(todayDay);

    const backgroundImage = day
        ? cld.image(day?.background)
        : cld.image("image6_ccgiqd");

    const music = day
        ? day?.music
        : "https://res.cloudinary.com/deauthz29/video/upload/v1730978205/we-wish-you-a-merry-christmas_fcqhsn.mp3";

    return (
        <ImageBackground
            // source={require("@/assets/images/4.jpeg")}
            source={{ uri: backgroundImage.toURL() }}
            style={styles.background}
            resizeMode="cover"
        >
            <Snowfall count={100} />

            <SafeAreaView style={styles.safeArea}>
                <View
                    style={{
                        position: "absolute",
                        top: insets.top,
                        right: insets.right,
                    }}
                >
                    <AudioPlayer music={music} />
                </View>

                <View style={styles.textContainer}>
                    <ThemedText type="homeTitle" style={styles.text1}>
                        {daysToChristmas} nuits
                    </ThemedText>
                    <ThemedText type="homeTitle"> avant Noël</ThemedText>
                    {daysToCalendar > 0 && (
                        <ThemedText style={styles.text2}>
                            (et {daysToCalendar} avant le départ du calendrier)
                        </ThemedText>
                    )}
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
        marginBottom: 220,
        flexDirection: "column",
    },
    text1: {
        letterSpacing: 8,
    },
    text2: {
        paddingTop: 20,
        color: Colors.snow,
        fontSize: 14,
    },
});
