import {useEffect, useState} from 'react';
import './WeatherTable.css';
import { getWeatherIconClass } from '../../utils/weatherIcons';
import { MdGpsFixed, MdLocationPin } from 'react-icons/md';
import MapSelector from '../MapSelector/MapSelector';
const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

interface Forecast {
    date: string;
    weatherCode: number;
    minTemperature: number;
    maxTemperature: number;
    estimatedEnergy: number;
}

interface WeatherTableProps {
    latitude: number | null;
    longitude: number | null;
    geoLoading: boolean;
    refreshLocation: (lat?: number, lon?: number) => void;
}

const WeatherTable = ({latitude, longitude, geoLoading, refreshLocation }: WeatherTableProps) => {
    // Weather forecast state
    const [forecast, setForecast] = useState<Forecast[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // Location name state
    const [locationName, setLocationName] = useState<string | null>(null);
    // Errors
    const [serverError, setServerError] = useState<string | null>(null);
    const [locationNameError, setLocationNameError] = useState<string | null>(null);

    const [isMapOpen, setIsMapOpen] = useState(false);

    const handleLocationSelect = (lat: number, lon: number) => {
        refreshLocation(lat, lon);
        setIsMapOpen(false);
    };

    // Fetch weather forecast based on current coordinate
    useEffect(() => {
        if (geoLoading || latitude === null || longitude === null) return;
        setLoading(true);
        const fetchForecast = async () => {
            try {
                const response = await fetch(
                    `/api/weather/forecast?latitude=${latitude}&longitude=${longitude}`
                );
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setForecast(data);
                setServerError(null);
            } catch (error) {
                console.error('Error fetching forecast:', error);
                setServerError('Failed to fetch weather forecast. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchForecast();
    }, [geoLoading, latitude, longitude]);

    // Reverse geocode: fetch location name from coordinates
    useEffect(() => {
        if (latitude === null || longitude === null) return;

        const fetchLocationName = async () => {
            try {
                const res = await fetch(`https://eu1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                const name = data.address.city || data.address.town || data.address.village || data.address.hamlet || 'Unknown location';
                setLocationName(name);
                setLocationNameError(null);
            } catch (e) {
                console.error('[LocationName] Error fetching location name:', e);
                setLocationName(null);
                setLocationNameError('Failed to fetch location name.');
            }
        };

        fetchLocationName();
    }, [latitude, longitude])

    // Retry geolocation on demand (re-check browser permissions)
    const handleRequestLocation = async () => {
        try {
            const status = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
            if (status.state === 'granted' || status.state === 'prompt') {
                refreshLocation();
            } else {
                alert('Location access is blocked. Please enable it in your browser settings to retry.');
            }
        } catch (e) {
            refreshLocation();
        }
    };

    // Conditional loading/error states
    if (geoLoading) return <div className="layout">Getting your location…</div>;
    if (loading) return <div className="layout">Loading forecast…</div>;
    if (serverError) return <div className="layout error-message">{serverError}</div>;

    return (
        <div className="layout">
            <div className="weather-header">
                <h2>
                    Your location: {locationNameError ? (
                    <span className="error-message">{locationNameError}</span>
                ) : (
                    locationName ?? 'Loading location...'
                )}
                </h2>
                <div className="weather-header-buttons">
                    <button onClick={handleRequestLocation} className="icon-button" title="Retry location">
                        <MdGpsFixed />
                    </button>
                    <button
                        onClick={() => setIsMapOpen(true)}
                        className="icon-button"
                        title="Select location from map"
                    >
                        <MdLocationPin />
                    </button>
                </div>
            </div>
            {isMapOpen && (
                <MapSelector isOpen={isMapOpen} onConfirm={handleLocationSelect} onClose={() => setIsMapOpen(false)} />
            )}
            <div className="weather-table-container">
            <table className="weather-table horizontal">
                <thead>
                <tr>
                    <th></th>
                    {forecast.map((day) => {
                        const weekday = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
                        return <th key={day.date}>{weekday}</th>;
                    })}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Date</td>
                    {forecast.map(day => (
                        <td key={day.date}>{new Date(day.date).toLocaleDateString()}</td>
                    ))}
                </tr>
                <tr>
                    <td>Weather</td>
                    {forecast.map(day => (
                        <td key={day.date}>
                            <i className={`wi ${getWeatherIconClass(day.weatherCode)}`} />
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>Min Temp (°C)</td>
                    {forecast.map(day => (
                        <td key={day.date}>{Math.round(day.minTemperature)}</td>
                    ))}
                </tr>
                <tr>
                    <td>Max Temp (°C)</td>
                    {forecast.map(day => (
                        <td key={day.date}>{Math.round(day.maxTemperature)}</td>
                    ))}
                </tr>
                <tr>
                    <td>Estimated Energy (kWh)</td>
                    {forecast.map(day => (
                        <td key={day.date}>{day.estimatedEnergy.toFixed(2)}</td>
                    ))}
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default WeatherTable;
