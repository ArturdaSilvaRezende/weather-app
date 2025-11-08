import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type Units = {
  temperature: "celsius" | "fahrenheit";
  wind: "kmh" | "mph";
  precipitation: "mm" | "inch";
};

type WeatherData = {
  location: { city: string; country: string };
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    precipitation: number;
    wind: number;
    weathercode: number;
  };
  hourly: {
    time: string[];
    temperature: number[];
    precipitation: number[];
    weathercode: number[];
  };
  daily: {
    time: string[];
    maxTemp: number[];
    minTemp: number[];
    precipitation: number[];
    weathercode: number[];
  };
};

type WeatherContextValue = {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  units: Units;
  updateUnits: (type: keyof Units, value: Units[keyof Units]) => void;
  fetchWeather: (city: string) => Promise<void>;
  retry: (cityOverride?: string) => Promise<void>;
  lastCity: string | null;
};

const WeatherContext = createContext<WeatherContextValue | null>(null);

const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastCity, setLastCity] = useState<string | null>(null);

  const [units, setUnits] = useState<Units>({
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  const updateUnits = (type: keyof Units, value: Units[keyof Units]) => {
    setUnits((prev) => ({ ...prev, [type]: value }));
  };

  const fetchWeather = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    setLastCity(city);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1`
      );
      const geoData = await geoRes.json();
      if (!geoData.results?.length) throw new Error("City not found");

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weathercode&hourly=temperature_2m,precipitation_probability,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode`
      );
      const data = await weatherRes.json();

      const formatted: WeatherData = {
        location: { city: name, country },
        current: {
          temperature: data.current.temperature_2m,
          feelsLike: data.current.apparent_temperature,
          humidity: data.current.relative_humidity_2m,
          precipitation: data.current.precipitation,
          wind: data.current.wind_speed_10m,
          weathercode: data.current.weathercode,
        },
        hourly: {
          time: data.hourly.time,
          temperature: data.hourly.temperature_2m,
          precipitation: data.hourly.precipitation_probability,
          weathercode: data.hourly.weathercode,
        },
        daily: {
          time: data.daily.time,
          maxTemp: data.daily.temperature_2m_max,
          minTemp: data.daily.temperature_2m_min,
          precipitation: data.daily.precipitation_sum,
          weathercode: data.daily.weathercode,
        },
      };

      setWeatherData(formatted);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const retry = useCallback(
    async (cityOverride?: string) => {
      const city = cityOverride ?? lastCity;
      if (!city) return;
      await fetchWeather(city);
    },
    [fetchWeather, lastCity]
  );

  useEffect(() => {
    fetchWeather("Berlin");
  }, [fetchWeather]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        fetchWeather,
        retry,
        units,
        updateUnits,
        lastCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

function useWeather(): WeatherContextValue {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error("useWeather must be used within a WeatherProvider");
  return ctx;
}

export { useWeather, WeatherProvider };
