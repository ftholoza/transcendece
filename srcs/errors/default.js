const logger = require("../utils/logger");

class DefaultException extends Error {
	constructor(message) {
		super(message);

		this.isCustomException = true;
		this.name = 'DefaultException';

		this.fallback = () => {
			logger.error('Default exception');
		};
	}
}



module.exports = DefaultException;
