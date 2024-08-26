const { db } = require("../database/connection.js");

const findDayOfWeekByIdModel = async (id) => {
  try {
    const [response] = await db.query(
      "SELECT  * from day_of_week WHERE id_day_of_week = $1 AND deleted_date IS NULL",
      [id],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from findDayOfWeekByIdModel");
    return { error: true, message: error.message };
  }
};

const getAllDayOfWeekModel = async () => {
  try {
    const response = await db.query(
      "SELECT * from day_of_week WHERE deleted_date IS NULL ",
    );
    return response;
  } catch (error) {
    console.log(error, "Error from getAllDayOfWeekModel");
    return { error: true, message: error.message };
  }
};

module.exports = {
  findDayOfWeekByIdModel,
  getAllDayOfWeekModel,
};
