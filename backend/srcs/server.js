const fastify = require('fastify')({ logger: false, requestTimeout: 5000});
const formbody = require('@fastify/formbody');
const fastifyCors = require("@fastify/cors");
const fastifyStatic = require("@fastify/static");
const fastifyCookie = require("@fastify/cookie");
const fastifyMultipart = require('@fastify/multipart');
const websocket = require('@fastify/websocket');

fastify.register(fastifyMultipart);
const logger = require("./utils/logger");

const userRoutes = require("./routes/userRoutes");
const fs = require("fs").promises;
const path = require("node:path");

fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET
});

fastify.register(fastifyCors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
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
});

//DEBUG ERROR
fastify.setErrorHandler(function (error, request, reply) {
  console.error("Erreur capturée par Fastify:", error);
  reply.status(500).send({ error: "Erreur interne serveur" });
});

// fastify.register(websocket);
fastify.register(require('@fastify/websocket'));

const WebSocket = require('ws');  // en haut du fichier


fastify.get("/websocket", { websocket: true}, (connection, req) => {
    const socket = connection.socket;

    // console.log("Type de socket:", typeof socket);
    // console.log("Méthodes de socket:", Object.getOwnPropertyNames(Object.getPrototypeOf(socket)));

    console.log('Est-ce un WebSocket ? ', socket.constructor.name);
    console.log(Object.getPrototypeOf(socket));
    console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(socket)));


    console.log("✅ Client connecté (socket)");

    socket.on('message', (message) => {
        console.log('Message reçu:', message.toString());
        socket.send('Hello client');
    });

    socket.on('error', (err) => {
        console.log("Error socket: ", err);
    });

    socket.send('Bienvenue');

    // stream.write("hello client\n");
    // console.log('message sent');

    // stream.on("data", (chunk) => {
    //     const message = chunk.toString('utf-8');
    //     console.log("📨 Message du client :", message);
    //     stream.write("🪞 Echo: " + message);
    // });

    // stream.on("error", (err) => {
    //     console.error("❌ Erreur sur le stream :", err);
    // });

    // stream.on("close", () => {
    //     console.log("❌ Connexion fermée");
    // });
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
