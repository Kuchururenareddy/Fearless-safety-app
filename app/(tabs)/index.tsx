import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TeamHub() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🚀 TEAM STATUS HUB</Text>
      
      {/* SECTION 1: MEMBER 1 (The Designer) */}
      <View style={styles.card}>
        <Text style={styles.role}>MEMBER 1: DESIGN</Text>
        <Text style={styles.status}>Status: In Progress</Text>
        {/* Link this to Member 1's login page if it exists, or just keep it as a placeholder */}
        <TouchableOpacity style={styles.btnDisabled}>
          <Text style={styles.btnText}>👤 Go to Profile / Login (Coming Soon)</Text>
        </TouchableOpacity>
      </View>

      {/* SECTION 2: MEMBER 2 (The Engineer - YOU) */}
      <View style={styles.card}>
        <Text style={styles.role}>MEMBER 2: SENSORS</Text>
        <Text style={styles.status}>Status: ✅ READY</Text>
        <Link href="/sensor-debug" asChild>
          <TouchableOpacity style={styles.btnActive}>
            <Text style={styles.btnText}>📡 Test Sensors (Shake/GPS)</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* SECTION 3: MEMBER 3 (Connectivity) */}
      <View style={styles.card}>
        <Text style={styles.role}>MEMBER 3: POLICE SERVER</Text>
        <Text style={styles.status}>Status: Check Laptop Terminal</Text>
        <Text style={styles.info}>
          Server must be running on laptop. 
          Current IP needed in ApiService.js.
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#111', padding: 20, alignItems: 'center' },
  header: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 30, marginTop: 40 },
  card: { width: '100%', backgroundColor: '#222', borderRadius: 10, padding: 20, marginBottom: 20 },
  role: { color: '#aaa', fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  status: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  info: { color: '#666', fontSize: 12, fontStyle: 'italic' },
  btnActive: { backgroundColor: '#00cc00', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnDisabled: { backgroundColor: '#444', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: 'bold' }
});