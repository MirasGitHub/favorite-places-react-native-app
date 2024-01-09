import { ActivityIndicator, StyleSheet } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";
import { Colors } from "../constants/colors";

const AllPlaces = () => {
	const [loadedPlaces, setLoadedPlaces] = useState([]);

	const isFocused = useIsFocused();

	useEffect(() => {
		async function loadPlaces() {
			try {
				const places = await fetchPlaces();
				setLoadedPlaces(places);
			} catch (e) {
				console.log(e);
			}
		}

		if (isFocused) {
			loadPlaces();
		}
	}, [isFocused]);

	if (!loadedPlaces) {
		return <ActivityIndicator size="large" color={Colors.primary200} />;
	}

	return <PlacesList places={loadedPlaces} />;
};

const styles = StyleSheet.create({});

export default AllPlaces;
