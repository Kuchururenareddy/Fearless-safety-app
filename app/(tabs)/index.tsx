import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';

export default function HomeScreen() {
  const [status, setStatus] = useState('SAFE');

  const handlePress = () => {
    // Vibrate the phone when clicked
    Vibration.vibrate();
    setStatus('SENDING ALERTS...');
    Alert.alert("SOS INITIATED", "Sending location to police and contacts...");
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
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e', // Dark safety mode
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 50,
  },
  buttonContainer: {
    elevation: 10,
    shadowColor: '#ff0000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  sosButton: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#ff0000', // Big Red Button
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#ff6666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '900',
  },
  status: {
    marginTop: 40,
    color: '#00ff00',
    fontSize: 18,
    fontWeight: 'bold',
  }
});