const fastify = require('fastify')({ logger: true, requestTimeout: 5000});
const cors = require("@fastify/cors");
const formbody = require('@fastify/formbody');

const logger = require("./utils/logger");

const userRoutes = require("./routes/userRoutes");

fastify.register(cors, (instance) => (req, callback) => {
    const corsOptions = {
        origin: true, // Allow all origins
        methods: ["GET", "POST", "PUT", "DELETE"],
    };
    callback(null, corsOptions);
});


fastify.addContentTypeParser("application/json", { parseAs: "string" }, (req, body, done) => {
    try {
        done(null, JSON.parse(body));
    } catch (err) {
        done(err);
    }
});


fastify.register(formbody);


// setInterval(() => {
//     console.log("⏳ Event loop is still alive...");
// }, 5000);

fastify.register(userRoutes, {prefix: "/api"});

const start = async () => {
    try {
        await fastify.listen({ port: 3000});
		logger.info("Server is running on port 3000");
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
};

start();
