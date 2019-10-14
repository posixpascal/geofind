import {COUNTRIES} from "./countries";
import {COUNTRY_NAMES_DE} from "./translations/countryNamesDE";

export const TRANSLATED_COUNTRIES = COUNTRIES.map(country => {
  (country as any).countryNameDe = (COUNTRY_NAMES_DE as any)[country.country_code] || country.name;
  return country;
});
