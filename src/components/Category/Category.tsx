import React from "react";
import { StyleProp, View, ViewStyle, Text, Image, TouchableOpacity } from "react-native";
import { categoryStyles } from "./Category.style";
import { StyleSheet } from "react-native";

export const CARDIO_ICON = require("../../theme/images/cardio.png");
export const DERMATO_ICON = require("../../theme/images/dermato.png");
export const EMERGENCY_ICON = require("../../theme/images/emergency.png");
export const NEPHRO_ICON = require("../../theme/images/nephro.png");

export type CategoryTypes =
	| "cardio"
	| "dermato"
	| "emergency"
	| "nephro";

interface Props {
	icon: CategoryTypes;
	title: string;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
}

function getIconByType(type: CategoryTypes) {
	switch (type) {
		case "cardio":
			return CARDIO_ICON;
		case "dermato":
			return DERMATO_ICON;
		case "emergency":
			return EMERGENCY_ICON;
		case "nephro":
			return NEPHRO_ICON;
		default:
			throw new Error("Invalid icon type: " + type);
	}
}

const Category: React.FC<Props> = ({ icon, title, style, onPress }) => {
	const Icon = getIconByType(icon);

	return (
		<TouchableOpacity onPress={onPress} style={[categoryStyles.container, style]}>
			<View>
				<View
					style={categoryStyles.button}
				>
					<View style={categoryStyles.circle}>
						<Image source={Icon} style={styleForType.imgStyle} />
					</View>

					<View style={categoryStyles.titleContainer}>
						<Text weigth="semibold" style={styleForType.title}>{title}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>

	);
};

export default Category;

export const styleForType = StyleSheet.create({
	imgStyle: {
		width: 80,
		height: 80
	},
	title: {
		fontSize: 15,
		textAlign: 'center',
		marginTop: 20
	  },
});
