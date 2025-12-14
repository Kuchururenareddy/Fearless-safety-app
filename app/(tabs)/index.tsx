import AsyncStorage from '@react-native-async-storage/async-storage'; // Memory Tool
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors'; // Shake Tool
import * as SMS from 'expo-sms';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';

export default function HomeScreen() {
  const [status, setStatus] = useState('SAFE');
  
  // 1. Shake Detection Logic
  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    const subscription = Accelerometer.addListener(data => {
      const totalForce = Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z);
      if (totalForce > 2.5) { // If shaken hard (Threshold 2.5G)
        handlePress(); // Trigger SOS automatically!
      }
    });
    return () => subscription.remove();
  }, []);

  const handlePress = async () => {
    Vibration.vibrate(1000); // Long vibration
    setStatus('LOCATING...');

    // 2. Get Location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
       Alert.alert("Permission denied");
       return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const mapLink = `http://googleusercontent.com/maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;

    // 3. Get Saved Contacts to SMS
    const storedContacts = await AsyncStorage.getItem('emergency_contacts');
    const contacts = storedContacts ? JSON.parse(storedContacts) : [];
    const phoneNumbers = contacts.map(c => c.phone); // Get just the numbers

    if (phoneNumbers.length === 0) {
      Alert.alert("No Contacts!", "Go to the 'Guardians' tab to add numbers.");
      setStatus('SAFE');
      return; 
    }

    setStatus('SENDING HELP...');

    // 4. Send to Server (Member 3's Backend)
    // IMPORTANT: You must change 'YOUR_LAPTOP_IP' to your actual IP (e.g., 192.168.1.5)
    try {
        await fetch('http://192.168.1.5:3000/api/sos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                location: mapLink,
                contacts: phoneNumbers
            })
        });
        console.log("Sent to Server");
    } catch (e) {
        console.log("Server offline (Offline Mode Active)");
    }

    // 5. Send SMS
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      await SMS.sendSMSAsync(
        phoneNumbers, 
        `SOS! I need help. Location: ${mapLink}`
      );
      setStatus('SOS SENT!');
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

      <Text style={[styles.status, { color: status === 'SAFE' ? '#00ff00' : '#ff0000' }]}>
        STATUS: {status}
      </Text>
      <Text style={styles.hint}>Shake phone to trigger SOS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c1c1e', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 50 },
  buttonContainer: { elevation: 10, shadowColor: '#ff0000', shadowOpacity: 0.5, shadowRadius: 20 },
  sosButton: { width: 220, height: 220, borderRadius: 110, backgroundColor: '#ff0000', alignItems: 'center', justifyContent: 'center', borderWidth: 5, borderColor: '#ff6666' },
  buttonText: { color: '#fff', fontSize: 40, fontWeight: '900' },
  status: { marginTop: 40, fontSize: 18, fontWeight: 'bold' },
  hint: { color: '#666', marginTop: 10 }
});