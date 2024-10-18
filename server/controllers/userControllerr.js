const ApiErr = require("../err/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");
class UserController {
	async registration(req, res, next) {
		const { email, password, role } = req.body;
		if (!email || !password) {
			return next(ApiErr.badRequest("Некорректный эмейл или пароль"));
		}
		const candidate = await User.findOne({ where: { email } });
		if (candidate) {
			return next(
				ApiErr.badRequest("Пользователь с таким эмейлом уже существует")
			);
		}
		const hashPass = await bcrypt.hash(password, 5);
		const user = await User.create({ email, password: hashPass, role });
		await Basket.create({ userId: user.id });
		const token = jwt.sign({ id: user.id, email, role }, "SECRET", {
			expiresIn: "24h",
		});
		return res.status(200).json(token);
	}

	async login(req, res, next) {
		const { email, password } = req.body;
		const dude = await User.findOne({ where: { email } });
		if (!dude) {
			return next(
				ApiErr.badRequest("Пользователя с таким эмейлом не существует")
			);
		}
		const compPass = bcrypt.compareSync(password, dude.password);
		if (!compPass) {
			return next(ApiErr.badRequest("Неверный пароль"));
		}
		const token = jwt.sign({ id: dude.id, email, role: dude.role }, "SECRET", {
			expiresIn: "24h",
		});
		return res.status(200).json(token);
	}

	async check(req, res, next) {
		const token = jwt.sign(
			{ id: req.user.id, email: req.user.email, role: req.user.role },
			"SECRET",
			{
				expiresIn: "24h",
			}
		);
		return res.status(200).json(token);
	}
}

module.exports = new UserController();
