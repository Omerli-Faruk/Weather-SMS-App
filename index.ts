interface SmsResponse {
    id?: string;
    error?: string;
}

export interface Coordinates {
    lat: number;
    lon: number;
}

export async function getCoordinates(): Promise<Coordinates> {
    if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
    }


    const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    return {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };
}

export async function sendLocationViaSMS(coords: Coordinates): Promise<SmsResponse> {
    const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(coords)
    });

    const result: SmsResponse = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Server error occurred.")
    }
    return result;
}

export async function handleWeatherSmsRequest(): Promise<void> {
    try {
        console.log("Location is being detected...");
        const coords = await getCoordinates();

        console.log("Location found, SMS being sent...", coords);
        const result = await sendLocationViaSMS(coords);

        alert(`Success! Weather forecast sent via SMS. (ID: ${result.id}`);
    } catch (error) {
        console.error("Error detail:", error);

        if (error instanceof GeolocationPositionError) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    alert("Operation failed: You were denied location access permission.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Operation failed: Location information is currently unavailable (check your GPS/Internet connection).");
                    break;
                case error.TIMEOUT:
                    alert("Operation failed: Location detection took too long (Timeout).");
                    break;
                default:
                    alert("Operation failed: An unknown location error occurred..");
            }
        }
        else if (error instanceof Error) {
            alert("Operation failed: " + error.message);
        }
        else {
            alert("Operation failed: An unknown error occurred.");
        }
    }
}


