export const up = async function(knex) {
  return await knex.schema.createTable("question", table => {
    table.bigIncrements("id").primary();
    table.text("question").nullable();
    table.bigInteger("quiz_id").unsigned().nullable();
    table.json("options").notNullable();
    table.string("correct_option").notNullable();
    table.enu("status", ["active", "inActive"]).defaultTo("active");
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt").nullable();

    table.foreign("quiz_id").references("id").inTable("quiz");
  });
};

export const down = async function(knex) {
  return await knex.schema.dropTable("question");
};
