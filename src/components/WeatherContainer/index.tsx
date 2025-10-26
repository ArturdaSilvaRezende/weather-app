import DailyForecast from "./components/DailyForecast";
import ForecastToday from "./components/ForecastToday";
import HourlyForecast from "./components/HourlyForecast";

export default function WeatherContainer() {
  return (
    <section className="container mx-auto flex justify-between gap-5 mt-12">
      <div className="w-full">
        <ForecastToday />
        <DailyForecast />
      </div>

      <HourlyForecast />
    </section>
  );
}
