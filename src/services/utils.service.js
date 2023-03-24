import _ from "lodash";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import moment from "moment";
import CONFIG from "../../config/config";
const saltRounds = 10;
import db from "../../config/sequelize";
const { users } = db;
export default {
	dateDiff(date, diffStr) {
		const currDate = moment();
		const createdDate = moment(date);
		return currDate.diff(createdDate, diffStr);
	},

	generateOTP() {
		const min = 100000;
		const max = 999999;

		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return re.test(email);
	},

	getReqValues(req) {
		return _.extend(req.body, req.params, req.query);
	},

	password(user) {
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash = bcrypt.hashSync(user.password, salt);

		return hash;
	},
	updatePassword(pass) {
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash = bcrypt.hashSync(pass, salt);

		return hash;
	},
	comparePassword(pw, hash) {
		const pass = bcrypt.compareSync(pw, hash);

		return pass;
	},

	unLinkFilePath(filePath) {
		return new Promise(resolve => {
			fs.unlink(filePath, err => {
				if (err) {
					resolve({ status: false, message: err });
				} else {
					resolve({ status: true });
				}
			});
		});
	},

	getActivityLogs(notify) {
		return new Promise(resolve => {
			try {
				const filePath = path.join(
					__dirname,
					"../constant/activitylog.json"
				);

				fs.readFile(filePath, "utf8", (err, res) => {
					if (err) {
						resolve({ status: false, message: err });
					} else {
						const notifyInfo = JSON.parse(res);

						resolve({ status: true, data: notifyInfo[notify] });
					}
				});
			} catch (error) {
				resolve({ status: false, message: error });
			}
		});
	},
	ageCalculation(dob) {
		if (dob) {
			const diff_ms = Date.now() - dob.getTime();
			const age = new Date(diff_ms);

			return Math.abs(age.getUTCFullYear() - 1970);
		}
		return 0;
	},

	transporter(mailOptions) {
		const transporter = nodemailer.createTransport({
			host: CONFIG.smtpHost,
			auth: {
				user: CONFIG.commonEmail,
				pass: CONFIG.commonEmailPwd
			}
		});
		var messageObject = {
			from: CONFIG.commonEmail,
			to: mailOptions.email,
			subject: mailOptions.subject,
			text: mailOptions.message
		}
		transporter.sendMail(messageObject, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

		return transporter;
	},

	sendVerificationEmail(mailData) {
		const mailTransport = this.transporter();

		const emailOtpTemplate = path.resolve("src/template/emailWithOTP.html");

		this.readHTMLFile(emailOtpTemplate, async (err, html) => {
			if (err) {
				console.log(err);
				return false;
			}
			const template = Handlebars.compile(html);
			const replacements = {
				otp: mailData.otp
			};
			const htmlToSend = template(replacements);
			const mailOptions = {
				from: CONFIG.commonMail,
				to: mailData.emailId,
				subject: "Mocial Verification",
				html: htmlToSend
			};

			const info = await mailTransport.sendMail(mailOptions);
		});
	},

	readHTMLFile(path, callback) {
		fs.readFile(path, { encoding: "utf-8" }, (err, html) => {
			if (err) {
				console.log(err);
				callback(err);
			} else {
				console.log(html);
				callback(null, html);
			}
		});
	},

	generateToken(data) {
		const mobileResponse = {};
		const tokenObject = {};

		tokenObject.id = data._id;
		return new Promise((resolve, reject) => {
			jsonwebtoken.sign(
				tokenObject,
				CONFIG.jwtSecret,
				{ expiresIn: CONFIG.jwtTokenExpire },
				(err, token) => {
					if (err) {
						console.log(err);
						mobileResponse.error = true;
						mobileResponse.errorMessage = err;
						resolve(mobileResponse);
					} else if (res.success === true) {
						mobileResponse.error = false;
						resolve(mobileResponse);
					} else {
						mobileResponse.error = true;
						resolve(mobileResponse);
					}
				}
			);
		});
	},

	initialUserRecords() {
		fs.readFile(
			CONFIG.uploadPath + "server/config/initialRecords.json",
			(err, data) => {
				if (data) {
					const initialRecords = JSON.parse(data);
					Object.keys(initialRecords).forEach(async tableName => {
						if (tableName == "users") {
							_.forEach(
								initialRecords[tableName],
								async records => {
									try {
										await this.createInitialRecord(
											tableName,
											records
										);
									} catch (err) {
										console.error(
											"Initial Record Error",
											err
										);
									}
								}
							);
						} else {
							await this.createInitialRecord(
								tableName,
								initialRecords[tableName]
							);
						}
					});
				}
			}
		);
	},
	async createInitialRecord(tableName, records) {
		try {
			if (tableName == "users") {
				await users.create(records);
			}
		} catch (err) {
			console.log("err" + err);
		}
	},
	monthIdtoMonth: {
		1: "jan",
		2: "feb",
		3: "mar",
		4: "apr",
		5: "may",
		6: "jun",
		7: "jul",
		8: "aug",
		9: "sep",
		10: "oct",
		11: "nov",
		12: "dec"
	},

	monthDiff(startYear, endYear, startMonth, endMonth) {
		let dateFrom = new Date(startYear, startMonth - 1)
		let dateTo = new Date(endYear, endMonth - 1)
		return (dateTo.getMonth() - dateFrom.getMonth() +
			(12 * (dateTo.getFullYear() - dateFrom.getFullYear()))) + 1
	}
};
