import { useEffect, useMemo, useState } from "react";
import { useWeather } from "../../../../hooks/useWeather";
import { getIconKeyFromWMO, ICONS } from "../../../../utils/getIconKey";

const fmtDay = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date(iso));
const fmtHour = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: true }).format(
    new Date(iso)
  );
const dateKey = (iso: string) => iso.split("T")[0];

export default function HourlyForecast() {
  const { weatherData, units, loading } = useWeather();

  const daysISO: string[] = weatherData?.daily?.time ?? [];
  const hourlyTimes: string[] = weatherData?.hourly?.time ?? [];
  const hourlyTemps: number[] = weatherData?.hourly?.temperature ?? [];
  const hourlyCodes: number[] = weatherData?.hourly?.weathercode ?? [];

  const tempSuffix = units?.temperature === "fahrenheit" ? "°F" : "°C";

  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    if (daysISO.length) setSelectedDate(daysISO[0]);
    else setSelectedDate("");
  }, [daysISO]);

  const hourIdxForDay = useMemo(() => {
    if (!selectedDate || !hourlyTimes.length) return [];
    const key = dateKey(selectedDate);
    const idxs: number[] = [];
    for (let i = 0; i < hourlyTimes.length; i++) {
      if (dateKey(hourlyTimes[i]) === key) idxs.push(i);
    }
    return idxs;
  }, [selectedDate, hourlyTimes]);

  const SkeletonRow = () => (
    <div className="h-20 w-full rounded-[12px] bg-[var(--neutral-800)] animate-pulse" />
  );

  const SkeletonList = ({ rows = 8 }: { rows?: number }) => (
    <ul
      className="flex flex-col gap-3"
      role="status"
      aria-label="Loading hourly forecast"
    >
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
      <span className="sr-only">Loading...</span>
    </ul>
  );

  return (
    <div className="overflow-y-auto max-h-[654px] pr-2 max-lg:overflow-y-hidden max-sm:mt-10 max-sm:px-5 responsive__md">
      <div className="bg-[var(--neutral-700)] rounded-[20px] p-6 max-lg:px-3 max-lg:pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Hourly forecast</h2>

          <select
            className="bg-[var(--neutral-800)] border border-[var(--neutral-600)] rounded-md px-3 py-2 disabled:opacity-60"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            disabled={!daysISO.length || loading}
            aria-busy={loading}
          >
            {(!daysISO.length || loading) && (
              <option
                className={`${
                  !daysISO.length || loading ? "text-amber-50 text-[30px]" : ""
                }`}
              >
                -
              </option>
            )}
            {!loading &&
              daysISO.map((iso) => (
                <option key={iso} value={iso}>
                  {fmtDay(iso)}
                </option>
              ))}
          </select>
        </div>

        {loading ? (
          <SkeletonList rows={8} />
        ) : !hourIdxForDay.length ? (
          <SkeletonList rows={6} />
        ) : (
          <ul className="flex flex-col gap-3">
            {hourIdxForDay.map((i) => {
              const hourISO = hourlyTimes[i];
              const temp = Math.round(hourlyTemps[i] ?? 0);
              const wCode = hourlyCodes[i];
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

                  <span className="text-[18px] font-semibold">
                    {temp}
                    {tempSuffix}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
