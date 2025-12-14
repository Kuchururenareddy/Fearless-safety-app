import * as Location from 'expo-location';

// Function to get current location
export const getCurrentLocation = async () => {
  try {
    // 1. Ask for permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      console.log("Permission to access location was denied");
      return null;
    }

    // 2. Get the actual GPS data
    let location = await Location.getCurrentPositionAsync({});
    
    // 3. Format it nicely (e.g., "17.3850, 78.4867")
    const { latitude, longitude } = location.coords;
    return `${latitude}, ${longitude}`;

  } catch (error) {
    console.error("Error getting location:", error);
    return "Unknown Location";
  }
};