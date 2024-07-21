import { db } from "../database/connection.js";

export const findSpecialtyByIdModel = async (id) => {
  try {
    const [response] = await db.query(
      "SELECT * FROM medical_specialties WHERE id_specialty = $1 AND deleted_date IS NULL",
      [id],
    );
    return response;
  } catch (error) {
    console.log(error, "Error from findSpecialtyByIdModel");
    return { error: true, message: error.message };
  }
};
