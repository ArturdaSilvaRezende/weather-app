import { useWeather } from "../../../../hooks/useWeather";
import { getIconKeyFromWMO, ICONS } from "../../../../utils/getIconKey";

export default function DailyForecast() {
  const { weatherData, loading } = useWeather();
  const code = weatherData?.current?.weathercode as number | undefined;
  const iconKey = getIconKeyFromWMO(code);
  const iconSrc = ICONS[iconKey];
  const daily = weatherData?.daily;

  const isReady = !!weatherData?.current && !loading;
  return (
    <>
      <h1 className="mt-10 mb-5 responsive__md">Daily Forecast</h1>
      <div className="flex gap-4 flex-wrap overflow-x-auto responsive__md">
        {daily?.time?.map((date: string, i: number) => (
          <div
            key={date}
            className="bg-[var(--neutral-700)] w-[99px] p-3 rounded-[12px] flex flex-col items-center
            max-sm:w-[98px]"
          >
            {isReady ? (
              <>
                <p className="text-sm mb-2 text-[16px]">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>

                <img
                  src={iconSrc}
                  alt="Weather icon"
                  className="w-[60px] h-[60px] mb-2"
                />

                <div className="flex justify-between items-center w-full">
                  <p className="text-lg font-bold max-sm:text-[16px]">
                    {Math.round(daily.maxTemp[i])}°
                  </p>
                  <p className="text-lg font-bold max-sm:text-[16px]">
                    {Math.round(daily.minTemp[i])}°
                  </p>
                </div>
              </>
            ) : (
              <div className=" py-10 text-[transparent]">.</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
