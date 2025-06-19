import { useEffect, useRef, useState } from 'react';
import './MapSelector.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (lat: number, lon: number) => void;
}

/**
 * A modal component that displays an interactive Leaflet map.
 * Allows the user to click on the map to select a location (latitude and longitude).
 * Displays a marker at the selected position and provides buttons to confirm or cancel the selection.
 */
const MapSelector = ({ isOpen, onClose, onConfirm }: MapSelectorProps) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    useEffect(() => {
        if (isOpen && mapRef.current) {
            mapInstance.current = L.map(mapRef.current).setView([52.2297, 21.0122], 5);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(mapInstance.current);

            mapInstance.current.on('click', (e: L.LeafletMouseEvent) => {
                const { lat, lng } = e.latlng;
                setSelectedPosition([lat, lng]);
                if (markerRef.current) {
                    markerRef.current.setLatLng([lat, lng]);
                } else {
                    markerRef.current = L.marker([lat, lng]).addTo(mapInstance.current!);
                }
            });
        }
        // Cleanup the map when the modal is closed
        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
                markerRef.current = null;
                setSelectedPosition(null);
            }
        };
    }, [isOpen]);

    // Effect to ensure the map resizes correctly when modal becomes visible
    useEffect(() => {
        if (isOpen && mapInstance.current) {
            setTimeout(() => {
                mapInstance.current!.invalidateSize();
            }, 200);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="map-modal">
            <div className="map-modal-content">
                <div className="map-container" ref={mapRef}></div>
                <div className="map-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button
                        onClick={() => {
                            if (selectedPosition) onConfirm(selectedPosition[0], selectedPosition[1]);
                        }}
                        disabled={!selectedPosition}
                    >
                        Confirm location
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MapSelector;
