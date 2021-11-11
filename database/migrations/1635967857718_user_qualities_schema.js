'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserQualitiesSchema extends Schema {
  up () {
    this.create('user_qualities', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('organized').notNullable();
      table.string('smoke').notNullable();
      table.string('drink').notNullable();
      table.string('responsable').notNullable();
      table.string('animals').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('user_qualities')
  }
}

module.exports = UserQualitiesSchema
