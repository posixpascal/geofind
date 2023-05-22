import {ADJECTIVES, ANIMALS} from "@/server/constants/words";
import {LocaleName} from "../../types";

export const randomName = (locale: LocaleName = "en") => {
  console.log(locale);
  const adjective = ADJECTIVES[locale].at(
    Math.floor(Math.random() * ADJECTIVES[locale].length)
  );
  const animal = ANIMALS[locale].at(
    Math.floor(Math.random() * ANIMALS[locale].length)
  );

  return `${adjective} ${animal}`;
};
