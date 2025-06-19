import { useEffect, useState } from 'react';

interface GeolocationData {
    latitude: number;
    longitude: number;
    loading: boolean;
    isFallback: boolean;
    refreshLocation: (lat?: number, lon?: number) => void;
}

// Default location: Warszawa
const DEFAULT_LAT = 52.220;
const DEFAULT_LON = 21.000;

/**
 * Custom React hook to retrieve the user's current geolocation.
 * Falls back to a default location if geolocation is not supported or permission is denied.
 * Provides a method to refresh the location on demand.
 */
const useGeolocation = (): GeolocationData => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [isFallback, setIsFallback] = useState(false);

    const resolveLocation = (manualLat?: number, manualLon?: number) => {
        setLoading(true);

        if (manualLat !== undefined && manualLon !== undefined) {
            setLatitude(manualLat);
            setLongitude(manualLon);
            setIsFallback(true);
            setLoading(false);
            return;
        }

        if (!navigator.geolocation) {
            setLatitude(DEFAULT_LAT);
            setLongitude(DEFAULT_LON);
            setIsFallback(true);
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setIsFallback(false);
                setLoading(false);
            },
            () => {
                setLatitude(DEFAULT_LAT);
                setLongitude(DEFAULT_LON);
                setIsFallback(true);
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        resolveLocation();
    }, []);

    return {
        latitude,
        longitude,
        loading,
        isFallback,
        refreshLocation: resolveLocation
    } as GeolocationData;
};


export default useGeolocation;
