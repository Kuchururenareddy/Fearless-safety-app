import { Magnetometer } from 'expo-sensors';

// 1. This function starts the Magnetic Sensor
export const startMagnetometer = (onUpdate) => {
  // Check the sensor quickly (every 100ms)
  Magnetometer.setUpdateInterval(100);

  const subscription = Magnetometer.addListener(data => {
    const { x, y, z } = data;
    
    // 2. Calculate the "Strength" of the magnetic field
    // We use Pythagoras theorem (a^2 + b^2 + c^2) to get the total strength
    const magnitude = Math.sqrt(x * x + y * y + z * z);
    
    // 3. Send the single number back to the screen
    onUpdate(magnitude); 
  });

  return subscription;
};