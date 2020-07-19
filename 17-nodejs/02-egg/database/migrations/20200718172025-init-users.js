'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { BIGINT, INTEGER, DATE, STRING, NOW } = Sequelize;
    await queryInterface.createTable('users', {
      id: {
        type: BIGINT(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      name: STRING(30),
      age: INTEGER,
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
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  },
};
