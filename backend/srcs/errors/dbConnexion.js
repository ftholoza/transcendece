	const logger = require("../utils/logger");
	const DefaultException = require("./default");

	class dbConnexionException extends DefaultException {
		constructor() {
			super();

			this.name = 'dbConnexionException';

			this.fallback = () => {
				logger.error('Fail to connect to database');
				process.exit(1);
			}
		}
	}

	module.exports = dbConnexionException;
