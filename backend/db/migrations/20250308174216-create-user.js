'use strict';// this prevents bad coding practices and makes JS more strict about errors

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
} 
// This checks if you're running your app in production mode(live server) 
// or development mode(youlocal computer)
// if in production it adds schema, stored in environment variables


module.exports = {
  async up(queryInterface, Sequelize) { // up is called when you apply migrations (npx sequelize db:migrate)
    await queryInterface.createTable('Users', { //creates a table called Users
      id: { // is a unique identifier for each user
        allowNull: false,
        autoIncrement: true, // It automatically increases (1,2,3) when adding new users
        primaryKey: true, // main identifier for each row
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(30), // string should be up to 30 characters
        allowNull: false,
        unique: true // every username must be different
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // automatically fills in the current time
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) { //undo migration (npx sequelize db:migrate:undo)
    options.tableName = "Users";
    return queryInterface.dropTable(options);
  }
};