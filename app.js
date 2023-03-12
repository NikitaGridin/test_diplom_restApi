const express = require('express');
const app = express();
const { sequelize } = require("./db");

const routes = require('./routes/routes')

const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());
app.use(cors())
app.use(express.static('uploads'))
// app.use(cookieParser());

app.use("/api", routes);
app.use(errorHandler);

  sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => console.error(error));