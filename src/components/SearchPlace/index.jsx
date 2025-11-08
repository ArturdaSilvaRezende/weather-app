import { useState } from "react";
import { useWeather } from "../../hooks/useWeather";
import IconSearch from "../../assets/images/icon-search.svg";

export default function SearchPlace() {
  const { fetchWeather } = useWeather();
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    fetchWeather(searchInput);
  };

  return (
    <section className="container sm:mt-[70px] max-lg:mx-auto">
      <h1
        className="max-sm:p-[40px] max-sm:text-5xl text-6xl text-center font-[500] leading-tight 
        sm:mb-[60px]"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        How's the sky looking today?
      </h1>

      <form className="max-sm:w-11/12 sm:flex sm:justify-center sm:gap-5 mx-auto">
        <div
          className="bg-[var(--neutral-700)] px-3 py-2 rounded-[10px] flex justify-between items-center 
        gap-2 sm:w-[520px]"
        >
          <img src={IconSearch} alt="Search Icon" />
          <input
            type="text"
            placeholder="Search for a city"
            className="sm:py-2 sm:px-4 sm:w-[120px]"
            value={searchInput}
            onChange={handleInputChange}
          />
        </div>

        <button
          type="button"
          className="bg-[var(--neutral-800)] hover:bg-[var(--blue-700)] px-3 py-2 rounded-[10px] max-sm:mt-3 
          max-sm:w-full transition duration-300 ease-in-out cursor-pointer w-[120px]"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
    </section>
  );
}
