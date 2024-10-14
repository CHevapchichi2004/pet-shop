const { Sequelize } = require("sequelize");
require("dotenv").config();
module.exports = new Sequelize(
	process.env.NAME,
	process.env.USER,
	process.env.PASS,
	{
		dialect: "postgres",
		host: process.env.HOST,
		port: process.env.PORT,
	}
);
