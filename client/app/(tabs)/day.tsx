import { StyleSheet } from "react-native";
import { Day } from "@/components/days/Content/Day";

interface Content {
    id: number;
    type: "quote" | "anecdote" | "recipe" | "idea" | "game";
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    content5: string;
}

export default function DayScreen() {
    return <Day />;
}

const styles = StyleSheet.create({});
