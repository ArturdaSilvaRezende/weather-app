import { WeatherProvider } from "./hooks/useWeather";
import Header from "./components/Header";
import SearchPlace from "./components/SearchPlace";
import WeatherContainer from "./components/WeatherContainer";
import Footer from "./components/Footer";

function App() {
  return (
    <WeatherProvider>
      <main>
        <Header />
        <SearchPlace />
        <WeatherContainer />
        <Footer />
      </main>
    </WeatherProvider>
  );
}

export default App;
