import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user', (table) => {
    table.timestamps(false, true);
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('name').notNullable();
    table.string('avatar_url', 500).notNullable();
  }).createTable('story', (table) => {
    table.timestamps(false, true);
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.integer('user_id').unsigned().references('id').inTable('user').index().onDelete('CASCADE').notNullable();
    table.json('flow').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('story')
    .dropTableIfExists('user');
}

