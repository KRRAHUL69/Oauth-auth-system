
// let redis = null;

// try {
//   const Redis = require("ioredis");

//   redis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
//     lazyConnect: true, 
//   });

//   redis.on("connect", () => console.log("Redis connected"));
//   redis.on("error", () => {}); 

// } catch (err) {
//   console.log("Redis disabled");
// }

// module.exports = redis;