// import { Application } from 'egg';
// export default function(app: Application) {
export default function(app) {
  const { STRING, BIGINT, INTEGER } = app.Sequelize;

  const User = app.model.define('users', {
    id: {
      type: BIGINT(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    name: STRING(30),
    age: INTEGER,
    gender: STRING(10),
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

  return class extends User {
    static associate() {
      app.model.User.hasMany(app.model.Post, { as: 'posts' });
    }
  };
  // return User;
}
