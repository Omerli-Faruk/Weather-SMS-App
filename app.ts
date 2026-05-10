import express from 'express';
import type { Request, Response } from 'express';
import twilio from 'twilio';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    WEATHER_API_KEY,
    TWILIO_PHONE_NUMBER,
    MY_PHONE_NUMBER
} = process.env as Record<string, string>;

interface WeatherResult {
    city: string;
    temp: number;
    description: string;
}

interface OpenWeatherResponse {
    name: string;
    main: { temp: number };
    weather: Array<{ description: string }>;
}

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

async function getWeatherData(lat: number, lon: number): Promise<WeatherResult> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
        const error = await response.json() as { message?: string };
        throw new Error(error.message || "Weather data could not be obtained")
    }

    const data = await response.json() as OpenWeatherResponse;
    return {
        city: data.name || "Unknown Location",
        temp: Math.round(data.main.temp),
        description: data.weather[0].description
    };
}

app.post('/api/send-sms', async (req: Request, res: Response) => {
    try {
        const {lat, lon} = req.body;
        if (!lat || !lon) return res.status(400).json({error: "The coordinates are missing"});

        const weather = await getWeatherData(lat, lon);

        const messageBody: string = `📍 ${weather.city}🌡️ Temp: ${weather.temp}°C☁️ Condition: ${weather.description}`;

        const message = await client.messages.create({
            body: messageBody,
            from: TWILIO_PHONE_NUMBER,
            to: MY_PHONE_NUMBER
        });

        res.status(200).json({success: true, id: message.sid});
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({error: errorMessage});
    }
});

app.get('/api/messages', async (req: Request, res: Response) => {
    try {
        const messages = await client.messages.list({limit: 10});
        const formatted = messages.map(m => ({
            body: m.body,
            status: m.status,
            date: m.dateSent
        }));
        res.status(200).json({success: true, messages: formatted});
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({success: false, error: errorMessage});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
