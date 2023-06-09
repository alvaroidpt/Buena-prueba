import { Adapter } from '@adminjs/sql';

const createDatabaseConnection = async () => {
  const db = await new Adapter('postgresql', {
    connectionString: 'postgres://alvaro:Alvaro123@10.2.21.115:5432/pruba_alvaro',
    database: 'pruba_alvaro',
  }).init();

  return db;
};

export default createDatabaseConnection;
