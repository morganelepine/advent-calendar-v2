import React, { useState } from "react";
import { StyleSheet, Pressable, View, Dimensions } from "react-native";
import { CustomModal } from "@/components/utils/custom/CustomModal";
import { AdvancedImage } from "cloudinary-react-native";
import cld from "@/config/cloudinaryConfig";

interface ImageProps {
    image: string;
}

export const Image: React.FC<ImageProps> = ({ image }) => {
    const { width, height } = Dimensions.get("window");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <View style={styles.gallery}>
                <Pressable onPress={() => setSelectedImage(image)}>
                    <AdvancedImage
                        cldImg={cld.image(image)}
                        resizeMode="cover"
                        style={styles.thumbnail}
                    />
                </Pressable>
            </View>

            <CustomModal
                visible={!!selectedImage}
                onRequestClose={() => setSelectedImage(null)}
            >
                <View style={styles.modalContainer}>
                    <Pressable onPress={() => setSelectedImage(null)}>
                        {selectedImage && (
                            <AdvancedImage
                                cldImg={cld.image(selectedImage)}
                                resizeMode="contain"
                                style={{
                                    height: height,
                                    width: width,
                                }}
                            />
                        )}
                    </Pressable>
                </View>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    gallery: {
        marginRight: 10,
        marginBottom: 15,
    },
    thumbnail: {
        width: 150,
        height: 210,
        borderRadius: 5,
        margin: 2,
    },
});
