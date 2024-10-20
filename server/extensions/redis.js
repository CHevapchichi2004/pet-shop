const redis = require("redis");
const client = redis.createClient();

client.on("error", (e) => {
	console.log(e);
});
module.exports = client;
