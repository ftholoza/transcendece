const authController = require('../controllers/authController');

async function authRoutes(fastify, options) {
    // Route for handling Google Sign-In token verification
    fastify.post("/auth/google", authController.googleLogin);

    // Route for handling Google OAuth callback
    fastify.get("/auth/google/callback", async (request, reply) => {
        try {
            const { code } = request.query;
            if (!code) {
                return reply.status(400).send({ error: "No authorization code provided" });
            }

            // Redirect to the frontend with success
            return reply.redirect('/');
        } catch (error) {
            console.error('Google callback error:', error);
            return reply.redirect('/?error=auth_failed');
        }
    });
}

module.exports = authRoutes;