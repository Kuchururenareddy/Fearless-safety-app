import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TeamHub() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🚀 TEAM STATUS HUB</Text>
      <Text style={styles.status}>SYSTEM ONLINE</Text>
      
      <View style={styles.card}>
        <Text style={styles.role}>DESIGNER (YOU)</Text>
        <Text style={styles.info}>If you see this, the crash is fixed.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#111', padding: 20, alignItems: 'center', justifyContent: 'center' },
  header: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  status: { color: '#00ff00', fontSize: 20, fontWeight: 'bold', marginBottom: 40 },
  card: { backgroundColor: '#333', padding: 20, borderRadius: 10, width: '100%' },
  role: { color: '#aaa', marginBottom: 5 },
  info: { color: '#fff' }
});