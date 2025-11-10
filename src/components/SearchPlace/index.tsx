import { useEffect, useState } from "react";
import { useWeather } from "../../hooks/useWeather";
import IconSearch from "../../assets/images/icon-search.svg";

export default function SearchPlace() {
  const { fetchWeather, loading } = useWeather();
  const [searchInput, setSearchInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("weather_search_history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const addToHistory = (city: string) => {
    setHistory((prev) => {
      const updated = [
        city,
        ...prev.filter((item) => item.toLowerCase() !== city.toLowerCase()),
      ].slice(0, 5);
      localStorage.setItem("weather_search_history", JSON.stringify(updated));
      return updated;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (city: string) => {
    setSearchInput(city);
    setShowSuggestions(false);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = searchInput.trim();
    if (!city) return;
    fetchWeather(city);
    addToHistory(city);
    setShowSuggestions(false);
  };

  return (
    <section className="container sm:mt-[70px] max-lg:mx-auto relative">
      <h1
        className="max-sm:p-[40px] max-sm:text-5xl text-6xl text-center font-[500] 
        leading-tight sm:mb-[60px]"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        How's the sky looking today?
      </h1>

      <form
        className="max-sm:w-11/12 sm:flex sm:justify-center sm:gap-5 mx-auto relative"
        onSubmit={handleSearch}
        noValidate
      >
        <div className="bg-[var(--neutral-700)] px-3 py-2 rounded-[10px] flex flex-col gap-2 sm:w-[520px] relative">
          <div className="flex justify-between items-center gap-2">
            <img src={IconSearch} alt="Search Icon" />
            <input
              type="text"
              name="city"
              placeholder="Search for a city"
              className="sm:py-2 sm:px-4 sm:w-[120px] flex-1 bg-transparent outline-none"
              value={searchInput}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              autoComplete="off"
              aria-label="Search city"
              required
            />
          </div>

          {showSuggestions && history.length > 0 && (
            <ul
              className="absolute top-[100%] left-0 w-full bg-[var(--neutral-700)] border 
            border-[var(--neutral-600)] rounded-[8px] mt-1 shadow-md z-10"
            >
              {history.map((item, index) => (
                <li
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-[var(--neutral-600)] transition"
                  onMouseDown={() => handleSelectSuggestion(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="bg-[var(--blue-500)] hover:bg-[var(--blue-700)] px-3 py-2 rounded-[10px] 
          max-sm:mt-3 max-sm:w-full transition duration-300 ease-in-out cursor-pointer 
          w-[120px] text-center"
          disabled={loading || !searchInput.trim()}
          aria-busy={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2 text-[12px]">
              Searching…
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-50"
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
            </span>
          ) : (
            "Search"
          )}
        </button>
      </form>
    </section>
  );
}
