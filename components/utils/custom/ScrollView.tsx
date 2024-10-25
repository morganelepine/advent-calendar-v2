import React from "react";
import { StyleSheet, ScrollView } from "react-native";

interface CustomScrollViewProps {
    children?: React.ReactNode;
}

export const CustomScrollView: React.FC<CustomScrollViewProps> = ({
    children,
}) => {
    return (
        <ScrollView
            persistentScrollbar={true} // Android only
            style={styles.container}
        >
            {children}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
});
