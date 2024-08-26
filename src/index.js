const { app } = require("./app");
const createTables = require("./database/connection").createTables;

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
