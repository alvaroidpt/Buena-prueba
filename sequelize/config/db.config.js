const dbConfig = {
    HOST: "10.2.21.115",
    USER: "alvaro",
    PASSWORD: "Alvaro123",
    DB: "pruba_alvaro",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

  export default dbConfig;