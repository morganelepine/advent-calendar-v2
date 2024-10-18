import { StyleSheet, View, Text, Pressable } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";

type IconProps = {
    color: string;
};

export const TabBar = ({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) => {
    const icon: { [key: string]: (props: IconProps) => JSX.Element } = {
        index: (props) => (
            <TabBarIcon name="sparkles-outline" color={props.color} />
        ),
        calendar: (props) => (
            <TabBarIcon name="gift-outline" color={props.color} />
        ),
        score: (props) => (
            <TabBarIcon name="game-controller-outline" color={props.color} />
        ),
        informations: (props) => (
            <TabBarIcon name="snow-outline" color={props.color} />
        ),
        day: (props) => (
            <TabBarIcon name="calendar-outline" color={props.color} />
        ),
    };

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel ?? options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <>
                        {route.name !== "day" && (
                            <Pressable
                                key={route.name}
                                accessibilityRole="button"
                                accessibilityState={
                                    isFocused ? { selected: true } : {}
                                }
                                accessibilityLabel={
                                    options.tabBarAccessibilityLabel
                                }
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{ flex: 1 }}
                            >
                                <View style={styles.tab}>
                                    {icon[route.name]({
                                        color: isFocused
                                            ? Colors.green
                                            : "grey",
                                    })}
                                    <Text
                                        style={[
                                            styles.label,
                                            {
                                                color: isFocused
                                                    ? Colors.green
                                                    : "grey",
                                            },
                                        ]}
                                    >
                                        {label}
                                    </Text>
                                </View>
                            </Pressable>
                        )}
                    </>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 6,
        marginHorizontal: 15,
        backgroundColor: Colors.snow,
        borderRadius: 50,
        shadowColor: "#000",
        elevation: 2,
    },
    tab: {
        alignItems: "center",
        gap: 5,
    },
    label: {
        fontFamily: "Poppins",
        fontSize: 11,
    },
});
