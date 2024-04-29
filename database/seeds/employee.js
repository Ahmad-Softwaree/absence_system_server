/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { faker } from "@faker-js/faker";

const employees = Array.from({ length: 10 }, () => ({
  name: faker.internet.userName(),
  e_log_id: faker.number.int({ max: 10000 }),
  address: faker.string.alpha(),
  salary: faker.number.int({ max: 100000 }),
  age: faker.number.int({ max: 100000 }),
  gender: "male",
  created_at: new Date(),
  updated_at: new Date(),
}));

const userData = [
  ...employees,
  {
    name: "Ahmad",
    e_log_id: "11111",
    address: "Suly",
    salary: 1000000,
    age: 21,
    gender: "male",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const seed = async function (knex) {
  await knex("employee").del();
  await knex("employee").insert(userData);
};

export { seed };
