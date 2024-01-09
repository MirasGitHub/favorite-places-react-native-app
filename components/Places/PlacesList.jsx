import {
	View,
	StyleSheet,
	FlatList,
	Text,
	ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

const PlacesList = ({ places }) => {
	const navigation = useNavigation();

	const selectPlaceHandler = (id) => {
		navigation.navigate("PlaceDetails", {
			placeId: id,
		});
	};

	if (!places || places.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>
					No places added yet - start adding some!
				</Text>
			</View>
		);
	}

	const renderPlace = ({ item }) => (
		<PlaceItem place={item} onSelect={selectPlaceHandler} />
	);

	return (
		<View>
			<FlatList
				style={styles.list}
				data={places}
				keyExtractor={(item) => item.id}
				renderItem={renderPlace}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	list: {
		margin: 24,
	},
	fallbackContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	fallbackText: {
		fontSize: 16,
		color: Colors.primary200,
	},
});

export default PlacesList;
