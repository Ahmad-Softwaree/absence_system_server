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
      table.integer("e_log_id").notNullable().unique();
      table.string("address", 255).notNullable();
      table.integer("salary");
      table.integer("age");
      table.string("gender", 255);
      table.timestamps();
    })
    .createTable("department", function (table) {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.integer("e_log_id").unsigned();
      table
        .foreign("e_log_id")
        .references("employee.e_log_id")
        .deferrable("deferred");
      table.timestamps();
    })
    .createTable("absence", function (table) {
      table.increments("id").primary();
      table.integer("e_log_id").unsigned();
      table
        .foreign("e_log_id")
        .references("employee.e_log_id")
        .deferrable("deferred");
      table.timestamp("check_in", { precision: 6 });
      table.timestamp("check_out", { precision: 6 });
      table.integer("work_time");
      table.timestamps();
    });
};

const down = function (knex) {};

export { up, down };
