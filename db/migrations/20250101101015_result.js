export const up = async function(knex) {
  return await knex.schema.createTable("result", table => {
    table.bigIncrements("id").primary();
    table.bigInteger("quiz_id").unsigned().nullable();
    table.bigInteger("user_id").unsigned().nullable();
    table.bigInteger("score").notNullable();
    table.json("answers").notNullable();
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt").nullable();

    table.foreign("quiz_id").references("id").inTable("quiz");
    table.foreign("user_id").references("id").inTable("users");
  });
};

export const down = async function(knex) {
  return await knex.schema.dropTable("result");
};
