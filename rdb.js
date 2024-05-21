var redis = require('redis');
const redisConfig = require("./config/redis.config");

const url = `redis://${redisConfig.host}:${redisConfig.port}`;
const redisClient = redis.createClient({
    url,
    password: redisConfig.password
});



module.exports = redisClient;  