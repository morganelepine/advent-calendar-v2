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

export const Quote: React.FC<ContentProps> = ({ content }) => {
    return (
        <View>
            <ThemedText>{content.textContent}</ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({});
