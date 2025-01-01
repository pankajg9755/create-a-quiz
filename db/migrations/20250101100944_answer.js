export const up = async function(knex) {
  return await knex.schema.createTable("answer", table => {
    table.bigIncrements("id").primary();
    table.bigInteger("question_id").unsigned().nullable();
    table.bigInteger("quiz_id").unsigned().nullable();
    table.bigInteger("user_id").unsigned().nullable();
    table.string("selected_option").notNullable();
    table.boolean("is_correct").notNullable();
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updatedAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("deletedAt").nullable();
    table.foreign("question_id").references("id").inTable("question");
    table.foreign("quiz_id").references("id").inTable("quiz");
    table.foreign("user_id").references("id").inTable("users");
  });
};

export const down = async function(knex) {
  return await knex.schema.dropTable("answer");
};
