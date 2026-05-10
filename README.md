# 🌤️ Weather SMS Notification App (TS Edition)

A robust, full-stack **TypeScript** application that synchronizes browser geolocation data with real-time weather analytics and delivers them via SMS using Twilio.

---

## 📖 Table of Contents
- [Project Evolution](#-project-evolution)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)

---

## 🚀 Project Evolution
This project evolved from a simple vanilla JavaScript script into a modern, type-safe full-stack application. It now utilizes **Vite** for frontend bundling, **TypeScript** for end-to-end type safety, and **Express.js** as a secure proxy backend to handle API communications safely.

## ✨ Key Features
* 📍 **High-Accuracy Geolocation:** Leverages the Browser Geolocation API with precise error handling for permission denials, unavailable positions, and timeouts.
* 🛡️ **Type-Safe Development:** Full TypeScript integration in both Frontend and Backend, ensuring robust code and minimal runtime errors.
* ☁️ **Real-Time Weather Integration:** Fetches live weather data (Temperature, Conditions, City Name) from the OpenWeatherMap API based on user coordinates.
* 📱 **Automated SMS Delivery:** Seamless integration with Twilio's messaging service to deliver weather reports directly to mobile devices.
* 🔄 **Vite Development Server:** Lightning-fast HMR (Hot Module Replacement) and a configured dev-proxy to bypass CORS issues during local development.

## 🛠️ Tech Stack
* **Frontend:** TypeScript, Vite, HTML5 (ES Modules)
* **Backend:** Node.js, Express.js (TypeScript)
* **APIs:** [Twilio API](https://www.twilio.com/), [OpenWeatherMap API](https://openweathermap.org/)
* **Tools:** `cors`, `dotenv`, `ts-node`, `twilio-node`

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

3.  **Setup Environment Variables:**
    Create a `.env` file in the root directory and fill in your credentials:
    ```env
    TWILIO_ACCOUNT_SID=your_account_sid_here
    TWILIO_AUTH_TOKEN=your_auth_token_here
    WEATHER_API_KEY=your_openweathermap_api_key_here
    TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
    MY_PHONE_NUMBER=your_personal_phone_number_here
    ```

4.  **Run the Application (Dual-Process):**
    You need to run the backend and frontend simultaneously. Open two separate terminals:

    * **Terminal 1 (Backend):** ```bash
      npx ts-node app.ts
      ```
    * **Terminal 2 (Frontend):** ```bash
      npx vite
      ```

5.  **Access the App:** Open your browser and navigate to `http://localhost:5173`.

---

## 📐 Professional Implementation Details
* **Frontend Proxy:** The `vite.config.ts` is configured to proxy `/api` requests to `http://localhost:3000`. bu sayede geliştirme aşamasında CORS (Cross-Origin Resource Sharing) hataları engellenmiştir.
* **Error Handling:** Implemented comprehensive error catch blocks for `GeolocationPositionError` and server-side fetch failures.
* **Type Definitions:** Custom interfaces like `Coordinates` and `SmsResponse` are used to maintain strict data structures across the app.

---
**Developed with ❤️ by Omerli Faruk**