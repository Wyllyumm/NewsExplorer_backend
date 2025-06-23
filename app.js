const express = require("express");

const app = express();

const { PORT = 3001 } = process.env;
/*mongoose
  .connect("mongodb://127.0.0.1:27017/newsexplorer_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the db");
  })
  .catch((e) => console.error(e)); */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
