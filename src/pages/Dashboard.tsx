import WeatherTable from '../components/WeatherTable/WeatherTable';
import WeeklySummary from "../components/WeeklySummary/WeeklySummary.tsx";
import useGeolocation from '../hooks/useGeolocation';


const Dashboard = () => {
    const geo = useGeolocation();

    return (
        <main className="dashboard">
            <WeatherTable
                latitude={geo.latitude}
                longitude={geo.longitude}
                geoLoading={geo.loading}
                refreshLocation={geo.refreshLocation}
            />
            <WeeklySummary
                latitude={geo.latitude}
                longitude={geo.longitude}
                geoLoading={geo.loading}
            />
        </main>
    );
};

export default Dashboard;
