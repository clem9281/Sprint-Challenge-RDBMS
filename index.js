const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => res.send("<h1>Sprint Challenge: RDBMS</h1>"));

const port = process.env.PORT || 6500;
app.listen(port, console.log(`Server running on ${port}`));
