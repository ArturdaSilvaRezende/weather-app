// Header.tsx
import { useState } from "react";
import { useWeather } from "../../hooks/useWeather";

import GroupUnits from "./components/GroupUnits";

import Logo from "../../assets/images/logo.svg";
import IconUnits from "../../assets/images/icon-units.svg";
import IconDropdown from "../../assets/images/icon-dropdown.svg";

export default function Header() {
  const [isOpenModalUnits, setIsOpenModalUnits] = useState(false);
  const { units, updateUnits } = useWeather();

  const handleModalUnits = () => {
    setIsOpenModalUnits(!isOpenModalUnits);
  };

  return (
    <>
      <header
        className="container mx-auto flex justify-between items-center relative sm:mt-[40px] 
      max-sm:px-5 responsive__md"
      >
        <a href="/" className="max-sm:w-36 relative top-2">
          <img src={Logo} alt="Logo Weather App" />
        </a>

        <button
          id="units-button"
          type="button"
          className="flex items-center gap-2 bg-[var(--neutral-700)] px-3 py-2 rounded-[10px] border-2 
          border-transparent hover:border-[var(--neutral-0)] cursor-pointer max-sm:mt-3"
          onClick={handleModalUnits}
          aria-expanded={isOpenModalUnits}
        >
          <img src={IconUnits} alt="icon units" aria-hidden />
          <span>Units</span>
          <img
            src={IconDropdown}
            alt="icon dropdown"
            aria-hidden
            className={`${isOpenModalUnits ? "rotate-180" : ""}`}
          />
        </button>
      </header>

      {isOpenModalUnits && (
        <div
          id="menu-units"
          role="menu"
          className="absolute top-[100px] right-[35px] w-[260px] bg-[var(--neutral-700)] py-2 px-2 rounded-[10px] border-[var(--neutral-600)] border-2 z-50"
        >
          {/* Temperature */}
          <GroupUnits
            label="Temperature"
            options={[
              { key: "celsius", label: "Celsius (°C)" },
              { key: "fahrenheit", label: "Fahrenheit (°F)" },
            ]}
            current={units.temperature}
            onSelect={(val) => updateUnits("temperature", val as any)}
          />

          {/* Wind Speed */}
          <GroupUnits
            label="Wind Speed"
            options={[
              { key: "kmh", label: "km/h" },
              { key: "mph", label: "mph" },
            ]}
            current={units.wind}
            onSelect={(val) => updateUnits("wind", val as any)}
          />

          {/* Precipitation */}
          <GroupUnits
            label="Precipitation"
            options={[
              { key: "mm", label: "Millimeters (mm)" },
              { key: "inch", label: "Inches (in)" },
            ]}
            current={units.precipitation}
            onSelect={(val) => updateUnits("precipitation", val as any)}
          />
        </div>
      )}
    </>
  );
}
