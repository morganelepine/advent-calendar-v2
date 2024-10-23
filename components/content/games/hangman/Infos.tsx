import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface InfosProps {
    currentWordIndex: number;
    words: string[];
    mistakes: number;
    maxTries: number;
}

export const Infos: React.FC<InfosProps> = ({
    currentWordIndex,
    words,
    mistakes,
    maxTries,
}) => {
    return (
        <View style={styles.infos}>
            <ThemedText style={styles.info}>
                Mot n°{currentWordIndex + 1}/{words.length}
            </ThemedText>

            <ThemedText style={styles.info}>
                {mistakes} / {maxTries} erreurs
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    infos: {
        marginTop: 5,
        marginBottom: 20,
    },
    info: {
        fontSize: 16,
    },
});
