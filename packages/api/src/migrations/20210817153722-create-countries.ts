"use strict";

import { DataType, Sequelize } from "sequelize-typescript";
import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
    await queryInterface.createTable("countries", {
      id: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataType.STRING,
      },
      alpha2code: {
        type: DataType.STRING,
      },
      alpha3code: {
        type: DataType.STRING,
      },
      capital: {
        type: DataType.STRING,
      },
      region: {
        type: DataType.STRING,
      },
      subregion: {
        type: DataType.STRING,
      },
      population: {
        type: DataType.INTEGER,
      },
      area: {
        type: DataType.FLOAT,
        allowNull: true,
      },
      languages: {
        type: DataType.JSON,
      },
      topleveldomain: {
        type: DataType.JSON,
      },
      timezones: {
        type: DataType.JSON,
      },
      translations: {
        type: DataType.JSON,
      },
      currencies: {
        type: DataType.JSON,
      },
      borders: {
        type: DataType.JSONB,
      },
      latlng: {
        type: DataType.GEOMETRY,
      },
      shape: {
        type: DataType.GEOGRAPHY,
      },
      updatedat: DataType.DATE,
      createdat: DataType.DATE,
    });
  },

  down: async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
    await queryInterface.dropTable("countries");
  },
};
