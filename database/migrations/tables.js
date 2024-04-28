const up = function (knex) {
  return knex.schema
    .createTable("admin", function (table) {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.string("email", 255).unique().notNullable();
      table.string("password", 255).notNullable();
    })
    .createTable("employee", function (table) {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.string("e_id", 255).notNullable();
      table.string("address", 255).notNullable();
      table.integer("salary");
      table.integer("age");
      table.string("gender", 255);
      table.timestamps();
    })
    .createTable("department", function (table) {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.integer("e_id").unsigned();
      table.foreign("e_id").references("employee.id").deferrable("deferred");
    })
    .createTable("absence", function (table) {
      table.increments("id").primary();
      table.integer("e_id").unsigned();
      table.foreign("e_id").references("employee.id").deferrable("deferred");
      table.timestamp("check_in", { precision: 6 });
      table.timestamp("check_out", { precision: 6 });
      table.timestamp("work_time", { precision: 6 });
      table.timestamps();
    });
};

const down = function (knex) {};

export { up, down };
