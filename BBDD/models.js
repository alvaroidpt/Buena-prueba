import { Sequelize, DataTypes } from 'sequelize';

export const createUserModel = (sequelize) => {
    const user = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
        },

    },
        {
            tableName: 'users',
            timestamps: false,
        });

    return user;
};

export const createJsonModel = (sequelize) => {
    const json = sequelize.define('Json', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        info: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    },
        {
            tableName: 'json',
            timestamps: false,
        });

    return json;
};

export const createEquiposModel = (sequelize) => {
    const equipos = sequelize.define('Equipos', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        num_slots: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        field_config: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    },
        {
            tableName: 'tipos_equipos',
            timestamps: false,
        });

    return equipos;
};



