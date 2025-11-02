import DailyForecast from "./components/DailyForecast";
import ForecastToday from "./components/ForecastToday";
import HourlyForecast from "./components/HourlyForecast";

export default function WeatherContainer() {
  return (
    <section
      className="container mx-auto grid grid-cols-[1fr_465px] mt-12 
    max-lg:grid-cols-1"
    >
      <div className="max-w-[795px] max-sm:px-4">
        <ForecastToday />
        <DailyForecast />
      </div>

      <HourlyForecast />
    </section>
  );
}
