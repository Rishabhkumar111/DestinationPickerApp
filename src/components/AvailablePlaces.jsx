import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Errors from "./Errors.jsx";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await fetch("http://localhost:3000/places");
        if (!response.ok) {
          console.log("bhai");
          throw new Error("Failed to fetch places");
        }
        const resData = await response.json();

        navigator.geolocation.getCurrentPosition((pos) => {
          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            pos.coords.latitude,
            pos.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
        });
      } catch (error) {
        setError({ message: error.message || "something went wrong" });
      }
    }
    fetchPlaces();
  }, []);
  if (error) {
    return <Errors title="An error occur" message={error.message} />;
  }
  const isLoading = availablePlaces.length === 0;
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Fetching data ......"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
