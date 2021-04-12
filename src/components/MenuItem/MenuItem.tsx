import React from "react";
import { StyleProp, View, ViewStyle, Text, Image, TouchableOpacity } from "react-native";
import { menuItemStyles } from "./MenuItem.style";
import { StyleSheet } from "react-native";

export const CALL_ICON = require("../../theme/images/phone-call.png");
export const REPORT_ICON = require("../../theme/images/report.png");
export const USER_ICON = require("../../theme/images/profile.png");
export const CONTACT_ICON = require("../../theme/images/contacts.png");

export type MenuItemIcon =
	| "call"
	| "report"
	| "user"
	| "contact";

interface Props {
	icon: MenuItemIcon;
	title: string;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
}

function getIconByType(type: MenuItemIcon) {
	switch (type) {
		case "call":
			return CALL_ICON;
		case "report":
			return REPORT_ICON;
		case "user":
			return USER_ICON;
		case "contact":
			return CONTACT_ICON;
		default:
			throw new Error("Invalid icon type: " + type);
	}
}

const MenuItem: React.FC<Props> = ({ icon, title, style, badgeInfo, onPress }) => {
	const Icon = getIconByType(icon);

	return (
		<TouchableOpacity onPress={onPress} style={[menuItemStyles.container, style]}>
				<View style={menuItemStyles.shadow}>
					<View
						style={menuItemStyles.button}
					>
						<View style={menuItemStyles.circle}>
							<Image source={Icon} style={styleForType.imgStyle} />
						</View>

						<View style={menuItemStyles.titleContainer}>
							<Text weigth="semibold">{title}</Text>
						</View>
					</View>
				</View>
		</TouchableOpacity>

	);
};

export default MenuItem;

export const styleForType = StyleSheet.create({
	imgStyle: {
		width: 100,
		height: 100
	}
});
