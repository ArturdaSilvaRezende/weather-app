import IconSunny from "../assets/images/icon-sunny.webp";
import IconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import IconOvercast from "../assets/images/icon-overcast.webp";
import IconFog from "../assets/images/icon-fog.webp";
import IconDrizzle from "../assets/images/icon-drizzle.webp";
import IconRain from "../assets/images/icon-rain.webp";
import IconSnow from "../assets/images/icon-snow.webp";
import IconStorm from "../assets/images/icon-storm.webp";

export function getIconKeyFromWMO(
  code?: number
): keyof typeof ICONS | "default" {
  if (code === undefined || code === null) return "default";
  if (code === 0) return "sunny";
  if (code === 1 || code === 2) return "partlyCloudy";
  if (code === 3) return "overcast";
  if (code === 45 || code === 48) return "fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "storm";
  return "default";
}

export const ICONS = {
  sunny: IconSunny,
  partlyCloudy: IconPartlyCloudy,
  overcast: IconOvercast,
  fog: IconFog,
  drizzle: IconDrizzle,
  rain: IconRain,
  snow: IconSnow,
  storm: IconStorm,
  default: IconOvercast,
} as const;
