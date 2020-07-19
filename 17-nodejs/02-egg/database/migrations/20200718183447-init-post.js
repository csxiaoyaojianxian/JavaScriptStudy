'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, NOW } = Sequelize;
    await queryInterface.createTable('posts', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      title: STRING(30),
      content: STRING(255),
      user_id: INTEGER,
      created_at: {
        type: DATE,
        defaultValue: NOW,
        allowNull: false
      },
      updated_at: {
        type: DATE,
        defaultValue: NOW,
        allowNull: false
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('posts');
  },
};