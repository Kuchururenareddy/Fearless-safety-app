import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sendEmergencySignal } from '../services/ApiService';
import { getCurrentLocation } from '../services/LocationService';

export default function SensorDebug() {
  const [loc, setLoc] = useState("Waiting...");
  const [status, setStatus] = useState("Idle");

  const handleTest = async () => {
    setStatus("Getting GPS...");
    
    // 1. Get Location
    const coords = await getCurrentLocation();
    setLoc(coords || "Error");

    // 2. Send to Server (Fake Test)
    setStatus("Sending to Server...");
    const success = await sendEmergencySignal(coords);
    
    if (success) setStatus("✅ SENT SUCCESSFULLY!");
    else setStatus("❌ SERVER FAILED (Check IP)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📡 DAY 2: CONNECTION TEST</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>My GPS Location:</Text>
        <Text style={styles.value}>{loc}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Server Status:</Text>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: status.includes('✅') ? 'green' : 'red'}}>
          {status}
        </Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleTest}>
        <Text style={styles.btnText}>TEST CONNECTION</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  title: { color: 'white', fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  card: { backgroundColor: '#222', padding: 20, borderRadius: 10, width: '80%', marginBottom: 20 },
  label: { color: '#aaa', marginBottom: 5 },
  value: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  btn: { backgroundColor: '#007bff', padding: 15, borderRadius: 10, marginTop: 20 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});