import { StyleSheet, View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Snowfall } from "@/components/utils/Snow";
import { Colors } from "@/constants/Colors";

export const Day25Lost = () => {
    return (
        <>
            <Snowfall count={200} />

            <View style={{ maxWidth: 250 }}>
                <ThemedText style={styles.title}>Dommage 😔</ThemedText>
                <ThemedText style={styles.text}>
                    Vous n'avez pas atteint les 2512 points requis pour accéder
                    à la surprise...
                </ThemedText>
                <ThemedText style={styles.text}>
                    J'espère tout de même que l'application vous aura plu.
                </ThemedText>
                <ThemedText style={styles.text}>
                    Retentez votre chance l'année prochaine !
                </ThemedText>
                <Image
                    source={{
                        uri: "https://media.giphy.com/media/3o6wrywE9d1SJNd0wU/giphy.gif",
                    }}
                    style={styles.gif}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: "PallyBold",
        fontSize: 30,
        textAlign: "left",
        letterSpacing: 2,
        color: Colors.snow,
        paddingBottom: 20,
    },
    text: { color: Colors.snow, paddingBottom: 20, textAlign: "left" },
    gif: {
        width: 250,
        height: 250,
        alignSelf: "center",
    },
});
