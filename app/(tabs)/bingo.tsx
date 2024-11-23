import { useState } from "react";
import { Animated, ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BingoCell } from "@/components/bingo/BingoCell";
import { BingoHeader } from "@/components/bingo/BingoHeader";
import { bingo } from "@/data/bingo";
import cld from "@/config/cloudinaryConfig";

export default function BingoScreen() {
    const shuffled = bingo.sort(() => Math.random() - 0.5);
    const [bingoGrid, setBingoGrid] = useState(bingo.slice(0, 15));
    const [clickedCells, setClickedCells] = useState(new Set());

    const [fadeAnim] = useState(new Animated.Value(1));

    const generateBingoGrid = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.8, // opaciy
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setClickedCells(new Set());
            setBingoGrid(shuffled.slice(0, 15));
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });
    };

    const handleCellClick = (cell: number) => {
        setClickedCells((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(cell)) {
                newSet.delete(cell);
            } else {
                newSet.add(cell);
            }
            return newSet;
        });
    };

    return (
        <ImageBackground
            source={{ uri: cld.image("sapin_fnbne4").toURL() }}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <SafeAreaView style={styles.safeArea}>
                <LinearGradient
                    colors={["rgba(11, 46, 37, 0.8)", "rgba(0, 0, 0, 0)"]}
                    style={styles.gradientOverlay}
                />

                <BingoHeader generateBingoGrid={generateBingoGrid} />

                <View style={styles.bingoContainer}>
                    {bingoGrid.map((cell) => (
                        <BingoCell
                            key={cell.id}
                            cell={cell}
                            isClicked={clickedCells.has(cell.id)}
                            onClick={handleCellClick}
                        />
                    ))}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: 300,
    },
    safeArea: {
        flex: 1,
    },
    bingoContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-between",
        gap: 5,
        margin: 20,
    },
});
