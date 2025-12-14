const express = require('express');
const cors = require('cors');
const ip = require('ip');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- DATABASE (Temporary Memory) ---
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

    policeAlerts.unshift(newAlert); // Add to the top of the list

    console.log("🚨 NEW ALERT SAVED:", newAlert);
    res.json({ success: true, message: "Police Notified" });
});

// --- ROUTE 2: SHOW DASHBOARD (From Web Browser) ---
app.get('/dashboard-data', (req, res) => {
    res.json(policeAlerts);
});

// --- ROUTE 3: RESOLVE INCIDENT (From Dashboard) ---
app.post('/resolve', (req, res) => {
    const { id } = req.body;

    // Find the alert by its ID (using toString() ensures safe comparison)
    const alertIndex = policeAlerts.findIndex(alert => alert.id.toString() === id.toString());

    if (alertIndex !== -1) {
        // Update the status
        policeAlerts[alertIndex].status = "RESOLVED";
        console.log(`✅ Alert ${id} RESOLVED.`);
        res.json({ success: true, message: `Alert ${id} resolved.` });
    } else {
        console.log(`❌ Alert ${id} not found.`);
        res.status(404).json({ success: false, message: "Alert not found" });
    }
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    const myIp = ip.address();
    console.log(`\n👮 POLICE DASHBOARD READY`);
    console.log(`📡 Server IP: http://${myIp}:${PORT}`);
});