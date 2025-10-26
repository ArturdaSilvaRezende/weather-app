import { createContext, useContext, useEffect, useState } from "react";

const DEFAULT_VALUE = {};
const WeatherContext = createContext<any>(DEFAULT_VALUE);

const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather("Berlin");
  }, []);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&hourly=temperature_2m,precipitation,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto`
      );

      const data = await weatherRes.json();

      const formattedData = {
        location: {
          city: name,
          country,
        },
        current: {
          temperature: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          precipitation: data.current.precipitation,
          wind: data.current.wind_speed_10m,
        },
        hourly: data.hourly,
        daily: data.daily,
      };

      setWeatherData(formattedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

function useWeather() {
  const context = useContext(WeatherContext);
  if (context === DEFAULT_VALUE) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}

export { useWeather, WeatherProvider };
