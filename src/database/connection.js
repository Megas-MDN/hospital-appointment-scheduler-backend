const pgp = require("pg-promise");
const { join } = require("path");
const filePathTables = join(__dirname, "sql", "create-tables.sql");
const filePathSeeds = join(__dirname, "sql", "seeds.sql");
const pgpConection = pgp();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "hospital_appointment_scheduler",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
};

const db = pgpConection(dbConfig);

const createTables = async () => {
  const query = new pgpConection.QueryFile(filePathTables, { minify: true });
  const seeds = new pgpConection.QueryFile(filePathSeeds, { minify: true });
  try {
    await db.query(query);
    const dayOfWeek = await db.query("SELECT  * from day_of_week");
    const medicalSpecialties = await db.query(
      "SELECT  * from medical_specialties",
    );
    if (dayOfWeek.length === 0 && medicalSpecialties.length === 0) {
      await db.query(seeds);
    }
  } catch (error) {
    console.log(error, "Error = require(createTables");
  }
};

module.exports = { db, createTables };
