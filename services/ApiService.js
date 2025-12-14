// ⚠️ IMPORTANT: YOU MUST CHANGE THIS IP ADDRESS!
// Ask Member 3 for their IP (e.g., 192.168.1.35)
const SERVER_IP = "192.168.31.31"; 
const PORT = "3000";

const SERVER_URL = `http://${SERVER_IP}:${PORT}/sos`;

export const sendEmergencySignal = async (locationData) => {
  try {
    console.log("🚀 Sending SOS to:", SERVER_URL);

    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: locationData,
        time: new Date().toISOString(),
        battery: "15%" // We can add real battery level later
      }),
    });

    const result = await response.json();
    console.log("✅ Server Response:", result);
    return true;

  } catch (error) {
    console.error("❌ Failed to connect to Police Server:", error);
    return false;
  }
};