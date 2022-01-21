export const CONTINENTS = {
  AFRICA: 'africa',
  ASIA: 'asia',
  EUROPE: 'europe',
  AMERICA: 'america',
  OCEANIA: 'oceania',
  EARTH: 'earth',
}

export const REGIONS = {
  [CONTINENTS.EUROPE]: ['Europe'],
  [CONTINENTS.EARTH]: ['Asia', 'Oceania', 'Africa', 'Europe', 'Americas'],
  [CONTINENTS.OCEANIA]: ['Oceania'],
  [CONTINENTS.ASIA]: ['Asia'],
  [CONTINENTS.AMERICA]: ['Americas'],
  [CONTINENTS.AFRICA]: ['Africa'],
}

export const SUBREGIONS = [
  'Caribbean',
  'Eastern Africa',
  'Southern Europe',
  'Eastern Asia',
  'South America',
  'Australia and New Zealand',
  'Western Africa',
  'Micronesia',
  'Melanesia',
  'Southern Asia',
  'Eastern Europe',
  'Middle Africa',
  'Polynesia',
  'Northern Africa',
  'Central America',
  'Central Asia',
  'Western Europe',
  'Western Asia',
  'South-Eastern Asia',
  'Northern Europe',
  'Northern America',
  'Southern Africa',
]

export const SUBREGIONS_EXCLUDING_ISLANDS = SUBREGIONS.filter((subregion) => {
  return (
    subregion !== 'Polynesia' &&
    subregion !== 'Micronesia' &&
    subregion !== 'Carribean'
  )
})
