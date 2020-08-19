const db = require("../database/connection");

module.exports = {
  find,
  findBy,
  findById,
  add,
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users as u").where(filter);
}

function findById(id) {
  return db("users").where({ id }).first();
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}
