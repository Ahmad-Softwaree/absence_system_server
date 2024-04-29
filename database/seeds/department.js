/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { faker } from "@faker-js/faker";
import db from "../config.js";

const departments = Array.from({ length: 10 }, () => ({
  name: faker.internet.userName(),
  e_log_id: faker.number.int({ max: 10000 }),
  created_at: new Date(),
  updated_at: new Date(),
}));

const seed = async function (knex) {
  let employee = await db("employee").limit(1);
  for (let dep of departments) {
    dep.e_log_id = employee[0].e_log_id;
  }
  await knex("department").del();
  await knex("department").insert(departments);
};

export { seed };
