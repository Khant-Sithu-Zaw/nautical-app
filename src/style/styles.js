import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: "#1E3D59", // deep sea blue
        justifyContent: "",
        alignItems: "center",
        paddingVertical: 30,
    },
    homeTitle: {
        fontSize: 26,
        marginBottom: 30,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#e6f7ff"
    },
    innerColumn: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",

        alignItems: "center",
        marginBottom: 10,
        width: "100%",
        fontSize: 14
    },
    innerLeft: {
        width: "45%",

    },
    innerRight: {
        width: "55%"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10
    },
    label: {
        fontSize: 16,
        marginBottom: 15,
        fontWeight: "600",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginVertical: 5
    },
    result: { paddingLeft: 10 },
    screenButton: {
        backgroundColor: "#4DA8DA", // lighter ocean blue
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 12,
        marginVertical: 10,
        width: "85%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    button: {
        backgroundColor: "#0077b6",
        padding: 12,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: "center"
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    txt: {
        marginTop: 20,
        display: "flex",
        fontWeight: "900",

    },
    fact: {
        fontStyle: "italic",
        color: "#555",
        fontWeight: "800"
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    timeInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        width: 60,
        textAlign: "center"
    },
});

export default styles;
