export const getWeatherIconClass = (code: number): string => {
    switch (code) {
        case 0: return 'wi-day-sunny';
        case 1: return 'wi-day-sunny-overcast';
        case 2: return 'wi-day-cloudy';
        case 3: return 'wi-cloudy';
        case 45: return 'wi-day-fog';
        case 48: return 'wi-fog';
        case 51: return 'wi-sleet';
        case 53: return 'wi-day-showers';
        case 55: return 'wi-day-rain';
        case 56:
        case 57: return 'wi-day-rain-mix';
        case 61:
        case 63: return 'wi-rain';
        case 65: return 'wi-thunderstorm';
        case 66:
        case 67: return 'wi-rain-mix';
        case 71:
        case 73:
        case 75:
        case 77: return 'wi-snow';
        case 80:
        case 81: return 'wi-day-rain';
        case 82: return 'wi-thunderstorm';
        case 85:
        case 86: return 'wi-day-snow';
        case 95: return 'wi-day-thunderstorm';
        case 96:
        case 99: return 'wi-storm-showers';
        default: return 'wi-na';
    }
};
