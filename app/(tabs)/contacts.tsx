import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'; // The Memory Tool
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ContactsScreen() {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [contacts, setContacts] = useState([]);

  // 1. Load contacts automatically when the screen opens
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('emergency_contacts');
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.log("Error loading contacts", error);
    }
  };

  const saveContacts = async (newContacts) => {
    try {
      // Save to phone storage
      await AsyncStorage.setItem('emergency_contacts', JSON.stringify(newContacts));
      setContacts(newContacts);
    } catch (error) {
      Alert.alert("Error", "Could not save contact");
    }
  };

  const addContact = () => {
    if (number.length < 10 || !name) {
      Alert.alert("Error", "Please enter a valid Name and Phone Number.");
      return;
    }
    const newContact = { id: Date.now().toString(), name, phone: number };
    const updatedList = [...contacts, newContact];
    saveContacts(updatedList); // Save immediately
    setNumber('');
    setName('');
    Alert.alert("Success", "Guardian added!");
  };

  const deleteContact = (id) => {
    const updatedList = contacts.filter(c => c.id !== id);
    saveContacts(updatedList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY GUARDIANS</Text>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} placeholder="Name (e.g., Mom)" placeholderTextColor="#666"
          value={name} onChangeText={setName}
        />
        <TextInput 
          style={styles.input} placeholder="Phone Number" placeholderTextColor="#666"
          keyboardType="phone-pad" value={number} onChangeText={setNumber}
        />
        <TouchableOpacity style={styles.addButton} onPress={addContact}>
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteContact(item.id)}>
              <FontAwesome name="trash" size={24} color="#ff4444" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', padding: 20, paddingTop: 60 },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputContainer: { marginBottom: 20 },
  input: { backgroundColor: '#333', color: '#fff', borderRadius: 10, padding: 15, marginBottom: 10 },
  addButton: { backgroundColor: '#00ff00', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: '#333', padding: 20, borderRadius: 15, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  contactName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  contactPhone: { color: '#888', fontSize: 14 }
});