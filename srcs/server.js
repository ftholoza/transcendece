const { db } = require('./database/database.js');
const fastify = require('fastify')({ logger: true, requestTimeout: 5000});
const cors = require("@fastify/cors");

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


fastify.register(require("@fastify/formbody"));


setInterval(() => {
    console.log("⏳ Event loop is still alive...");
}, 5000);

fastify.register(require("./routes/userRoutes"), {prefix: "/api"});

const start = async () => {
    try {
        await fastify.listen({ port: 3000});
        fastify.log.info("Server is running on port 3000");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
