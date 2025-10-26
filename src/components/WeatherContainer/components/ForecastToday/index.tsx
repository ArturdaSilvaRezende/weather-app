import { useWeather } from "../../../../hooks/useWeather";
import BgTodayLarge from "../../../../assets/images/bg-today-large.svg";

export default function ForecastToday() {
  const { weatherData, loading, error, fetchWeather } = useWeather();

  return (
    <>
      <div
        className="h-[280px] rounded-[20px] p-6 flex justify-between items-center"
        style={{ backgroundImage: `url(${BgTodayLarge})` }}
      >
        <div>
          <h1 className="text-[28px] font-bold">Berlin, Germany</h1>
          <p>Tuesday, Aug 5, 205</p>
        </div>

        <figure>
          <figcaption className="text-[100px] font-bold italic">20°</figcaption>
        </figure>
      </div>

      <div className="mt-7 flex gap-5">
        <div
          className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col 
        border-2 border-[var(--neutral-600)]"
        >
          <h2 className="text-[var(--neutral-300)] mb-3">Feels Like</h2>
          <p className="text-[30px]">18°</p>
        </div>
        <div
          className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col 
        border-2 border-[var(--neutral-600)]"
        >
          <h2 className="text-[var(--neutral-300)] mb-3">Humidity</h2>
          <p className="text-[30px]">46%</p>
        </div>
        <div
          className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col 
        border-2 border-[var(--neutral-600)]"
        >
          <h2 className="text-[var(--neutral-300)] mb-3">Wind</h2>
          <p className="text-[30px]">14 km/h</p>
        </div>
        <div
          className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col 
        border-2 border-[var(--neutral-600)]"
        >
          <h2 className="text-[var(--neutral-300)] mb-3">Precipitation</h2>
          <p className="text-[30px]">0 mm</p>
        </div>
      </div>
    </>
  );
}
