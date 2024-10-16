const uuid = require("uuid");
const { Device } = require("../models/models");
const path = require("path");
const ApiErr = require("../err/error");

class DeviceController {
	async create(req, res, next) {
		try {
			const { name, price, brandId, typeId, info } = req.body;
			const { img } = req.files;
			let fileName = uuid.v4() + ".jpg";
			img.mv(path.resolve(__dirname, "..", "static", fileName));

			const device = await Device.create({
				name,
				price,
				brandId,
				typeId,
				info,
				img: fileName,
			});
			res.json(device);
		} catch (e) {
			next(ApiErr.badRequest(e.message));
		}
	}

	async getAll(req, res) {}

	async getOne(req, res) {}
}

module.exports = new DeviceController();
