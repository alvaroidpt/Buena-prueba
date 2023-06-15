import { Sequelize } from 'sequelize';
import { createUserModel, createJsonModel, createEquiposModel, createGruposModel, createPersonasModel, createEquipoSisModel, createSistemasModel, createRelacionesModel } from './models.js';

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
  const equipos = createEquiposModel(sequelize);
  const grupos = createGruposModel(sequelize);
  const personas = createPersonasModel(sequelize);
  const equipoSis = createEquipoSisModel(sequelize);
  const sistemas = createSistemasModel(sequelize);
  const relaciones = createRelacionesModel(sequelize);

  // Relacionamos equipos y sistemas mediante una tabla intermedia, llamada "relaciones"
  // sistemas.hasMany(equipoSis);
  equipoSis.belongsToMany(sistemas, { through: relaciones, timestamps: false });


  // Creamos registros en la tabla sistemas
  const sistema1 = await sistemas.create({ nombre: 'Sistema 1' });
  const sistema2 = await sistemas.create({ nombre: 'Sistema 2' });

  // Creamos registros en la tabla equipoSis
  const equipo1 = await equipoSis.create({ nombre: 'Equipo 1' });
  const equipo2 = await equipoSis.create({ nombre: 'Equipo 2' });


  // Relacionar los registros mediante la tabla relaciones
  await equipo1.addSistemas([sistema1, sistema2]); // Relacionar equipo1 con sistema1 y sistema2
  await equipo2.addSistemas(sistema1); // Relacionar equipo2 con sistema1

  // Obtener los sistemas relacionados con un equipo
  const sistemasRelacionados = await equipo1.getSistemas();
  console.log("ESTO DE AQUÍ: " + sistemasRelacionados);


  // Sincronizamos los modelos con la base de datos
  await sequelize.sync();

  return sequelize;
};
