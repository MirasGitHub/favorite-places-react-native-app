import { useCallback, useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	TextInput,
	Alert,
} from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";

const PlaceForm = ({ onCreatePlace }) => {
	const [enteredTitle, setEnteredTitle] = useState("");
	const [selectedImage, setSelectedImage] = useState();
	const [pickedLocation, setPickedLocation] = useState();

	const handleChangeTitle = (enteredText) => {
		setEnteredTitle(enteredText);
	};

	const handleTakeImage = (imageUri) => {
		setSelectedImage(imageUri);
	};

	const handlePickLocation = useCallback((location) => {
		setPickedLocation(location);
	}, []);

	const savePlaceHandler = () => {
		if (!enteredTitle || !selectedImage || !pickedLocation) {
			Alert.alert("Invalid data!", "Please fill up all the fields.");
			return;
		}

		const placeData = new Place(enteredTitle, selectedImage, pickedLocation);

		onCreatePlace(placeData);
	};

	return (
		<ScrollView style={styles.form}>
			<View>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.input}
					onChangeText={handleChangeTitle}
					value={enteredTitle}
				/>
			</View>

			<ImagePicker onTakeImage={handleTakeImage} />

			<LocationPicker onPickLocation={handlePickLocation} />

			<Button onPress={savePlaceHandler}>Add Place</Button>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	form: {
		padding: 24,
	},
	label: {
		fontWeight: "bold",
		marginBottom: 4,
		color: Colors.primary500,
		fontSize: 18,
	},
	input: {
		marginVertical: 8,
		paddingHorizontal: 4,
		paddingVertical: 8,
		fontSize: 16,
		borderBottomWidth: 2,
		borderBottomColor: Colors.primary700,
		backgroundColor: Colors.primary100,
	},
});

export default PlaceForm;
