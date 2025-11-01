import { useWeather } from "../../../../hooks/useWeather";
import { getIconKeyFromWMO, ICONS } from "../../../../utils/getIconKey";

export default function DailyForecast() {
  const { weatherData } = useWeather();
  const code = weatherData?.current?.weathercode as number | undefined;
  const iconKey = getIconKeyFromWMO(code);
  const iconSrc = ICONS[iconKey];
  const daily = weatherData?.daily;

  return (
    <>
      <h1 className="mt-10 mb-5">Daily Forecast</h1>
      <div className="flex gap-4 overflow-x-auto">
        {daily?.time?.map((date: string, i: number) => (
          <div
            key={date}
            className="bg-[var(--neutral-700)] w-[120px] p-3 rounded-[12px] flex flex-col items-center"
          >
            <p className="text-sm mb-2">
              {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
            </p>

            <img
              src={iconSrc}
              alt="Weather icon"
              className="w-[40px] h-[40px] mb-2"
            />

            <div className="flex justify-between items-center w-full">
              <p className="text-lg font-bold">
                {Math.round(daily.maxTemp[i])}°
              </p>
              <p className="text-lg font-bold">
                {Math.round(daily.minTemp[i])}°
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
