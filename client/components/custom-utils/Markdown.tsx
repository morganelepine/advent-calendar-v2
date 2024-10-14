import { StyleSheet, TextStyle } from "react-native";
import Markdown from "react-native-markdown-display";

interface CustomMarkdownProps {
    children?: React.ReactNode;
    style?: TextStyle; //React.CSSProperties
}

export const CustomMarkdown: React.FC<CustomMarkdownProps> = ({
    children,
    style = {},
}) => {
    return (
        <Markdown
            style={{
                body: { ...styles.body, ...style } as TextStyle,
            }}
        >
            {children}
        </Markdown>
    );
};

const styles = StyleSheet.create({
    body: {
        color: "#165d4b",
        textAlign: "center",
        fontFamily: "Poppins",
        fontSize: 16,
    },
});
