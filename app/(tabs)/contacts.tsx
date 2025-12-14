import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ContactsScreen() {
  const [number, setNumber] = useState('');
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Mom', phone: '+91 98765 43210' },
    { id: 2, name: 'Police Control', phone: '100' },
  ]);

  const addContact = () => {
    if (number.length < 10) {
      Alert.alert("Invalid Number", "Please enter a valid phone number.");
      return;
    }
    const newContact = { id: Date.now(), name: 'New Guardian', phone: number };
    setContacts([...contacts, newContact]);
    setNumber(''); // Clear the box
    Alert.alert("Success", "Guardian added to safety network.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY GUARDIANS</Text>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Enter Phone Number"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
          value={number}
          onChangeText={setNumber}
        />
        <TouchableOpacity style={styles.addButton} onPress={addContact}>
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* List of Contacts */}
      <ScrollView style={styles.list}>
        {contacts.map((contact) => (
          <View key={contact.id} style={styles.card}>
            <View>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
            <TouchableOpacity onPress={() => Alert.alert("Deleted")}>
              <FontAwesome name="trash" size={24} color="#ff4444" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.footer}>These contacts will receive your SOS location.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#00ff00',
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactPhone: {
    color: '#888',
    fontSize: 14,
    marginTop: 5,
  },
  footer: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  }
});