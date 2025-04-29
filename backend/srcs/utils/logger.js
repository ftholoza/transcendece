const Pino = require('pino');

const logger = Pino({
	level: 'debug',
	transport: {
		target: 'pino-pretty',
		options: {
			ignore: 'pid,hostname',
			translateTime: 'dd-mm-yyyy HH:MM:ss',
			hideObject: false,
			minimumLevel: 'debug',
		},
	},
});

module.exports = logger;
