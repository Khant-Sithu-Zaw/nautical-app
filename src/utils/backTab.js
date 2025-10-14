 export const screenOptions = ({ navigation }) => ({
        headerStyle: { backgroundColor: "#3C78AD" },
        headerTintColor: "#fff",
        animation: "slide_from_left",
        headerBackVisible: false,
        headerBackTitleVisible: true,

        headerLeft: () => customHeaderLeft(navigation),
    });