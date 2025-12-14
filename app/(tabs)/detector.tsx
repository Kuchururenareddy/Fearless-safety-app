import { Magnetometer } from 'expo-sensors'; // The Sensor Tool
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DetectorScreen() {
  const [reading, setReading] = useState(0);
  const [status, setStatus] = useState('SCANNING...');

  useEffect(() => {
    // 1. Set the sensor speed (Fast)
    Magnetometer.setUpdateInterval(100);

    // 2. Start listening to the hardware
    const subscription = Magnetometer.addListener(data => {
      // Calculate the strength of the magnetic field
      const magnitude = Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z);
      setReading(magnitude.toFixed(0)); // Round to a whole number

      // 3. If it's too high, show Danger!
      if (magnitude > 150) { 
        setStatus('⚠️ DEVICE DETECTED ⚠️');
      } else {
        setStatus('SCANNING...');
      }
    });

    // 4. Clean up when we leave the screen
    return () => subscription.remove();
  }, []);

  // Calculate the color (Green -> Red)
  const barColor = reading > 100 ? '#ff0000' : '#00ff00';
  const barWidth = Math.min((reading / 200) * 100, 100); // Cap at 100%

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SPY DETECTOR</Text>

      {/* The Dynamic Circle */}
      <View style={[styles.graphContainer, { borderColor: barColor }]}>
        <Text style={styles.readingText}>{reading} µT</Text>
        <Text style={[styles.subText, { color: barColor }]}>{status}</Text>
      </View>

      {/* The Visual Bar */}
      <View style={styles.barContainer}>
         <View style={[styles.bar, { width: `${barWidth}%`, backgroundColor: barColor }]} />
      </View>
      
      <Text style={styles.instruction}>
        {reading > 100 
          ? "Suspicious Signal! Check this area." 
          : "Wave phone near mirrors, clocks, or smoke alarms."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, color: '#00ff00', fontWeight: 'bold', marginBottom: 50, letterSpacing: 2 },
  graphContainer: { width: 250, height: 250, borderRadius: 125, borderWidth: 4, alignItems: 'center', justifyContent: 'center', marginBottom: 30, backgroundColor: 'rgba(255, 255, 255, 0.05)' },
  readingText: { fontSize: 60, color: '#fff', fontWeight: 'bold' },
  subText: { fontSize: 16, marginTop: 10, fontWeight: 'bold' },
  barContainer: { width: '100%', height: 20, backgroundColor: '#333', borderRadius: 10, marginBottom: 20, overflow: 'hidden' },
  bar: { height: '100%' },
  instruction: { color: '#888', textAlign: 'center', marginTop: 20, fontSize: 14 }
});