const Sequelize = require('sequelize');

  module.exports = (sequelize, DataTypes) => {
  
const Model = Sequelize.Model;
class News extends Model {}
News.init({
  // attributes
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  username: {
    type: Sequelize.TEXT,
    allowNull : false
  },
  tweet: {
    type: Sequelize.TEXT,
    allowNull : false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    
  },
  dateTweet: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
  sequelize,
  modelName: 'news',

  // options
});

News.sync()
return News;
}