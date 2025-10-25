import { useState } from "react";

import Logo from "../../assets/images/logo.svg";
import IconUnits from "../../assets/images/icon-units.svg";
import IconDropdown from "../../assets/images/icon-dropdown.svg";

export default function Header() {
  const [isSwitch, setIsSwitch] = useState(false);

  const handleIsSwitch = () => {
    setIsSwitch(!isSwitch);
  };

  return (
    <>
      <header className="max-sm:py-4 max-sm:max-w-full px-5 flex justify-between items-center relative">
        <a href="/" className="max-sm:w-36 relative max-sm:top-2">
          <img src={Logo} alt="Logo Weather App" />
        </a>

        <button
          type="button"
          className="flex justify-between items-center w-32 transition duration-300 ease-in-out  
        bg-[var(--neutral-700)] px-3 py-2 rounded-[10px] mt-4 cursor-pointer border__hover--white"
        >
          <img src={IconUnits} alt="Icon Units" />
          <span>Units</span>
          <img src={IconDropdown} alt="Icon Dropdown" />
        </button>
      </header>

      <div
        className="absolute top-[90px] right-[22px] w-[240px] bg-[var(--neutral-700)] py-2 px-2
      rounded-[10px] border-[var(--neutral-600)] border-2"
      >
        <button
          onClick={handleIsSwitch}
          className="hover:bg-[var(--neutral-800)] w-full cursor-pointer rounded-[10px] py-2 px-3
          text-left transition duration-300 ease-in-out"
        >
          {isSwitch ? "Metric" : "Switch to Imperial"}
        </button>

        <ul className="mt-1">
          <li className="text-[var(--neutral-300)] px-3 text-[16px]">
            Temperature
          </li>
          <li
            className="hover:bg-[var(--neutral-800)] transition duration-300 ease-in-out cursor-pointer
          rounded-[10px] py-2 px-3"
          >
            Celsius (°C)
          </li>
          <li
            className="hover:bg-[var(--neutral-800)] transition duration-300 ease-in-out cursor-pointer
          rounded-[10px] py-2 px-3"
          >
            Fahrenheit (°F)
          </li>
        </ul>

        <hr className="border-[var(--neutral-300)] h-1 my-2" />

        <ul>
          <li>Wind Speed</li>
          <li>km/h</li>
          <li>mph</li>
        </ul>

        <ul>
          <li>Precipitation</li>
          <li>Millimeters (mm)</li>
          <li>Inches (in)</li>
        </ul>
      </div>
    </>
  );
}
