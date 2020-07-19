// import { Application } from 'egg';
// export default function(app: Application) {
export default function(app) {
  const { STRING, INTEGER } = app.Sequelize;

  const Post = app.model.define('posts', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: STRING(30),
    content: STRING(255),
    user_id: INTEGER,
    // createdAt: {
    //   type: DATE,
    //   defaultValue: NOW,
    //   allowNull: false,
    // },
    // updatedAt: {
    //   type: DATE,
    //   defaultValue: NOW,
    //   allowNull: false,
    // },
  }, {
    timestamps: true,
    freezeTableName: true,
  });

  return class extends Post {
    static associate() {
      app.model.Post.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' });
    }

    static async findByIdWithUser(id: number, userId: number) {
      return await app.model.Post.findOne({
        where: { id, user_id: userId },
      });
    }
  };
}
