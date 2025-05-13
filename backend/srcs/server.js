const fastify = require('fastify')({ logger: true, requestTimeout: 5000});
const cors = require("@fastify/cors");
const formbody = require('@fastify/formbody');
const fastifyStatic = require("@fastify/static");
const fastifyMultipart = require('@fastify/multipart');

fastify.register(fastifyMultipart);
const logger = require("./utils/logger");

const userRoutes = require("./routes/userRoutes");
const fs = require("fs").promises;
const path = require("node:path");

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

fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../../frontend/public"),
    // prefix: "/public/"
});

fastify.get("/", async (request, reply) => {
    try {
        const filePath = path.join(__dirname, "../../frontend/public/index.html");
        const data = await fs.readFile(filePath);
        reply.type("text/html").send(data);
    } catch (err) {
        reply.code(404).send("Not found");
    }
})

const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: "0.0.0.0"});
		logger.info("Server is running on port 3000");
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
};

start();
