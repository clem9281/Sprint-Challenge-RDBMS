exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();

      tbl
        .string("name", 128)
        .notNullable()
        .unique();

      tbl.string("description", 256).notNullable();

      tbl.string("completed", 128).notNullable();
    })
    .createTable("actions", tbl => {
      tbl.increments();

      tbl
        .string("description", 256)
        .unique()
        .notNullable();

      tbl.string("notes", 256).notNullable();

      tbl.string("completed", 128).notNullable();

      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects").dropTableIfExists("actions");
};
