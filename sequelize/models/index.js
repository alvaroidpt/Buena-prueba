import dbConfig from "../config/db.config.js"
import tutorials from "./tutorial.model.js"
import Sequelize from 'sequelize'
import Test from "./test.model.js"

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db_seq = {};

db_seq.Sequelize = Sequelize;
db_seq.sequelize = sequelize;

db_seq.TutorialClass = tutorials(sequelize, Sequelize);
db_seq.TestClass = Test;

export default db_seq;