import * as Location from 'expo-location'; // GPS Tool
import * as SMS from 'expo-sms'; // SMS Tool
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';

export default function HomeScreen() {
  const [status, setStatus] = useState('SAFE');

  const handlePress = async () => {
    // 1. Vibrate immediately
    Vibration.vibrate();
    setStatus('LOCATING...');

    // 2. Ask for Permission to use GPS
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
       Alert.alert("Permission denied", "We need location access to save you!");
       setStatus('SAFE');
       return;
    }

    // 3. Get the actual Location
    let location = await Location.getCurrentPositionAsync({});
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${location.coords.latitude},${location.coords.longitude}`;

    setStatus('SENDING HELP...');

    // 4. Open the SMS App with the message pre-filled
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      await SMS.sendSMSAsync(
        ['100'], // We will add real contacts here later
        `SOS! I am in danger. Track me here: ${mapLink}`
      );
      setStatus('SOS SENT!');
    } else {
      Alert.alert("Error", "SMS is not available on this device");
      setStatus('FAILED');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FEARLESS AND FREE</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.sosButton} onPress={handlePress}>
          <Text style={styles.buttonText}>SOS</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.status}>STATUS: {status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c1c1e', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 50 },
  buttonContainer: { elevation: 10, shadowColor: '#ff0000', shadowOpacity: 0.5, shadowRadius: 20 },
  sosButton: { width: 220, height: 220, borderRadius: 110, backgroundColor: '#ff0000', alignItems: 'center', justifyContent: 'center', borderWidth: 5, borderColor: '#ff6666' },
  buttonText: { color: '#fff', fontSize: 40, fontWeight: '900' },
  status: { marginTop: 40, color: '#00ff00', fontSize: 18, fontWeight: 'bold' }
});