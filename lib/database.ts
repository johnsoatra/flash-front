import knex from "knex";
import knexConfig from "../knexfile.js";

const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment];
let cacheDatabase: knex.Knex<any, unknown[]>;

function getDatabase() {
  if (!cacheDatabase) {
    cacheDatabase = knex(config);
  }
  return cacheDatabase;
}

export default getDatabase();
