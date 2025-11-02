// Header.tsx
import { useState } from "react";
import { useWeather } from "../../hooks/useWeather";
import Logo from "../../assets/images/logo.svg";
import IconUnits from "../../assets/images/icon-units.svg";
import IconDropdown from "../../assets/images/icon-dropdown.svg";

export default function Header() {
  const [isOpenModalUnits, setIsOpenModalUnits] = useState(false);
  const { units, updateUnits, setPreset } = useWeather();

  return (
    <>
      <header className="container mx-auto flex justify-between items-center relative sm:mt-[40px]">
        <a href="/" className="max-sm:w-36 relative top-2">
          <img src={Logo} alt="Logo Weather App" />
        </a>

        <button
          id="units-button"
          type="button"
          className="flex items-center gap-2 bg-[var(--neutral-700)] px-3 py-2 rounded-[10px] border-2 
          border-transparent hover:border-[var(--neutral-0)] cursor-pointer"
          onClick={() => setIsOpenModalUnits((s) => !s)}
          aria-expanded={isOpenModalUnits}
        >
          <img src={IconUnits} alt="" aria-hidden />
          <span>Units</span>
          <img
            src={IconDropdown}
            alt=""
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
          {/* Preset opcional */}
          <button
            onClick={() =>
              setPreset(units.temperature === "celsius" ? "imperial" : "metric")
            }
            className="w-full text-left rounded-[10px] py-2 px-3 hover:bg-[var(--neutral-800)]"
          >
            {units.temperature === "celsius" ? "Switch to Imperial" : "Metric"}
          </button>

          {/* Temperature */}
          <Group
            label="Temperature"
            options={[
              { key: "celsius", label: "Celsius (°C)" },
              { key: "fahrenheit", label: "Fahrenheit (°F)" },
            ]}
            current={units.temperature}
            onSelect={(val) => updateUnits("temperature", val as any)}
          />

          {/* Wind Speed */}
          <Group
            label="Wind Speed"
            options={[
              { key: "kmh", label: "km/h" },
              { key: "mph", label: "mph" },
            ]}
            current={units.wind}
            onSelect={(val) => updateUnits("wind", val as any)}
          />

          {/* Precipitation */}
          <Group
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

function Group({
  label,
  options,
  current,
  onSelect,
}: {
  label: string;
  options: { key: string; label: string }[];
  current: string;
  onSelect: (val: string) => void;
}) {
  return (
    <ul
      role="group"
      aria-label={label}
      className="mt-2 border-t-2 border-[var(--neutral-600)] pt-2"
    >
      <li className="text-[var(--neutral-300)] px-3 text-[16px]">{label}</li>
      {options.map((op) => (
        <li
          key={op.key}
          role="menuitemradio"
          aria-checked={current === op.key}
          className={`rounded-[10px] py-2 px-3 cursor-pointer ${
            current === op.key
              ? "bg-[var(--neutral-800)]"
              : "hover:bg-[var(--neutral-800)]"
          }`}
          onClick={() => onSelect(op.key)}
        >
          {op.label}
        </li>
      ))}
    </ul>
  );
}
