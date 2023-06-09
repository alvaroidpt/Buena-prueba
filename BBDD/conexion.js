import { Adapter } from '@adminjs/sql';

// Conexión con la base de datos, en la variable db
export const createDatabaseConnection = async () => {
  const db = await new Adapter('postgresql', {
    connectionString: 'postgres://alvaro:Alvaro123@10.2.21.115:5432/pruba_alvaro',
    database: 'pruba_alvaro',
  }).init();

  return db;
};

// Preparamos el método de autenticación del usuario en AdminJS
const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

export const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
};

