import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

export default function FakeCallScreen() {
  const [status, setStatus] = useState("Incoming Call...");

  useEffect(() => {
    // Vibrate: ON for 1s, OFF for 1s (Loop)
    const interval = setInterval(() => Vibration.vibrate(1000), 2000);
    return () => clearInterval(interval); // Stop when leaving screen
  }, []);

  return (
    <View style={styles.container}>
      {/* CALLER ID */}
      <View style={styles.callerInfo}>
        <Ionicons name="person-circle" size={130} color="#ccc" />
        <Text style={styles.callerName}>DAD ❤️</Text>
        <Text style={styles.callerNumber}>Mobile +91 98765 43210</Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.actionContainer}>
        
        {/* DECLINE (Go Back) */}
        <Link href="/" asChild>
          <TouchableOpacity style={styles.declineBtn}>
            <Ionicons name="call" size={35} color="white" style={{ transform: [{ rotate: '135deg' }] }} />
          </TouchableOpacity>
        </Link>

        {/* ACCEPT (Fake Answer) */}
        <TouchableOpacity 
          style={styles.acceptBtn} 
          onPress={() => {
            Vibration.cancel(); 
            setStatus("00:01"); 
            alert("Pretend to talk: 'YES DAD, I AM COMING NOW!'");
          }}
        >
          <Ionicons name="call" size={35} color="white" />
        </TouchableOpacity>

      </View>
      
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e151c', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 80 },
  callerInfo: { alignItems: 'center', marginTop: 50 },
  callerName: { fontSize: 36, color: 'white', fontWeight: 'bold', marginTop: 20 },
  callerNumber: { fontSize: 18, color: '#aaa', marginTop: 10 },
  actionContainer: { flexDirection: 'row', width: '75%', justifyContent: 'space-between', marginBottom: 50 },
  declineBtn: { alignItems: 'center', justifyContent: 'center', width: 80, height: 80, backgroundColor: '#ff3b30', borderRadius: 40 },
  acceptBtn: { alignItems: 'center', justifyContent: 'center', width: 80, height: 80, backgroundColor: '#34c759', borderRadius: 40 },
  status: { color: '#888', marginBottom: 20 }
});