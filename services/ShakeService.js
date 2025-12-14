import { Accelerometer } from 'expo-sensors';

// THRESHOLD: How hard you have to shake.
// 1.5 = Easy shake
// 2.5 = Very hard shake
const THRESHOLD = 1.2; 

let lastShakeTime = 0;

// This function starts the listener
export const startShakeDetection = (onShakeDetected) => {
  // Check the sensor 10 times every second (100ms)
  Accelerometer.setUpdateInterval(100);

  const subscription = Accelerometer.addListener(data => {
    const { x, y, z } = data;
    
    // Math formula to calculate "Total G-Force"
    const totalForce = Math.sqrt(x * x + y * y + z * z);

    if (totalForce > THRESHOLD) {
      const now = Date.now();
      
      // Prevent "Double Bouncing" (only trigger once every second)
      if (now - lastShakeTime > 1000) {
        lastShakeTime = now;
        onShakeDetected(); // <--- This triggers the Alarm!
      }
    }
  });

  // We return this so we can turn it off later (to save battery)
  return subscription;
};