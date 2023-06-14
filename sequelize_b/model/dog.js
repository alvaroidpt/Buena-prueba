import { Sequelize, Model } from 'sequelize'
import { sequelize } from '../database/db.js';

class Dog extends Model {}

Dog.init(
    {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        }
    },
    {
    sequelize,
    tableName: 'dogs',
    modelName: 'dog',
    }
)

export default Dog;

