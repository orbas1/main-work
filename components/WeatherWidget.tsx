"use client";

import { useEffect, useState } from "react";
import styles from "./WeatherWidget.module.css";

interface Weather {
  temperature: number;
  windspeed: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=0.1276&current_weather=true"
        );
        const data = await res.json();
        setWeather(data.current_weather);
      } catch (e) {
        console.error(e);
      }
    }
    fetchWeather();
  }, []);

  return (
    <div className={styles.widget}>
      <div className={styles.header}>Weather</div>
      {weather ? (
        <div className={styles.body}>
          <div className={styles.temp}>{Math.round(weather.temperature)}°C</div>
          <div className={styles.meta}>Wind {Math.round(weather.windspeed)} km/h</div>
        </div>
      ) : (
        <div className={styles.loading}>Loading...</div>
      )}
    </div>
  );
}
