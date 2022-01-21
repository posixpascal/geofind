export const FIND_COUNTRY_QUERY = `
    SELECT *, ST_X(latlng::geometry) as lat, ST_Y(latlng::geometry) as lng FROM countries 
        WHERE NOT id = ANY($1)
        AND region = ANY($2)
        AND subregion = ANY($3)
        ORDER BY random()
        LIMIT 1
  `

export const FIND_COUNTRY_BY_CODE = `
    SELECT *, ST_X(latlng::geometry) as lat, ST_Y(latlng::geometry) as lng FROM countries 
        WHERE alpha2code = $1
        ORDER BY random()
        LIMIT 1
  `

export const INSERT_NEW_COUNTRY = `INSERT INTO countries (
        id,
        name,
        alpha2code,
        alpha3code,
        capital,
        region,
        subregion,
        population,
        area,
        languages,
        topLevelDomain,
        timezones,
        translations,
        currencies,
        borders,
        latlng,
        shape
      ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15,
        $16,
        $17
      ) RETURNING *
    `
