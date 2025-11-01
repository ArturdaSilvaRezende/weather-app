import { useWeather } from "../../../../hooks/useWeather";
import BgTodayLarge from "../../../../assets/images/bg-today-large.svg";
import { getIconKeyFromWMO, ICONS } from "../../../../utils/getIconKey";

export default function ForecastToday() {
  const { weatherData } = useWeather();

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

  return (
    <>
      <div
        className="h-[280px]  rounded-[20px] p-6 flex justify-between items-center"
        style={{ backgroundImage: `url(${BgTodayLarge})` }}
      >
        <div>
          <h1 className="text-[28px] font-bold">
            {weatherData?.location?.city}, {weatherData?.location?.country}
          </h1>
          <p>{formatDate(new Date().toISOString())}</p>
        </div>

        <figure className="flex items-center justify-center">
          <img src={iconSrc} alt="icon weather" className="w-24" />

          <figcaption className="text-[100px] font-bold italic">
            {weatherData?.current?.temperature}°
          </figcaption>
        </figure>
      </div>

      <div className="mt-7 flex gap-5">
        <div
          className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col 
        border-2 border-[var(--neutral-600)]"
        >
          <h2 className="text-[var(--neutral-300)] mb-3">Feels Like</h2>
          <p className="text-[26px]">{weatherData?.current?.feelsLike}°</p>
        </div>
        <div
          className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col 
        border-2 border-[var(--neutral-600)]"
        >
          <h2 className="text-[var(--neutral-300)] mb-3">Humidity</h2>
          <p className="text-[26px]">{weatherData?.current?.humidity}%</p>
        </div>
        <div
          className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col 
        border-2 border-[var(--neutral-600)]"
        >
          <h2 className="text-[var(--neutral-300)] mb-3">Wind</h2>
          <p className="text-[26px]">{weatherData?.current?.wind} km/h</p>
        </div>
        <div
          className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col 
        border-2 border-[var(--neutral-600)]"
        >
          <h2 className="text-[var(--neutral-300)] mb-3">Precipitation</h2>
          <p className="text-[26px]">
            {weatherData?.current?.precipitation} mm
          </p>
        </div>
      </div>
    </>
  );
}
