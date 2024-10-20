const redisClient = require("../extensions/redis");

module.exports = (dataName) => {
	return async (req, res, next) => {
		const { deviceId, typeId } = req.body;
		if (!deviceId && !typeId) {
			const cachedData = await redisClient.get(dataName);
			if (cachedData) {
				console.log(cachedData);
				return res.status(200).json(JSON.parse(cachedData));
			}
		}
		next();
	};
};
