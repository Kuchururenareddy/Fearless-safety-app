const express = require('express');
const cors = require('cors');
const ip = require('ip');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/sos', (req, res) => {
    const location = req.body.location;
    
    console.log("--- EMERGENCY ALERT ---");
    console.log("Location:", location);
    console.log("Time:", new Date().toLocaleTimeString());
    console.log("-----------------------");

    res.json({ message: "Police Notified", success: true });
});

app.listen(PORT, '0.0.0.0', () => {
    const myIp = ip.address();
    console.log("POLICE SERVER RUNNING");
    console.log("Server Address: http://" + myIp + ":" + PORT);
});