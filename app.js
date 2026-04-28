const express = require('express');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    WEATHER_API_KEY,
    TWILIO_PHONE_NUMBER,
    MY_PHONE_NUMBER,
    PORT = 3000
} = process.env;

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


// Weather API
async function getWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Weather data could not be obtained.");
    }

    const data = await response.json();
    return {
        city: data.name || "Unknown Location",
        temp: Math.round(data.main.temp),
        description: data.weather[0].description
    };
}


//  SMS sending
app.post('/api/send-sms', async (req, res) => {
    try {
        const { lat, lon } = req.body;
        if (!lat || !lon) return res.status(400).json({ error: "The coordinates are missing." });

        const weather = await getWeatherData(lat, lon);

        const messageBody = `📍 ${weather.city}🌡️ Temp: ${weather.temp}°C☁️ Condition: ${weather.description}`;

        const message = await twilioClient.messages.create({
            body: messageBody,
            from: TWILIO_PHONE_NUMBER,
            to: MY_PHONE_NUMBER,
        });

        res.status(200).json({ success: true, sid: message.sid });
    } catch (error) {
        console.error("Process Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});


//  List messages
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await twilioClient.messages.list({ limit: 10 });
        const formatted = messages.map(m => ({
            body: m.body,
            status: m.status,
            date: m.dateSent
        }));
        res.status(200).json({ success: true, messages: formatted });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is online: http://localhost:${PORT}`);
});