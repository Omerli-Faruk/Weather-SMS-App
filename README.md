# 🌤️ Weather SMS Notification App

A professional full-stack application that captures the user's current geolocation, fetches real-time weather data via OpenWeatherMap, and sends a summary report as an SMS using the Twilio API.

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Screenshots](#-screenshots)

---

## 📝 Overview
This project was built to demonstrate how to integrate multiple third-party APIs (OpenWeatherMap & Twilio) with a **Node.js/Express** backend. The application bridges the gap between web-based data (browser location) and real-world communication (SMS).

## ✨ Features
* 📍 **Auto-Geolocation:** Detects coordinates using the Browser's Geolocation API.
* ☁️ **Live Weather:** Fetches temperature, city name, and weather conditions.
* 📱 **SMS Integration:** Delivers the weather report directly to a mobile device.
* 🛡️ **Security:** Implements `.env` protection for all sensitive API credentials.
* ⚡ **Asynchronous Flow:** Clean `async/await` implementation for smooth performance.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **Backend:** Node.js, Express.js
* **APIs:** [Twilio API](https://www.twilio.com/), [OpenWeatherMap API](https://openweathermap.org/)
* **Tools:** Dotenv, Nodemon, Git

---

## ⚙️ Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/weather-sms-app.git](https://github.com/YOUR_USERNAME/weather-sms-app.git)
    cd weather-sms-app
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and copy the contents from `.env.example`. Fill in your specific API keys.

4.  **Start the Server:**
    ```bash
    # For production
    node app.js
    
    # For development (if nodemon is installed)
    npm run dev
    ```

5.  **Visit the App:**
    Open `http://localhost:3000` in your browser.

---

## 🔐 Environment Variables
To run this project, you will need to add the following variables to your `.env` file:

`WEATHER_API_KEY` - Your OpenWeatherMap API key.  
`TWILIO_ACCOUNT_SID` - Your Twilio Account SID.  
`TWILIO_AUTH_TOKEN` - Your Twilio Auth Token.  
`TWILIO_PHONE_NUMBER` - Your assigned Twilio phone number.  
`MY_PHONE_NUMBER` - The target phone number to receive the SMS.

---
**Developed with ❤️ by Omer Faruk Avci**
