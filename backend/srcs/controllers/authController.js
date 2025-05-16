const { client } = require('../config/google');
const { db } = require('../../database/database');

async function googleLogin(request, reply) {
    try {
        const { token } = request.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const { email, name, picture } = ticket.getPayload();

        // Check if user exists
        const existingUser = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (!existingUser) {
            // Create new user
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)',
                    [name, email, 'google-auth', picture],
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
        }

        // Set cookie for authentication
        reply.setCookie('login', name, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: true,
            path: '/',
            signed: true
        });

        return reply.status(200).send({
            message: "Successfully authenticated with Google",
            username: name
        });
    } catch (error) {
        console.error('Google authentication error:', error);
        return reply.status(401).send({ error: "Authentication failed" });
    }
}

module.exports = {
    googleLogin
};