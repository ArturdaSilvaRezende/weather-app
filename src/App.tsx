import { WeatherProvider } from "./hooks/useWeather";
import Header from "./components/Header";
import SearchPlace from "./components/SearchPlace";
import WeatherContainer from "./components/WeatherContainer";

function App() {
  return (
    <WeatherProvider>
      <main>
        <Header />
        <SearchPlace />
        <WeatherContainer />
      </main>
    </WeatherProvider>
  );
}

export default App;
