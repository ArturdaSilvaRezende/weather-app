import { useWeather } from "../../../../hooks/useWeather";
import { getIconKeyFromWMO, ICONS } from "../../../../utils/getIconKey";
import "./styles.css";

export default function ForecastToday() {
  const { weatherData, units } = useWeather();

  console.log(units);

  const code = weatherData?.current?.weathercode as number | undefined;
  const iconKey = getIconKeyFromWMO(code);
  const iconSrc = ICONS[iconKey];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const temperature =
    units.temperature === "fahrenheit"
      ? (weatherData?.current?.temperature * 9) / 5 + 32
      : weatherData?.current?.temperature;

  const wind =
    units.wind === "mph"
      ? weatherData?.current?.wind * 0.621371
      : weatherData?.current?.wind;

  const precipitation =
    units.precipitation === "in"
      ? weatherData?.current?.precipitation / 25.4
      : weatherData?.current?.precipitation;

  return (
    <>
      <div
        className="h-[280px] rounded-[20px] p-6 flex justify-between items-center
      background__image max-sm:flex-col responsive__md"
      >
        <div className="">
          <h1 className="text-[28px] font-bold">
            {weatherData?.location?.city}, {weatherData?.location?.country}
          </h1>
          <p>{formatDate(new Date().toISOString())}</p>
        </div>

        <figure className="flex items-center justify-center">
          <img src={iconSrc} alt="icon weather" className="w-24" />

          <figcaption className="text-[100px] font-bold italic max-sm:ml-3">
            {Math.round(temperature)}°
          </figcaption>
        </figure>
      </div>

      <div className="mt-7 flex gap-5 flex-wrap max-sm:gap-5 max-sm:justify-between responsive__md">
        <div
          className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col 
        border-2 border-[var(--neutral-600)] max-sm:w-[160px] responsive__card--md"
        >
          <h2 className="text-[var(--neutral-300)]  mb-3">Feels Like</h2>
          <p className="text-[26px] max-sm:text-[22px]">
            {weatherData?.current?.feelsLike}°
          </p>
        </div>
        <div
          className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col 
        border-2 border-[var(--neutral-600)] max-sm:w-[160px] responsive__card--md"
        >
          <h2 className="text-[var(--neutral-300)] mb-3">Humidity</h2>
          <p className="text-[26px] max-sm:text-[22px]">
            {weatherData?.current?.humidity}%
          </p>
        </div>
        <div
          className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col 
        border-2 border-[var(--neutral-600)] max-sm:w-[160px] responsive__card--md"
        >
          <h2 className="text-[var(--neutral-300)] mb-3">Wind</h2>
          <p className="text-[26px] max-sm:text-[22px]">
            {Math.round(wind)} {units.wind === "mph" ? "mph" : "km/h"}
          </p>
        </div>
        <div
          className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col 
        border-2 border-[var(--neutral-600)] max-sm:w-[160px] responsive__card--md"
        >
          <h2 className="text-[var(--neutral-300)] mb-3">Precipitation</h2>
          <p className="text-[26px] max-sm:text-[22px]">
            {precipitation?.toFixed(1)}{" "}
            {units.precipitation === "inch" ? "in" : "mm"}
          </p>
        </div>
      </div>
    </>
  );
}
