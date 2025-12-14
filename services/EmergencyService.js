import { Alert, Vibration } from 'react-native';
import { sendEmergencySignal } from './ApiService';
import { getCurrentLocation } from './LocationService';

// This is the "Master Function" that runs when panic starts
export const triggerEmergency = async () => {
  console.log("🚨 EMERGENCY PROTOCOL INITIATED 🚨");

  // 1. PHYSICAL FEEDBACK (Buzz the phone so user knows it worked)
  // Vibrate for 1 second (1000ms)
  Vibration.vibrate(1000);

  // 2. GET DATA (Where are we?)
  const location = await getCurrentLocation();
  console.log("📍 Location Locked:", location);

  // 3. SEND SIGNAL (Call the Police Server)
  const sentSuccessfully = await sendEmergencySignal(location);

  // 4. CONFIRMATION
  if (sentSuccessfully) {
    Alert.alert("🚨 SOS SENT 🚨", "Help is on the way!\nLocation: " + location);
    // Vibrate 3 short pulses to confirm success (bzzt-bzzt-bzzt)
    Vibration.vibrate([100, 200, 100, 200, 100, 200]);
  } else {
    Alert.alert("⚠️ FAILED", "Could not reach server. Check internet.");
  }
};