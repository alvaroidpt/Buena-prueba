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

export const createGruposModel = (sequelize) => {
    const grupos = sequelize.define('Grupos', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            tableName: 'grupos',
            timestamps: false,
        });

    return grupos;
};

export const createPersonasModel = (sequelize) => {
    const personas = sequelize.define('Personas', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grupo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'grupos',
                key: 'id',
            },
        },
    },
        {
            tableName: 'personas',
            timestamps: false,
        });

    return personas;
};

// Pruebas con sequelize para relaciones entre tablas

export const createEquipoSisModel = (sequelize) => {
    const equipoSis = sequelize.define('EquipoSis', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            tableName: 'equipoSis',
            timestamps: false,
        });

    return equipoSis;
};

export const createSistemasModel = (sequelize) => {
    const sistemas = sequelize.define('Sistemas', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            tableName: 'sistemas',
            timestamps: false,
        });

    return sistemas;
};

export const createRelacionesModel = (sequelize) => {
    const relaciones = sequelize.define('Relaciones', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        EquipoSisId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        SistemaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
        {
            tableName: 'relaciones',
            timestamps: false,
        });

    return relaciones;
};


