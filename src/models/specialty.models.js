const { db } = require("../database/connection.js");

const findSpecialtyByIdModel = async (id) => {
  try {
    const [response] = await db.query(
      "SELECT  * from medical_specialties WHERE id_specialty = $1 AND deleted_date IS NULL",
      [id],
    );
    return response;
  } catch (error) {
    console.log(error, "Error = require(findSpecialtyByIdModel");
    return { error: true, message: error.message };
  }
};

const getAllSpecialtyByIdModel = async (filter) => {
  const limit = filter.limit || 5;
  const page = filter.page || 0;
  const search = filter.search || "";
  const offset = page * limit;

  try {
    const response = await db.query(
      `SELECT  * from medical_specialties WHERE LOWER(specialty) LIKE LOWER($3) AND deleted_date IS NULL LIMIT $1 OFFSET $2`,
      [limit, offset, `%${search}%`],
    );
    return response;
  } catch (error) {
    console.log(error, "Error = require(getAllSpecialtyByIdModel");
    return { error: true, message: error.message };
  }
};

module.exports = {
  findSpecialtyByIdModel,
  getAllSpecialtyByIdModel,
};
