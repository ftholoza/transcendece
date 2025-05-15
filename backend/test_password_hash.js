const bcrypt = require('bcrypt');

(async () => {
    const password = 'password';
    const saltRounds = 10;	//number of times it hashes the pwd, 2^10 = 1024 times
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log({
        password,
        saltRounds,
        hashedPassword
    });

	//test with wrong password
	const passwordMatch = await bcrypt.compare('zigounette', hashedPassword);
	console.log({
		passwordMatch
	});

	//test with correct password
	const passwordMatch2 = await bcrypt.compare('password', hashedPassword);
	console.log({
		passwordMatch2
	});
})();

// launch test with node test_password_hash.js