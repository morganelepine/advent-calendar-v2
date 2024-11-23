import { Pressable, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Bingo } from "@/interfaces/bingoInterface";
import cld from "@/config/cloudinaryConfig";
import { AdvancedImage } from "cloudinary-react-native";

interface BingoCellProps {
    cell: Bingo;
    isClicked: boolean;
    onClick: (id: number) => void;
}

export const BingoCell: React.FC<BingoCellProps> = ({
    cell,
    isClicked,
    onClick,
}) => {
    return (
        <Pressable
            style={[
                styles.cell,
                {
                    backgroundColor: isClicked ? Colors.red : Colors.green,
                },
            ]}
            onPress={() => onClick(cell.id)}
        >
            <AdvancedImage
                cldImg={cld.image(cell.image)}
                style={[
                    styles.itemBackground,
                    {
                        backgroundColor: isClicked ? Colors.red : Colors.green,
                        opacity: isClicked ? 0.8 : 1,
                    },
                ]}
                resizeMode="contain"
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    cell: {
        height: "18%",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        padding: 4,
    },
    itemBackground: {
        width: "100%",
        height: undefined,
        aspectRatio: 1,
        borderRadius: 5,
    },
    cellText: {
        color: Colors.snow,
        fontSize: 14,
    },
});
