import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DetectorScreen() {
  const [reading, setReading] = useState(0); // This will hold the sensor number later

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SPY DETECTOR</Text>

      {/* The Graph Circle */}
      <View style={styles.graphContainer}>
        <Text style={styles.readingText}>{reading} µT</Text>
        <Text style={styles.subText}>MAGNETIC FIELD</Text>
      </View>

      {/* The Status Bar */}
      <View style={[styles.bar, { width: `${Math.min(reading, 100)}%` }]} />
      
      <Text style={styles.instruction}>
        Move your phone close to suspicious objects.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#00ff00', // Hacker Green
    fontWeight: 'bold',
    marginBottom: 50,
    letterSpacing: 2,
  },
  graphContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#00ff00',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  readingText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  subText: {
    color: '#00ff00',
    fontSize: 12,
    marginTop: 5,
  },
  bar: {
    height: 10,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    marginBottom: 20,
  },
  instruction: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});