import WeatherTable from '../components/WeatherTable/WeatherTable';

const Dashboard = () => {
    return (
        <main className="dashboard">
            <WeatherTable />
            {/* <WeeklySummary /> <-- na końcu dodasz */}
        </main>
    );
};

export default Dashboard;
