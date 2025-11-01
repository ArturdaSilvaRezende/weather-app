import { useEffect, useMemo, useState } from "react";
import { useWeather } from "../../../../hooks/useWeather";
import { getIconKeyFromWMO, ICONS } from "../../../../utils/getIconKey";

const fmtDay = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date(iso));
const fmtHour = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
  }).format(new Date(iso));
const dateKey = (iso: string) => iso.split("T")[0];

export default function HourlyForecast() {
  const { weatherData } = useWeather();

  if (!weatherData?.hourly || !weatherData?.daily) return null;

  const daysISO: string[] = weatherData.daily.time;
  const [selectedDate, setSelectedDate] = useState<string>(daysISO[0]);

  useEffect(() => {
    if (daysISO?.length) setSelectedDate(daysISO[0]);
  }, [daysISO?.[0]]);

  const hourIdxForDay = useMemo(() => {
    const key = dateKey(selectedDate);
    const idxs: number[] = [];
    const times: string[] = weatherData.hourly.time;
    for (let i = 0; i < times.length; i++) {
      if (dateKey(times[i]) === key) idxs.push(i);
    }
    return idxs;
  }, [selectedDate, weatherData.hourly.time]);

  return (
    <div className="bg-[var(--neutral-700)] rounded-[20px] p-6 max-h-[632px] overflow-y-auto pb-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Hourly forecast</h2>

        <select
          className="bg-[var(--neutral-800)] border border-[var(--neutral-600)] rounded-md px-3 py-2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {daysISO.map((iso) => (
            <option key={iso} value={iso}>
              {fmtDay(iso)}
            </option>
          ))}
        </select>
      </div>

      <ul className="flex flex-col gap-3">
        {hourIdxForDay.map((i) => {
          const hourISO = weatherData.hourly.time[i];
          const temp = Math.round(
            weatherData.hourly.temperature_2m?.[i] ??
              weatherData.hourly.temperature?.[i] ??
              0
          );
          const wCode = weatherData.hourly.weathercode?.[i];
          const iconKey = getIconKeyFromWMO(wCode);
          const iconSrc = ICONS[iconKey];

          return (
            <li
              key={hourISO}
              className="flex items-center justify-between bg-[var(--neutral-800)] px-3 py-3 rounded-[12px] shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={iconSrc}
                  alt="weather icon"
                  className="w-7 h-7 object-contain"
                />
                <span className="text-[16px] font-medium">
                  {fmtHour(hourISO)}
                </span>
              </div>
              <span className="text-[18px] font-semibold">{temp}°</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
