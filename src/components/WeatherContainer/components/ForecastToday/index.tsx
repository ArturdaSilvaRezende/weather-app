import { useWeather } from "../../../../hooks/useWeather";
import { getIconKeyFromWMO, ICONS } from "../../../../utils/getIconKey";
import "./styles.css";

export default function ForecastToday() {
  const { weatherData, units, loading } = useWeather();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // ------ Helpers de unidade ------
  const tempSuffix = units?.temperature === "fahrenheit" ? "°F" : "°C";
  const windSuffix = units?.wind === "mph" ? "mph" : "km/h";
  const precipSuffix = units?.precipitation === "inch" ? "in" : "mm";

  // ------ Dados (com fallbacks p/ evitar undefined) ------
  const code = weatherData?.current?.weathercode as number | undefined;
  const iconKey = getIconKeyFromWMO(code);
  const iconSrc = ICONS[iconKey];

  const temperature =
    units?.temperature === "fahrenheit"
      ? ((weatherData?.current?.temperature ?? 0) * 9) / 5 + 32
      : weatherData?.current?.temperature ?? 0;

  const feelsLike =
    units?.temperature === "fahrenheit"
      ? ((weatherData?.current?.feelsLike ?? 0) * 9) / 5 + 32
      : weatherData?.current?.feelsLike ?? 0;

  const wind =
    units?.wind === "mph"
      ? (weatherData?.current?.wind ?? 0) * 0.621371
      : weatherData?.current?.wind ?? 0;

  const precipitation =
    units?.precipitation === "inch"
      ? (weatherData?.current?.precipitation ?? 0) / 25.4
      : weatherData?.current?.precipitation ?? 0;

  const isReady = !!weatherData?.current && !loading;

  // ------ Skeletons ------
  const SkeletonBar = ({ className = "" }: { className?: string }) => (
    <div
      className={`bg-[var(--neutral-600)] animate-pulse rounded ${className}`}
    />
  );

  const SkeletonLoadingHero = () => (
    <div
      className="bg-[var(--neutral-700)] min-h-[280px] min-w-[770px] rounded-[20px] p-6 flex justify-center
      items-center max-sm:flex-col responsive__md overflow-hidden text-[transparent] animate-pulse"
    >
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  const text = "...";

  const SkeletonHero = () => (
    <div
      className="h-[280px]  p-6 flex justify-between items-center max-sm:flex-col responsive__md overflow-hidden"
      aria-hidden="true"
    >
      <div className="">
        <SkeletonLoadingHero />
      </div>
    </div>
  );

  const SkeletonCard = () => (
    <div className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] border-2 border-[var(--neutral-600)] max-sm:w-[160px] responsive__card--md overflow-hidden">
      <SkeletonBar className="h-4 w-24 mb-3" />
      <SkeletonBar className="h-6 w-20" />
    </div>
  );

  return (
    <>
      {/* HERO */}
      {isReady ? (
        <div
          className="h-[280px] rounded-[20px] p-6 flex justify-between items-center
          background__image max-sm:flex-col responsive__md"
        >
          <div>
            <h1 className="text-[28px] font-bold">
              {weatherData?.location?.city}, {weatherData?.location?.country}
            </h1>
            <p>{formatDate(new Date().toISOString())}</p>
          </div>

          <figure className="flex items-center justify-center gap-4">
            <img src={iconSrc} alt="icon weather" className="w-24" />
            <figcaption className="text-[100px] font-bold italic max-sm:ml-3">
              {Math.round(temperature)}
              {tempSuffix}
            </figcaption>
          </figure>
        </div>
      ) : (
        <SkeletonHero />
      )}

      {/* CARDS */}
      <div className="mt-7 flex gap-5 flex-wrap max-sm:gap-5 max-sm:justify-between responsive__md">
        {isReady ? (
          <>
            {/* Feels Like */}
            <div className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col border-2 border-[var(--neutral-600)] max-sm:w-[160px] responsive__card--md">
              <h2 className="text-[var(--neutral-300)] mb-3">Feels Like</h2>
              <p className="text-[26px] max-sm:text-[22px]">
                {Math.round(feelsLike)}
                {tempSuffix}
              </p>
            </div>

            {/* Humidity */}
            <div className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col border-2 border-[var(--neutral-600)] max-sm:w-[160px] responsive__card--md">
              <h2 className="text-[var(--neutral-300)] mb-3">Humidity</h2>
              <p className="text-[26px] max-sm:text-[22px]">
                {weatherData?.current?.humidity ?? 0}%
              </p>
            </div>

            {/* Wind */}
            <div className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col border-2 border-[var(--neutral-600)] max-sm:w-[160px] responsive__card--md">
              <h2 className="text-[var(--neutral-300)] mb-3">Wind</h2>
              <p className="text-[26px] max-sm:text-[22px]">
                {Math.round(wind)} {windSuffix}
              </p>
            </div>

            {/* Precipitation */}
            <div className="bg-[var(--neutral-700)] w-[23%] pt-[16px] pb-2 px-6 rounded-[12px] flex flex-col border-2 border-[var(--neutral-600)] max-sm:w-[160px] responsive__card--md">
              <h2 className="text-[var(--neutral-300)] mb-3">Precipitation</h2>
              <p className="text-[26px] max-sm:text-[22px]">
                {precipitation.toFixed(1)} {precipSuffix}
              </p>
            </div>
          </>
        ) : (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>
    </>
  );
}
