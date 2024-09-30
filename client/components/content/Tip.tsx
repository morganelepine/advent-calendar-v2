import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface ContentProps {
    content: {
        id: number;
        type: string;
        urlContent: string;
        textContent: string;
    };
}

export const Tip: React.FC<ContentProps> = ({ content }) => {
    return (
        <View>
            <View style={styles.background}></View>
            <ThemedText type="subtitle" style={styles.text}>
                L'origine des crackers de Noël
            </ThemedText>
            <ThemedText style={styles.text}>
                Les crackers de Noël, ces tubes en papier qui font un "pop"
                lorsqu'on les ouvre, sont une invention anglaise du 19ème
                siècle. Thomas J. Smith, un confiseur, cherchait à populariser
                ses bonbons en les emballant dans du papier festif. Inspiré par
                le bruit du bois qui craque dans la cheminée, il a eu l'idée
                d'ajouter un petit mécanisme explosif pour un effet surprise.
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject, // Remplit tout l'espace du parent
        backgroundColor: "white",
        opacity: 0.15,
        borderRadius: 5,
    },
    text: { color: "white", padding: 10 },
});
