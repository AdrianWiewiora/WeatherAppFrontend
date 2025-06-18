import './Header.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

// Header component with app title and theme toggle switch
const Header = () => {
    return (
        <header className="header">
            <div className="spacer" />
            <div className="title">WeatherForecast</div>
            <ThemeToggle />
        </header>
    );
};

export default Header;
