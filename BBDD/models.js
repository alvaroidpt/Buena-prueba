import { Sequelize, DataTypes } from 'sequelize';

export const createUserModel = (sequelize) => {
    const user = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            tableName: 'users',
        });

    return user;
};
