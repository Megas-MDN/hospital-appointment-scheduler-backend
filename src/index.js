import { app } from "./app.js";
import { createTables } from "./database/conection.js";

const PORT = process.env.PORT || "3001";

createTables()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
