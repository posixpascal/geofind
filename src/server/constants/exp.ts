export enum Experience {
  COUNTRY_HIT = "COUNTRY_HIT",
  FIRST_TRY_HIT = "FIRST_TRY_HIT",
  FAST_HIT = "FAST_HIT",
  SECOND_TRY_HIT = "SECOND_TRY_HIT",
}

export const ExperienceValue = {
  [Experience.COUNTRY_HIT]: 30,
  [Experience.SECOND_TRY_HIT]: 20,
  [Experience.FAST_HIT]: 50,
  [Experience.FIRST_TRY_HIT]: 70,
};
