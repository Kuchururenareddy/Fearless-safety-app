import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { triggerEmergency } from '../services/EmergencyService';
import { startShakeDetection } from '../services/ShakeService';

export default function SecuritySystem() {
  const [isArmed, setIsArmed] = useState(false);
  const [log, setLog] = useState("System Idle...");

  useEffect(() => {
    let shakeSubscription: any = null;

    if (isArmed) {
      setLog("🛡️ SYSTEM ARMED. Monitoring Shakes...");
      
      // START LISTENING FOR SHAKES
      shakeSubscription = startShakeDetection(() => {
        setLog("🚨 SHAKE DETECTED! Triggering SOS...");
        // This is the magic link: Shake -> Trigger Emergency
        triggerEmergency(); 
        // Disarm after triggering (so we don't spam the police)
        setIsArmed(false); 
      });
      
    } else {
      setLog("😴 System Disarmed.");
      // If disarmed, stop listening to save battery
      if (shakeSubscription) shakeSubscription.remove();
    }

    // Cleanup when leaving screen
    return () => {
      if (shakeSubscription) shakeSubscription.remove();
    };
  }, [isArmed]); // Re-run this logic whenever "isArmed" changes

  return (
    <View style={[styles.container, { backgroundColor: isArmed ? '#003300' : '#111' }]}>
      <Text style={styles.title}>🛡️ SAFETY SHIELD</Text>
      
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>{isArmed ? "ACTIVE" : "OFFLINE"}</Text>
      </View>

      <Text style={styles.log}>{log}</Text>

      <View style={styles.controlPanel}>
        <Text style={styles.label}>Arm System</Text>
        <Switch 
          value={isArmed} 
          onValueChange={setIsArmed} 
          trackColor={{ false: "#767577", true: "#32CD32" }}
          thumbColor={isArmed ? "#fff" : "#f4f3f4"}
        />
      </View>

      <Text style={styles.hint}>
        {isArmed 
          ? "⚠️ Shaking the phone now will call the police!" 
          : "Toggle switch to enable Shake Detection."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 40 },
  statusBox: { 
    borderWidth: 2, 
    borderColor: '#fff', 
    padding: 20, 
    borderRadius: 10, 
    marginBottom: 20,
    width: '100%',
    alignItems: 'center'
  },
  statusText: { fontSize: 40, fontWeight: 'bold', color: '#fff' },
  log: { color: '#aaa', marginBottom: 40, textAlign: 'center' },
  controlPanel: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '60%', 
    backgroundColor: '#333', 
    padding: 15, 
    borderRadius: 50 
  },
  label: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  hint: { color: '#666', marginTop: 30, textAlign: 'center' }
});