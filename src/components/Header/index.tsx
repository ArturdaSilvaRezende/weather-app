import { useState } from "react";

import Logo from "../../assets/images/logo.svg";
import IconUnits from "../../assets/images/icon-units.svg";
import IconDropdown from "../../assets/images/icon-dropdown.svg";

export default function Header() {
  const [isSwitch, setIsSwitch] = useState(false);
  const [isOpenModalUnits, setIsOpenModalUnits] = useState(false);

  const handleIsSwitch = () => {
    setIsSwitch(!isSwitch);
  };

  const handleOpenModalUnits = () => {
    setIsOpenModalUnits(!isOpenModalUnits);
  };

  return (
    <>
      <header
        className="container mx-auto max-sm:py-4 max-sm:max-w-full flex justify-between 
      items-center relative sm:mt-[40px]"
      >
        <a href="/" className="max-sm:w-36 relative top-2">
          <img src={Logo} alt="Logo Weather App" />
        </a>

        <button
          id="units-button"
          type="button"
          className="flex justify-between items-center w-32 transition duration-300 ease-in-out  
  bg-[var(--neutral-700)] px-3 py-2 rounded-[10px] mt-4 cursor-pointer border__hover--white
  max-sm:w-[100px] max-sm:px-2"
          aria-haspopup="menu"
          aria-expanded={isOpenModalUnits}
          aria-controls="menu-units"
          onClick={handleOpenModalUnits}
          style={{
            border: isOpenModalUnits
              ? "2px solid var(--neutral-0)"
              : "2px solid transparent",
          }}
        >
          <img src={IconUnits} alt="" aria-hidden="true" />
          <span className="max-sm:text-[14px]">Units</span>
          <img
            src={IconDropdown}
            alt=""
            aria-hidden="true"
            className={`${isOpenModalUnits ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </header>

      {isOpenModalUnits && (
        <div
          id="menu-units"
          role="menu"
          aria-labelledby="units-button"
          aria-orientation="vertical"
          className="absolute top-[120px] max-sm:top-[87px] right-[63px] max-sm:right-[22px] w-[240px] 
          bg-[var(--neutral-700)] py-2 px-2 rounded-[10px] border-[var(--neutral-600)] border-2 
          fadeIn z-50"
        >
          <button
            onClick={handleIsSwitch}
            className="hover:bg-[var(--neutral-800)] w-full cursor-pointer rounded-[10px] py-2 px-3
      text-left transition duration-300 ease-in-out"
            role="menu-switch"
            tabIndex={-1}
          >
            {isSwitch ? "Metric" : "Switch to Imperial"}
          </button>

          {/* Temperature */}
          <ul
            role="group"
            aria-labelledby="label-temperature"
            className="mt-1 border-b-2 border-[var(--neutral-600)] pb-2"
          >
            <li
              id="label-temperature"
              className="text-[var(--neutral-300)] px-3 text-[16px]"
            >
              Temperature
            </li>
            <li
              role="menuitemradio"
              aria-checked={true}
              tabIndex={-1}
              className="hover:bg-[var(--neutral-800)] transition duration-300 ease-in-out cursor-pointer
        rounded-[10px] py-2 px-3"
            >
              Celsius (°C)
            </li>
            <li
              role="menuitemradio"
              aria-checked={false}
              tabIndex={-1}
              className="hover:bg-[var(--neutral-800)] transition duration-300 ease-in-out cursor-pointer
        rounded-[10px] py-2 px-3"
            >
              Fahrenheit (°F)
            </li>
          </ul>

          {/* Wind Speed */}
          <ul
            role="group"
            aria-labelledby="label-wind"
            className="mt-1 border-b-2 border-[var(--neutral-600)] pt-2 pb-2"
          >
            <li
              id="label-wind"
              className="text-[var(--neutral-300)] px-3 text-[16px]"
            >
              Wind Speed
            </li>
            <li
              role="menuitemradio"
              aria-checked={true}
              tabIndex={-1}
              className="hover:bg-[var(--neutral-800)] transition duration-300 ease-in-out cursor-pointer
        rounded-[10px] py-2 px-3"
            >
              km/h
            </li>
            <li
              role="menuitemradio"
              aria-checked={false}
              tabIndex={-1}
              className="hover:bg-[var(--neutral-800)] transition duration-300 ease-in-out cursor-pointer
        rounded-[10px] py-2 px-3"
            >
              mph
            </li>
          </ul>

          {/* Precipitation */}
          <ul role="group" aria-labelledby="label-precip" className="mt-1 pt-2">
            <li
              id="label-precip"
              className="text-[var(--neutral-300)] px-3 text-[16px]"
            >
              Precipitation
            </li>
            <li
              role="menuitemradio"
              aria-checked={true}
              tabIndex={-1}
              className="hover:bg-[var(--neutral-800)] transition duration-300 ease-in-out cursor-pointer
        rounded-[10px] py-2 px-3"
            >
              Millimeters (mm)
            </li>
            <li
              role="menuitemradio"
              aria-checked={false}
              tabIndex={-1}
              className="hover:bg-[var(--neutral-800)] transition duration-300 ease-in-out cursor-pointer
        rounded-[10px] py-2 px-3"
            >
              Inches (in)
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
