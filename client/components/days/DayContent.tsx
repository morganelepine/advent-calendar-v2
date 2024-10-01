import { StyleSheet, View } from "react-native";
import { Video } from "@/components/content/Video";
import { Quote } from "@/components/content/Quote";
import { Recipe } from "@/components/content/Recipe";
import { Tip } from "@/components/content/Tip";
import { Game } from "@/components/content/Game";

interface DayContentProps {
    content: {
        id: number;
        type: "quote" | "recipe" | "tip" | "video" | "game";
        title: string;
        content: string;
    };
}

export const DayContent: React.FC<DayContentProps> = ({ content }) => {
    const getWidthValue = (type: string) => {
        switch (type) {
            case "quote":
                return "100%";
            case "tip":
                return "45%";
            case "recipe":
                return "55%";
            case "video":
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
            {content.type === "tip" && <Tip content={content} />}

            {/* GAME */}
            {content.type === "game" && <Game content={content} />}

            {/* VIDEO */}
            {content.type === "video" && <Video content={content} />}

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
