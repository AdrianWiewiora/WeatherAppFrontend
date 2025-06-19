import Header from './components/Header/Header.tsx';
import Dashboard from './pages/Dashboard';
import WeeklySummary from "./components/WeeklySummary/WeeklySummary.tsx";

function App() {
    return (
        <div className="app-container">
            <Header />
            <Dashboard />
            <WeeklySummary />
        </div>
    );
}

export default App;
