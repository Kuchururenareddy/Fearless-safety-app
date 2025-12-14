const express = require('express');
const cors = require('cors');
const ip = require('ip');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- DATABASE (Temporary Memory) ---
// This list will hold all the alerts while the server is running
let policeAlerts = [];

// --- ROUTE 1: RECEIVE SOS (From Mobile App) ---
app.post('/sos', (req, res) => {
    const { location } = req.body;
    
    // Create a new Alert Ticket
    const newAlert = {
        id: Date.now(),
        location: location || "Unknown Location",
        time: new Date().toLocaleTimeString(),
        status: "PENDING"
    };

    // Save it to our list
    policeAlerts.unshift(newAlert); // Add to the top of the list

    console.log("🚨 NEW ALERT SAVED:", newAlert);
    res.json({ success: true, message: "Police Notified" });
});

// --- ROUTE 2: SHOW DASHBOARD (From Web Browser) ---
// The Police Computer will ask this route: "Any new crimes?"
app.get('/dashboard-data', (req, res) => {
    res.json(policeAlerts);
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    const myIp = ip.address();
    console.log(`\n👮 POLICE DASHBOARD READY`);
    console.log(`📡 Server IP: http://${myIp}:${PORT}`);
});