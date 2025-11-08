import { useWeather } from "../../hooks/useWeather";
import SearchPlace from "../SearchPlace";
import SomethingWentWrong from "../SomethingWentWrong";
import WeatherContainer from "../WeatherContainer";

export default function ContentMain() {
  const { retry, error, loading } = useWeather();

  return (
    <>
      {error ? (
        <SomethingWentWrong handleRetry={retry} disabled={loading} />
      ) : (
        <>
          <SearchPlace />
          <WeatherContainer />
        </>
      )}
    </>
  );
}
