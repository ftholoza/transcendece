const userController = require("../controllers/userController");

async function userRoutes(fastify, options) {
    fastify.post("/users/login", userController.userLogin);
    fastify.get("/users/username/:username", userController.getUserByUsername);
    fastify.get("/users/avatar/:username", userController.getUserAvatar);
    fastify.get("/users", userController.getAllUsers);
    fastify.get("/users/:id", userController.getUserById);
    fastify.post("/users", userController.createUser);
    fastify.put("/users/:id", userController.updateUser);
    fastify.delete("/users/:id", userController.deleteUser);
    fastify.put("/users/avatar/:username", userController.UpdateAvatar);
}

module.exports = userRoutes;