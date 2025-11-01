import DailyForecast from "./components/DailyForecast";
import ForecastToday from "./components/ForecastToday";
import HourlyForecast from "./components/HourlyForecast";

export default function WeatherContainer() {
  return (
    <section className="container mx-auto grid grid-cols-[1fr_465px] mt-12">
      <div className="w-[795px]">
        <ForecastToday />
        <DailyForecast />
      </div>

      <HourlyForecast />
    </section>
  );
}
