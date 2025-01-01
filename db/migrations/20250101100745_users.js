export const up = async function(knex) {
  return await knex.schema.createTable("users", table => {
    table.bigIncrements("id").primary();
    table.string("firstName", 100).notNullable();
    table.string("lastName", 100).notNullable();
    table.string("email").notNullable();
    table.text("password").notNullable();
    table.text("image").nullable();
    table.enu("status", ["active", "inActive"]).defaultTo("active");
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt").nullable();
  });
};

export const down = async function(knex) {
  return await knex.schema.dropTable("users");
};
