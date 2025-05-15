const userController = require("../controllers/userController");

async function userRoutes(fastify, options) {
    fastify.post("/users/login", userController.userLogin);
    fastify.get("/users/username/:username", userController.getUserByUsername);  // Specific to username
    fastify.get("/users", userController.getAllUsers);  // Get all users
    fastify.get("/users/:id", userController.getUserById);  // General route for user by ID
    fastify.post("/users", userController.createUser);  // Create a user
    fastify.put("/users/:id", userController.updateUser);  // Update a user by ID
    fastify.delete("/users/:id", userController.deleteUser);  // Delete a user by ID*/
    fastify.get("/session", userController.getSession);
    fastify.post("/logout", userController.userLogout);
}

module.exports = userRoutes;