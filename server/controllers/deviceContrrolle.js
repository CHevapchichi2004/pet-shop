const uuid = require("uuid");
const { Device, DeviceInfo } = require("../models/models");
const path = require("path");
const redisClient = require("../extensions/redis");
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

			if (info) {
				info = JSON.parse(info);
				info.array.forEach((i) => {
					DeviceInfo.create({
						title: i.title,
						description: i.description,
						deviceId: device.id,
					});
				});
			}
			const dataCache = await Device.findAll();
			redisClient.set("allDevice", JSON.stringify(dataCache), {
				EX: 60 * 60 * 24 * 7,
				NX: true,
			});
			res.json(device);
		} catch (e) {
			next(ApiErr.badRequest(e.message));
		}
	}
	// Фильтрация и пагинация
	async getAll(req, res) {
		let { typeId, brandId, limit, page } = req.body;
		page = page || 1;
		limit = limit || 9;
		let offset = page * limit - limit;
		let device;
		if (typeId && brandId) {
			device = await Device.findAndCountAll({
				where: { typeId, brandId },
				offset,
				limit,
			});
		}
		if (!typeId && brandId) {
			device = await Device.findAndCountAll({
				where: { brandId },
				offset,
				limit,
			});
		}
		if (typeId && !brandId) {
			device = await Device.findAndCountAll({
				where: { typeId },
				offset,
				limit,
			});
		}
		if (!typeId && !brandId) {
			device = await Device.findAll({ limit, offset });
			redisClient.set("allDevice", JSON.stringify(device), {
				EX: 60 * 60 * 24 * 7,
				NX: true,
			});
		}

		res.status(200).json(device);
	}

	async getOne(req, res) {
		const { id } = req.params;
		const device = await Device.findOne({
			where: { id },
			include: [{ model: DeviceInfo, as: "info" }],
		});
		return res.status(200).json(device);
	}
}

module.exports = new DeviceController();
