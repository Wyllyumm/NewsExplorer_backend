const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
require("dotenv").config();

const mainRouter = require("./routes/index.js");
const { errorHandler } = require("./middlewares/error-handler.js");
const { requestLogger, errorLogger } = require("./middlewares/logger.js");
const { limiter } = require("./middlewares/rateLimiter");

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

app.use(express.json());
app.use(cors());
app.use(limiter);
app.use(requestLogger);

app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
