import { View, StyleSheet, Alert, Image, Text } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { Colors } from "../../constants/colors";
import {
	useNavigation,
	useRoute,
	useIsFocused,
} from "@react-navigation/native";

import {
	getCurrentPositionAsync,
	useForegroundPermissions,
	PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";

const LocationPicker = ({ onPickLocation }) => {
	const [pickedLocation, setPickedLocation] = useState();
	const isFocused = useIsFocused();

	const navigation = useNavigation();
	const route = useRoute();

	const [locationPermissionInformation, requestPermission] =
		useForegroundPermissions();

	useEffect(() => {
		if (isFocused && route.params) {
			const mapPickedLocation = {
				lat: route.params.pickedLat,
				lng: route.params.pickedLng,
			};
			setPickedLocation(mapPickedLocation);
		}
	}, [route, isFocused]);

	useEffect(() => {
		const handleLocation = async () => {
			if (pickedLocation) {
				const address = await getAddress(
					pickedLocation.lat,
					pickedLocation.lng
				);
				onPickLocation({ ...pickedLocation, address });
			}
		};

		handleLocation();
	}, [pickedLocation, onPickLocation]);

	const verifyPermissions = async () => {
		if (
			locationPermissionInformation.status === PermissionStatus.UNDETERMINED
		) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		if (locationPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient permissions!",
				"You need to grant location permissions to use this app."
			);
			return false;
		}

		return true;
	};

	const getLocationHandler = async () => {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) return;

		const location = await getCurrentPositionAsync();
		setPickedLocation({
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		});
	};

	const pickOnMapHandler = () => {
		navigation.navigate("Map");
	};

	let locationPreview = <Text>No location picked yet.</Text>;

	if (pickedLocation) {
		locationPreview = (
			<Image
				style={styles.mapPreviewImage}
				source={{
					uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
				}}
			/>
		);
	}

	return (
		<View>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.actions}>
				<OutlineButton icon="location" onPress={getLocationHandler}>
					Locate User
				</OutlineButton>
				<OutlineButton icon="map" onPress={pickOnMapHandler}>
					Pick onMap
				</OutlineButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mapPreview: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primary100,
		borderRadius: 4,
		overflow: "hidden",
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		margin: 10,
	},
	mapPreviewImage: {
		width: "100%",
		height: "100%",
	},
});

export default LocationPicker;
