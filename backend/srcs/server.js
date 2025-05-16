const fastify = require('fastify')({ logger: false, requestTimeout: 5000});
const formbody = require('@fastify/formbody');
const fastifyCors = require("@fastify/cors");
const fastifyStatic = require("@fastify/static");
const fastifyCookie = require("@fastify/cookie");
const fastifyMultipart = require('@fastify/multipart');

fastify.register(fastifyMultipart);
const logger = require("./utils/logger");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const fs = require("fs").promises;
const path = require("node:path");

fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || 'your-fallback-secret-key'
});

fastify.register(fastifyCors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
});

fastify.addContentTypeParser("application/json", { parseAs: "string" }, (req, body, done) => {
    try {
        done(null, JSON.parse(body));
    } catch (err) {
        done(err);
    }
});

fastify.register(formbody);

fastify.register(userRoutes, {prefix: "/api"});
fastify.register(authRoutes, {prefix: "/api"});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../../frontend/public"),
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
