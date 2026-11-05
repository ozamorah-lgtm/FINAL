module.exports = {
  HOST: "ep-falling-shape-be0yafbd-pooler.c-9.us-east-2.aws.neon.tech",
  
  USER: "neondb_owner",
  PASSWORD: "npg_6Pqexs5ztWgi",
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};