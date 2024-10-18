const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
	try {
		if (req.method === "OPTIONS") {
			next();
		}
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			res.status(401).json("Не авторизован1");
		}
		const check = jwt.verify(token, "SECRET");
		req.user = check;
		next();
	} catch (error) {
		res.status(401).json(req.headers);
	}
};
