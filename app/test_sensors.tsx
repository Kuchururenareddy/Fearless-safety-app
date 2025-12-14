import { Accelerometer } from 'expo-sensors'; // Import directly to test
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TestSensorScreen() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [totalForce, setTotalForce] = useState(0);

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      
      // Calculate force
      const { x, y, z } = accelerometerData;
      const force = Math.sqrt(x * x + y * y + z * z);
      setTotalForce(force);

      // Trigger Alert if force is high (Debug Level: 1.2)
      if (force > 1.2) {
        // We use console.log instead of Alert loops to avoid crashing the app
        console.log("SHAKE DETECTED! Force:", force);
      }
    });

    return () => subscription && subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SENSOR DEBUGGER</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Raw X: {data.x.toFixed(2)}</Text>
        <Text style={styles.label}>Raw Y: {data.y.toFixed(2)}</Text>
        <Text style={styles.label}>Raw Z: {data.z.toFixed(2)}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: totalForce > 1.2 ? 'red' : '#eee' }]}>
        <Text style={styles.label}>Total G-Force:</Text>
        <Text style={styles.bigNumber}>{totalForce.toFixed(2)}</Text>
        <Text>{totalForce > 1.2 ? "SHAKING!" : "Still"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 20, borderWidth: 1, borderRadius: 10, width: '80%', marginBottom: 20, alignItems: 'center' },
  label: { fontSize: 18 },
  bigNumber: { fontSize: 40, fontWeight: 'bold' }
});