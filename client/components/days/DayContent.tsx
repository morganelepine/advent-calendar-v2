import { StyleSheet, View } from "react-native";
import { Idea } from "@/components/content/Idea";
import { Quote } from "@/components/content/Quote";
import { Recipe } from "@/components/content/Recipe";
import { Anecdote } from "@/components/content/Anecdote";
import { Game } from "@/components/content/Game";

interface DayContentProps {
    content: {
        id: number;
        type: "quote" | "recipe" | "anecdote" | "idea" | "game";
        title: string;
        content1: string;
        content2: string;
        content3: string;
        content4: string;
    };
}

export const DayContent: React.FC<DayContentProps> = ({ content }) => {
    const getWidthValue = (type: string) => {
        switch (type) {
            case "quote":
                return "100%";
            case "anecdote":
                return "45%";
            case "recipe":
                return "55%";
            case "idea":
                return "60%";
            case "game":
                return "40%";
        }
    };

    return (
        <View
            style={[
                styles.contentContainer,
                { width: getWidthValue(content.type) },
            ]}
        >
            {/* QUOTE */}
            {content.type === "quote" && <Quote content={content} />}

            {/* TIP */}
            {content.type === "anecdote" && <Anecdote content={content} />}

            {/* GAME */}
            {content.type === "game" && <Game content={content} />}

            {/* VIDEO */}
            {content.type === "idea" && <Idea content={content} />}

            {/* RECIPE */}
            {content.type === "recipe" && <Recipe content={content} />}
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        height: "33%",
        padding: 5,
    },
});
