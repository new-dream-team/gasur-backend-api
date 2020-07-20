const express = require("express");
const app = express();
const cors = require('cors');

const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(routes);


let port = process.env.PORT;
if (!port) {
    port = 3333;
}

app.listen(port);