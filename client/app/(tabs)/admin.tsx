import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SparkleWave } from "@/components/SparkleWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";

type FormValues = {
    dayId: number;
    type: "quote" | "anecdote" | "recipe" | "idea" | "game";
    title: string;
    content: string;
    urlContent: string;
};

const schema = Yup.object().shape({
    dayId: Yup.number()
        .required("Le jour est requis")
        .min(1)
        .max(24, "Le jour doit être entre 1 et 24"),
    type: Yup.string()
        .required("Le type est requis")
        .oneOf(["quote", "anecdote", "recipe", "idea", "game"]),
    title: Yup.string().required("Le titre est requis"),
    content: Yup.string().required("Le contenu est requis"),
    urlContent: Yup.string().url("L'URL doit être valide"),
});

export default function AdminScreen() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema) as Resolver<FormValues>,
        defaultValues: {
            dayId: 1,
            type: "quote",
            title: "",
            content: "",
            urlContent: "",
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
        Alert.alert("Contenu ajouté", JSON.stringify(data));
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
            headerImage={
                <Image
                    source={require("@/assets/images/sparkle.jpg")}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Ajouter du contenu</ThemedText>
                <SparkleWave />
            </ThemedView>

            <ScrollView contentContainerStyle={styles.formContainer}>
                <View style={styles.pickerContainer}>
                    {/* DAY ID */}
                    <Controller
                        control={control}
                        name="dayId"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Picker
                                selectedValue={value}
                                onValueChange={(itemValue) =>
                                    onChange(Number(itemValue))
                                }
                                onBlur={onBlur}
                                style={styles.picker}
                            >
                                <Picker.Item
                                    label="Sélectionner un jour"
                                    value={value || 1}
                                />
                                {[...Array(24).keys()].map((i) => (
                                    <Picker.Item
                                        key={i + 1}
                                        label={`${i + 1}`}
                                        value={i + 1}
                                    />
                                ))}
                            </Picker>
                        )}
                    />
                    {errors.dayId && (
                        <Text style={styles.errorText}>
                            {errors.dayId.message}
                        </Text>
                    )}

                    {/* TYPE */}
                    <Controller
                        control={control}
                        name="type"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Picker
                                selectedValue={value}
                                onValueChange={onChange}
                                onBlur={onBlur}
                                style={styles.picker}
                            >
                                <Picker.Item
                                    label="Sélectionner un type"
                                    value={value || "quote"}
                                />
                                <Picker.Item label="Citation" value="quote" />
                                <Picker.Item label="Astuce" value="anecdote" />
                                <Picker.Item label="Recette" value="recipe" />
                                <Picker.Item label="Idées" value="idea" />
                                <Picker.Item label="Jeu" value="game" />
                            </Picker>
                        )}
                    />
                    {errors.type && (
                        <Text style={styles.errorText}>
                            {errors.type.message}
                        </Text>
                    )}
                </View>

                {/* TITLE */}
                <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Titre"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            style={styles.input}
                        />
                    )}
                />
                {errors.title && (
                    <Text style={styles.errorText}>{errors.title.message}</Text>
                )}

                {/* CONTENT */}
                <Controller
                    control={control}
                    name="content"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Contenu"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            style={styles.input}
                            multiline
                            numberOfLines={4}
                        />
                    )}
                />
                {errors.content && (
                    <Text style={styles.errorText}>
                        {errors.content.message}
                    </Text>
                )}

                {/* URL CONTENT */}
                <Controller
                    control={control}
                    name="urlContent"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="URL du contenu"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            style={styles.input}
                        />
                    )}
                />
                {errors.urlContent && (
                    <Text style={styles.errorText}>
                        {errors.urlContent.message}
                    </Text>
                )}

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit(onSubmit)}
                >
                    <ThemedText style={styles.buttonText}>
                        Ajouter le contenu
                    </ThemedText>
                </TouchableOpacity>
            </ScrollView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: "100%",
        width: "100%",
    },
    titleContainer: {
        flexDirection: "row",
        marginBottom: 10,
        padding: 5,
    },
    formContainer: {
        padding: 5,
    },
    input: {
        height: 40,
        borderColor: "#136F63",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#FFFFFF",
    },
    pickerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    picker: {
        height: 40,
        width: "45%",
        borderColor: "#136F63",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "#FFFFFF",
    },
    submitButton: {
        backgroundColor: "#136F63",
        borderRadius: 8,
        padding: 12,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#FFFFFF",
    },
    errorText: {
        color: "#95192E",
        marginBottom: 10,
        marginTop: -5,
    },
});
