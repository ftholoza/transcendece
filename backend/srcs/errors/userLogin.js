const logger = require("../utils/logger.js");
const DefaultException = require('./default.js');

class UserLoginException extends DefaultException {
    constructor(response) {
        super();

        this.name = 'UserLoginException';
        this.res = response;

        this.fallback = () => {
            logger.info('User Login not found');
            
            this.res.status(404).json();
        }
    }
}

module.exports = UserLoginException;