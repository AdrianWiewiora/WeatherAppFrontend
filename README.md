# WeatherAppFrontend

A simple web application displaying a 7-day weather forecast. Developed as part of a recruitment task.

## Summary

This project implements a React + Vite frontend that consumes a custom backend API providing weather data.  
Features include displaying a 7-day forecast, weekly summary, interactive map location selector with Leaflet, and responsive UI.  
The app is deployed on GitHub Pages for easy access and demo purposes.

## Setup

This application requires an API key from [LocationIQ](https://locationiq.com/) for geolocation services.

### Environment Variables

Create a `.env` file in the project root and add your LocationIQ API key and backend URL:

```env
VITE_LOCATIONIQ_API_KEY=your_api_key_here
VITE_BACKEND_URL=https://your-backend-url/api
```

### Running the app
to dev
```bash
npm install
npm run dev
```

to deploy

```bash
npm run build
npm run deploy
```
