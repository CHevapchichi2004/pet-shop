const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const router = require("./router/index");
const path = require("path");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middlewares/errorMiddleware");
require("dotenv").config();

const app = express();
const cors = require("cors");

const PORT = process.env.PORT;

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		console.log(`server starts ON ${PORT}`);
	} catch (error) {
		console.log(error);
	}
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);
app.use(errorHandler);

app.listen(7777, () => start());
