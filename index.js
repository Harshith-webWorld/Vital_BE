import https from "https";
import http from "http";
import path from "path";
import fs from "fs";

import { loggers } from "winston";

import config from "./config/config";
import app from "./config/express";

const db = require('./config/sequelize');


var certOptions = {
	key: fs.readFileSync(path.resolve('./server.key')),
	cert: fs.readFileSync(path.resolve('./server.crt'))
}


// Get default logger
const logger = loggers.get(config.loggerName); // eslint-disable-line no-global-assign

// make bluebird default Promise
Promise = require("bluebird"); // eslint-disable-line no-global-assign

//module.parent check is required to support mocha watch
if (!module.parent) {
	var server = https.createServer(certOptions, app).listen(config.port_https);

	http.createServer(app)
		.listen(config.port, function () {
			logger.info(`The application has started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
		});

}

export default app;
