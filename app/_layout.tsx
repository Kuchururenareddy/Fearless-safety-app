import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

// This function helps us show icons (like the Eye or Warning sign)
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#ff0000', // Red color for active tab
      tabBarStyle: { backgroundColor: '#1a1a1a' } // Dark background for the menu
    }}>
      
      {/* Tab 1: The SOS Button (Home) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'SOS',
          headerShown: false, // Hides the top title bar
          tabBarIcon: ({ color }) => <TabBarIcon name="exclamation-circle" color={color} />,
        }}
      />

      {/* Tab 2: The Spy Detector */}
      <Tabs.Screen
        name="detector"
        options={{
          title: 'Spy Mode',
          headerShown: false, // Hides the top title bar
          tabBarIcon: ({ color }) => <TabBarIcon name="eye" color={color} />,
        }}
      />

    </Tabs>
  );
}