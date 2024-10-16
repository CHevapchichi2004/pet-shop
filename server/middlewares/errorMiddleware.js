const ApiErr = require("../err/error");

const errorHandler = (err, req, res, next) => {
	if (err instanceof ApiErr) {
		return res.status(err.status).json(err.message);
	}
	return res.status(500).json({ message: "Непредвиденная ошибка" });
};

module.exports = errorHandler;
