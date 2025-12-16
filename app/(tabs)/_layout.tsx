import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF3B30', // Red for Emergency
        tabBarStyle: { backgroundColor: '#111', borderTopColor: '#333' },
        headerShown: false,
      }}>
      
      {/* 1. HOME SCREEN (Visible) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      {/* 2. CONTACTS SCREEN (Visible if you have it) */}
      <Tabs.Screen
        name="two"
        options={{
          title: 'Guardians',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />

      {/* 3. HIDDEN TABS (Developer Tools - Users won't see these) */}
      <Tabs.Screen name="sensor-debug" options={{ href: null }} />
      <Tabs.Screen name="test_sensors" options={{ href: null }} />
      <Tabs.Screen name="spy-cam" options={{ href: null }} />
      <Tabs.Screen name="fake-call" options={{ href: null }} />
      <Tabs.Screen name="modal" options={{ href: null }} />

    </Tabs>
  );
}