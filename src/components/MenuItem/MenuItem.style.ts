import { StyleSheet } from "react-native";
import { black, white, yellowNew, darkRed } from "../../theme/Colors";

const CIRCLE_RADIUS = 25;

export const menuItemStyles = StyleSheet.create({
	container: {
		aspectRatio: 0.98,
		padding: 10
	},
	button: {
		width: "100%",
		height: "100%",
		backgroundColor: white,
		borderRadius: 4,
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: "10%",
		paddingBottom: "8%"
	},
	circle: {
		borderRadius: 100,
		width: "58%",
		aspectRatio: 1,
		backgroundColor: yellowNew,
		justifyContent: "center",
		alignItems: "center"
	},
	shadow: {
		shadowColor: black,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.15,
		shadowRadius: 5,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: white
	},
	titleContainer: {
		display: "flex",
		flexDirection: "row",
	},
	badge: {
		position: "relative",
		width: CIRCLE_RADIUS,
		height: CIRCLE_RADIUS,
		borderRadius: CIRCLE_RADIUS,
		backgroundColor: darkRed,
		alignItems: "center",
		justifyContent: "center",
		bottom: 10
	},
	badgeInfo: {
		color: white,
		fontSize: 12,
		fontWeight: "bold"
	}
});
