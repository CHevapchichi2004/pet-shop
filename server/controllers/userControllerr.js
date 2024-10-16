const ApiErr = require("../err/error");
class UserController {
	async registration(req, res) {}

	async login(req, res) {}

	async check(req, res, next) {
		const { id } = req.query;
		if (!id) {
			return next(ApiErr.badRequest("Нет айди"));
		}
		return res.status(200).json(id);
	}
}

module.exports = new UserController();
