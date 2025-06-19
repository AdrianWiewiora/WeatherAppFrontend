import { useEffect, useState } from 'react';
import './WeeklySummary.css';


interface WeeklyData {
    minTemperature: number;
    maxTemperature: number;
    averagePressure: number;
    averageSunshineDuration: number;
    precipitationSummary: string;
}

interface WeeklySummaryProps {
    latitude: number | null;
    longitude: number | null;
    geoLoading: boolean;
}

const WeeklySummary = ({ latitude, longitude, geoLoading }: WeeklySummaryProps) => {
    const [summary, setSummary] = useState<WeeklyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch weekly summary data whenever location is available and not loading
    useEffect(() => {
        if (geoLoading || latitude === null || longitude === null) return;

        const fetchSummary = async () => {
            try {
                const res = await fetch(`/api/weather/weekly-summary?latitude=${latitude}&longitude=${longitude}`);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setSummary(data);
                setError(null);
            } catch (err) {
                setError('Failed to load weekly summary.');
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [geoLoading, latitude, longitude]);

    if (loading) return <div className="weekly-summary">Loading summary…</div>;
    if (error) return <div className="weekly-summary error">{error}</div>;

    return (
        <footer  className="weekly-summary">
            <h3>Weekly Weather Summary</h3>
            <ul>
                <li><strong>Temperature min-max:</strong> {summary?.minTemperature}°C – {summary?.maxTemperature}°C</li>
                <li><strong>Average pressure:</strong> {summary?.averagePressure} hPa</li>
                <li><strong>Average sunshine:</strong> {summary?.averageSunshineDuration} h/day</li>
                <li><strong>Weather type:</strong> {summary?.precipitationSummary}</li>
            </ul>
        </footer >
    );
};

export default WeeklySummary;
