
exports.up = function(knex) {
  return knex.schema
  .createTable('project', tbl => {
      tbl.increments('project_id');
      tbl.string('project_name', 128).notNullable();
      tbl.string('project_description', 128);
      tbl.boolean('project_completed').defaultTo(false);
  })
  .createTable('resource', tbl => {
      tbl.increments('resource_id');
      tbl.string('resource_name', 128).notNullable().unique();
      tbl.string('resource_description', 128);
  })
  .createTable('task', tbl => {
      tbl.increments('task_id');
      tbl.string('task_description', 128).notNullable();
      tbl.string('task_notes', 128);
      tbl.boolean('task_completed').defaultTo(false);
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('project')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })
  .createTable('project_resources', tbl => {
      tbl.increments('project_resources_id');
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('project')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource_id')
        .inTable('resource')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema 
    .dropTableIfExists('project_resources')
    .dropTableIfExists('task')
    .dropTableIfExists('resource')
    .dropTableIfExists('project')
};
