import { WeatherProvider } from "./hooks/useWeather";
import Header from "./components/Header";
import ContentMain from "./components/ContentMain";
import Footer from "./components/Footer";

function App() {
  return (
    <WeatherProvider>
      <main>
        <Header />
        <ContentMain />
        <Footer />
      </main>
    </WeatherProvider>
  );
}

export default App;
