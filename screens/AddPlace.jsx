import { View, StyleSheet, Text } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }) => {
	const createPlaceHandler = async (place) => {
		await insertPlace(place);
		navigation.navigate("AllPlaces");
	};

	return (
		<View>
			<PlaceForm onCreatePlace={createPlaceHandler} />
		</View>
	);
};

const styles = StyleSheet.create({});

export default AddPlace;
