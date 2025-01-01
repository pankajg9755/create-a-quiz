export const up = async function(knex) {
  return await knex.schema.createTable("quiz", table => {
    table.bigIncrements("id").primary();
    table.string("title").notNullable();
    table.text("questions").notNullable();
    table.enu("status", ["active", "inActive"]).defaultTo("active");
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt").nullable();
  });
};

export const down = async function(knex) {
  return await knex.schema.dropTable("quiz");
};
