import database from "./database";

const table = {
  get card() {
    return database('card');
  },
  get order() {
    return database('order');
  }
}

export default table;
