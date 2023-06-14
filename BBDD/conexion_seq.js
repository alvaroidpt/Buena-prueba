import { Sequelize } from 'sequelize';
import { createUserModel, createJsonModel,  } from './models.js';

export const createSequelizeConnection = async () => {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: '10.2.21.115',
    port: 5432,
    username: 'alvaro',
    password: 'Alvaro123',
    database: 'pruba_alvaro',
  });

  // Aquí puedes definir tus modelos de Sequelize y realizar otras configuraciones según tus necesidades

  const user = createUserModel(sequelize);

  const json = createJsonModel(sequelize);


  // Sincronizar los modelos con la base de datos
  await sequelize.sync();

  return sequelize;
};
