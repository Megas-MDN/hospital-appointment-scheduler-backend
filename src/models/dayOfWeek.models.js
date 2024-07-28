import { db } from "../database/connection.js";

export const findDayOfWeekByIdModel = async (id) => {
  try {
    const [response] = await db.query(
      "SELECT * FROM day_of_week WHERE id_day_of_week = $1 AND deleted_date IS NULL",
      [id],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from findDayOfWeekByIdModel");
    return { error: true, message: error.message };
  }
};

export const getAllDayOfWeekModel = async () => {
  try {
    const response = await db.query(
      "SELECT * FROM day_of_week WHERE deleted_date IS NULL ",
    );
    return response;
  } catch (error) {
    console.log(error, "Error from getAllDayOfWeekModel");
    return { error: true, message: error.message };
  }
};
