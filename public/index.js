// Coordinate acquisition function
export async function getCoordinates() {
    if (!navigator.geolocation) {
        throw new Error("Your browser does not support the location feature.");
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    return {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };
}

// Sending information to the server
export async function sendLocationViaSMS() {
    try {
        console.log("Location is being detected...");
        const coords = await getCoordinates();

        console.log("Location found, SMS being sent...", coords);

        const response = await fetch('/api/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(coords)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Server error occurred.");
        }

        alert(`Success! Weather forecast sent via SMS. (ID: ${result.sid})`);

    } catch (error) {
        console.error("Error:", error);
        alert("Operation failed: " + error.message);
    }
}