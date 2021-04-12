import { StyleSheet } from "react-native";
import { black, white, yellowNew, darkRed } from "../../theme/Colors";

const CIRCLE_RADIUS = 25;

export const categoryStyles = StyleSheet.create({
	container: {
		aspectRatio: 0.98,
		padding: 10
	},
	button: {
		width: "100%",
		height: "100%",
		borderRadius: 4,
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: "10%",
		paddingBottom: "8%",
		backgroundColor: "transparent",
	},
	circle: {
		borderRadius: 100,
		width: "70%",
		aspectRatio: 1,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: black,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.15,
		shadowRadius: 5,
		elevation: 3,
		backgroundColor: white
	},
	titleContainer: {
		display: "flex",
		flexDirection: "row",
	}
});
