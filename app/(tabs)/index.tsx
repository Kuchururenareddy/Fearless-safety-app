import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { startMagnetometer } from '../../services/MagnetometerService';

export default function SpyDetectorTest() {
  const [magnetStrength, setMagnetStrength] = useState(0);

  useEffect(() => {
    // Start listening to the magnet sensor
    const subscription = startMagnetometer((value: any) => {
      setMagnetStrength(value);
    });

    // Stop listening when we leave the screen
    return () => subscription.remove();
  }, []);

  // Logic: Normal background radiation is usually 30-50µT.
  // Anything over 60-70µT is suspicious.
  const isSuspicious = magnetStrength > 60;

  return (
    <View style={[styles.container, { backgroundColor: isSuspicious ? '#ff4444' : '#1a1a1a' }]}>
      <Text style={styles.title}>🕵️ SPY DETECTOR</Text>
      
      <View style={styles.meter}>
        <Text style={styles.value}>{magnetStrength.toFixed(0)} µT</Text>
        <Text style={styles.label}>Magnetic Field Strength</Text>
      </View>

      <Text style={styles.warning}>
        {isSuspicious ? "⚠️ DEVICE DETECTED!" : "Scanning Area..."}
      </Text>
      
      <Text style={styles.hint}>
        (Hint: Wave phone near a laptop speaker or fridge magnet)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 30, color: '#fff', fontWeight: 'bold', marginBottom: 50 },
  meter: { width: 250, height: 250, borderRadius: 125, borderWidth: 5, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  value: { fontSize: 60, color: '#fff', fontWeight: 'bold' },
  label: { fontSize: 16, color: '#ccc' },
  warning: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  hint: { color: '#888', marginTop: 20 }
});