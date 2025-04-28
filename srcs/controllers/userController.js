
const { db } = require(`../database/database.js`);


async function getAllUsers(request, reply) {
    try {
        const rows = await new Promise((resolve, reject) => {
            db.all("SELECT * FROM users", [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        reply.send(rows);
    } catch (err) {
        console.error("Error getting all users", err);
        reply.status(500).send({ error: "Unexpected server error" });
    }
}

async function getUserByUsername(request, reply) {
    try {
        username = request.params.username;
        const rows = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE username = ?", [username], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
        if (!rows) {
            return reply.status(404).send({ error: "User not found" });
        }
        return reply.send(rows);
    } catch (err) {
        console.error("Error getting user by username", err);
        reply.status(500).send({ error: "Unexpected server error" });
    }
}


async function getUserById(request, reply) {
    try {
        id = request.params.id;
        const rows = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE id = ?", [id], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
        if (!rows) {
            return reply.status(404).send({ error: "User not found" });
        }
        return reply.send(rows);
    } catch (err) {
        console.error("Error getting user by id", err);
        reply.status(500).send({ error: "Unexpected server error" });
    }
}


async function userLogin(request, reply) {
    try {
        console.log("🔹 userLogin function called");

        const { username, password } = request.body || {};
        console.log("📩 Received body:", request.body);

        if (!username || !password) {
            console.log("⚠️ Missing username or password");
            return reply.status(400).send({ error: "username, password are required" });
        }

        console.log("🟡 Querying database for:", username);

        const existingUser = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
                
                console.log("🟢 Query executed");

                if (err) {
                    console.error("❌ Database error:", err);
                    reject(err);
                } else if (!row) {
                    console.log("🚫 User not found:", username);
                    reject(new Error("User not found"));
                } else {
                    console.log("✅ User found:", row);
                    resolve(row);
                }
            });
        });

        console.log("Checking password...");
        
        if (password === existingUser.password) {
            console.log("User logged in successfully:", username);
            console.log("Sending response...");
            return reply.status(200).send({ message: "User connected successfully", username });
        } else {
            console.log("Wrong password for user:", username);
            console.log("Sending response...");
            return reply.status(401).send({ message: "Wrong Password" });
        }
    } catch (error) {
        console.error("Error in userLogin:", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
    console.log("still here");
}

async function createUser(request, reply) {
    try {
        const { username, password, email } = request.body || {};

        console.log(username, email, password);
        if (!username || !password || !email) {
            return reply.status(400).send({ error: "Username, password, email required" });
        }
        if (Object.values(password).length < 6)
            return reply.status(400).send({ error: "password too short" });

        const existingUser = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (existingUser)
            return reply.status(400).send({ error: "Username already taken" });

        console.log(`Creating user: ${username}`);
        const result = await db.run(
            'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
            [username, password, email]
          );
        reply.status(201).send({ message: "User registred successfully", username });
    } catch (error) {
        console.error("Error creating user:", error);
        reply.status(500).send({ error: "Internal Server Error" });
    }
}


async function updateUser(request, reply) {
    const { id } = request.params;
    const { username, password } = request.body;
    
    try {
        if (!username || !password) {
            return reply.status(400).send({ error: "Username and password are required" });
        }
        const existingUser = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE username = ? AND id != ?", [username, id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
        if (existingUser) {
            return reply.status(400).send({ error: "Username already taken" });
        }
        const query = "UPDATE users SET username = ?, password = ? WHERE id = ?";
        
        await new Promise((resolve, reject) => {
            db.run(query, [username, password, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });

        reply.status(200).send({ message: `User with ID ${id} updated successfully.` });
    } catch (err) {
        console.error("Error updating user", err);
        reply.status(500).send({ error: "Unexpected server error" });
    }
}

async function deleteUser(request, reply) {
    const { id } = request.params;
    try {
        await new Promise((resolve, reject) => { 
            db.run("DELETE FROM users WHERE id = ?", [id], function (err){
                if (err) {
                    reject(err);
                } 
                else {
                    resolve(this);
                }
        });
    });
    reply.status(201).send({ message: "User deleted successfully"});
    }catch (err) {
        console.error("Error deleting user", err);
        reply.status(500).send({ error: "Unexpected server error" });
    }
}



module.exports = {
    getAllUsers, 
    getUserById, 
    getUserByUsername,
    createUser, 
    updateUser, 
    deleteUser,
    userLogin
};