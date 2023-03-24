import { validationResult } from "express-validator";
import httpStatus from "http-status";
import _ from "lodash";
import { v1 as uuidv1 } from "uuid";
import popupTools from "popup-tools";
import nodemailer from "nodemailer";
import { uniqueNamesGenerator, NumberDictionary } from "unique-names-generator";
import str from "string-sanitizer";

import utils from "../services/utils.service";
import bcryptService from "../services/bcrypt.service";
import authService from "../services/auth.service";
import config from "../../config/config";
import label from "../../config/resources";
import db from "../../config/sequelize";
import userRoleScreenActivitiesController from "./userRoleScreenActivities.controller";
import { boolean } from "@hapi/joi";
const { users } = db;
const { loginHistory } = db;

const Op = db.Sequelize.Op;

const attr = [
	"id",
	"userName",
	"email",
	"mobile",
	"roleId",
	"isActive",
	"createdBy",
	"lastModifiedBy",
];

const AuthController = () => {
	const login = async (req, res, next) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw errors.array();
			}

			const reqObj = utils.getReqValues(req);

			let whereCodn = {};
			if (reqObj.userName) {
				whereCodn["userName"] = reqObj.userName;
			}
			whereCodn["isActive"] = true;

			let userData = await users.findOne({
				where: whereCodn,
			});

			let auth = false;
			console.log("ggg:: ", userData);
			if (userData && userData.password) {
				auth = await bcryptService().comparePassword(
					reqObj.password,
					userData.password
				);
			} else {
				return res.status(httpStatus.OK).json({
					status: false,
					message: label.USER_NOTFOUND,
				});
			}

			if (auth) {
				let token = await authService.issue(userData.email,userData.id);
				userData.token = token;
				let userResult = await userData.save();
				req.body.userId = userResult.id;
				let userScreens =
					await userRoleScreenActivitiesController.getUserRoleScreenActivities(
						req,
						res
					);
				
				//Save to login history
				if (reqObj.ip) {
					let historyObj = {
						userId: userData.id,
						loginTime: new Date(),
						logoutTime: null,
						loginIP: reqObj.ip,
						createdBy: userData.id
					}
					await loginHistory.create(historyObj);
				}
				if (userScreens.length > 0) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.LOGIN_SUCCESS,
						data: userScreens[0],
						token: token,
					});
				} else {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.LOGIN_SUCCESS,
						data: userResult,
						token: token,
					});
				}
			} else {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: false,
					message: label.LOGIN_FAILED,
				});
			}
		} catch (err) {
			console.log("err: ",err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const forgotPassword = async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const userInput = utils.getReqValues(req);
			let otp = utils.generateOTP();
			let whereCodn = {};
			whereCodn["isActive"] = true;

			let otpEmail = true;

			if (userInput.email) {
				whereCodn["email"] = userInput.email;
			}

			if (userInput.mobile) {
				otpEmail = false;
				whereCodn["mobile"] = userInput.mobile;
			}
			if (otp) {
				userInput.userOtp = otp;
			}

			let userData = await users.findOne({
				where: whereCodn,
			});
			console.log("userData:: ", userData);
			if (!userData) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.USER_NOTFOUND,
				});
			}

			if (otpEmail && userData) {
				let smtpTransport = nodemailer.createTransport({
					service: config.smtpService,
					host: config.smtpHost,
					auth: {
						user: config.commonEmail, // generated ethereal user
						pass: config.commonEmailPwd, // generated ethereal password
					},
				});

				smtpTransport.verify(function (error, success) {
					if (error) {
						console.log(error);
					} else {
						console.log("Server is ready to take our messages");
					}
				});

				var mailOptions = {
					to: userInput.email,
					from: "******",
					subject: "APP - Forgot Password:",
					cc: "*******",
					text:
						"Hello " +
						userData.fullName +
						"," +
						"\n\n" +
						"Please Use this OTP to Reset :" +
						otp,
				};

				smtpTransport.sendMail(mailOptions, async function (err) {
					if (err) {
						console.log("errrrr");
						return res.status(httpStatus.BAD_REQUEST).json({
							status: false,
							message: label.EMAIL_SENT_FAILED,
						});
					} else {
						console.log("success");
						userData = await users.update(userInput, {
							where: { email: userInput.email },
						});

						return res.status(httpStatus.OK).json({
							status: true,
							data: userData,
							message: label.OTP_SUCCESS,
						});
					}
				});
			}

			if (!otpEmail) {
				// Send OTP to Mobile
			}
		} catch (err) {
			console.log("err" + err);
		}
	};

	const resetPassword = async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const userInput = utils.getReqValues(req);
			const { newpassword, email, otp, id } = userInput;

			let whereCodn = {};
			whereCodn["email"] = email;
			whereCodn["userOtp"] = otp;
			whereCodn["id"] = id;
			await users
				.findOne({
					where: whereCodn,
				})
				.then(async function (response, err) {
					if (response) {
						await users.update(
							{ password: newpassword, userOtp: null },
							{
								where: whereCodn,
							}
						);
						return res.status(httpStatus.OK).json({
							status: true,
							message: label.PASS_RESET_SUCCESS,
						});
					} else {
						return res.status(httpStatus.BAD_REQUEST).json({
							status: false,
							message: label.PASS_RESET_FAILED,
						});
					}
				})
				.catch(function (err) {
					return res.status(httpStatus.BAD_REQUEST).json({
						status: false,
						message: label.PASS_RESET_FAILED,
					});
				});
		} catch (err) {
			console.log("err" + err);
		}
	};
	const updatePassword = async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const userInput = utils.getReqValues(req);
			const { newpassword, id, oldpassword } = userInput;
			let whereCodn = {};
			whereCodn["id"] = id;
			let auth = false;
			await users
				.findOne({
					where: whereCodn,
				})
				.then(async function (response, err) {
					if (response && response.password) {
						auth = await bcryptService().comparePassword(
							oldpassword,
							response.password
						);
					} else {
						return res.status(httpStatus.OK).json({
							status: false,
							message: label.USER_NOTFOUND,
						});
					}
					if (!auth) {
						return res.status(httpStatus.BAD_REQUEST).json({
							status: false,
							message: label.INCORRECT_OLD_PASSWORD,
						});
					}
					if (auth && oldpassword == newpassword) {
						return res.status(httpStatus.BAD_REQUEST).json({
							status: false,
							message: label.SAME_AS_OLD_PASSWORD,
						});
					}
					if (response) {
						await users.update(
							{ password: newpassword },
							{
								where: whereCodn,
							}
						);
						return res.status(httpStatus.OK).json({
							status: true,
							message: label.PASS_UPDATE_SUCCESS,
						});
					} else {
						return res.status(httpStatus.BAD_REQUEST).json({
							status: false,
							message: label.PASS_UPDATE_FAILED,
						});
					}
				})
				.catch(function (err) {
					return res.status(httpStatus.BAD_REQUEST).json({
						status: false,
						message: label.PASS_UPDATE_FAILED,
					});
				});
		} catch (err) {
			console.log("err" + err);
		}
	};

	const verifyOtp = async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const userInput = utils.getReqValues(req);
			const { email, otp } = userInput;

			let whereCodn = {};
			whereCodn["email"] = email;
			whereCodn["userOtp"] = otp;
			await users
				.findOne({
					where: whereCodn,
				})
				.then(async function (response) {
					if (response) {
						return res.status(httpStatus.OK).json({
							status: true,
							data: response,
							message: label.OTP_VRIFY_SUCCESS,
						});
					} else {
						return res.status(httpStatus.BAD_REQUEST).json({
							status: false,
							message: label.OTP_VRIFY_FAILED,
						});
					}
				})
				.catch(function (err) {
					console.log(err);
				});
		} catch (err) {
			console.log("err" + err);
		}
	};

	const socialCallback = async (req, res, next) => {
		try {
			let { provider, photos, id, name, displayName, username, emails } =
				req.user;
			const numberDictionary = NumberDictionary.generate({
				min: 100,
				max: 999,
			});

			let providerId = id;
			let first_name = name && name.givenName ? name.givenName : null;
			let last_name = name && name.familyName ? name.familyName : null;
			let userName = username
				? username
				: uniqueNamesGenerator({
						dictionaries: [
							[str.sanitize(displayName)],
							numberDictionary,
						],
						length: 2,
						separator: "",
						style: "lowerCase",
				  });
			let email = emails ? emails[0].value : null;
			let profilePic = photos ? photos[0].value : null;

			let usrObj = {};

			if (!providerId || !email) {
				throw "Invalid user";
			}

			console.log(
				`req.session.passport: ${JSON.stringify(req.session.passport)}`
			);
			console.log(
				`req.session.passport - 1 : ${JSON.stringify(req.session)}`
			);

			let whereCodn = {};
			whereCodn["email"] = email;

			let userData = await users.findOne({
				where: whereCodn,
				attributes: attr,
			});

			console.log("userData", userData);

			if (userData) {
				console.log("userData", userData.firstName);

				let cond = {};
				cond["userId"] = userData.id;
				cond["provider"] = provider;
				cond["providerId"] = id;

				let authData = await SocialAuth.findOne({
					where: cond,
					attributes: ["id"],
				});

				console.log("authDataauthDataauthData", authData);
				let authObj = {
					userId: userData.id,
					provider: provider,
					providerId: providerId,
					providerData: req.user,
				};

				if (!authData) {
					await SocialAuth.create(authObj);
				} else {
					authData.id = authData.id;
					authData.userId = userData.id;
					authData.provider = provider;
					authData.providerId = providerId;
					authData.providerData = req.user;

					await authData.save();
				}
			} else {
				usrObj["email"] = email;
				usrObj["displayName"] = displayName;
				usrObj["userName"] = userName;
				usrObj["password"] = "123456";
				usrObj["firstName"] = first_name;
				usrObj["lastName"] = last_name;
				usrObj["profileImg"] = profilePic;

				console.log("usrObjusrObj", usrObj);

				userData = await users.create(usrObj);

				await SocialAuth.create({
					userId: userData.id,
					provider: provider,
					providerId: providerId,
					providerData: req.user,
				});
			}

			let loggedUser = _.pick(userData, attr);

			let udid = uuidv1();
			let token = await authService.issue({
				userId: userData.id,
				provider: provider,
				udid: udid,
			});

			let sessions = await usersessions.create({
				userId: userData.id,
				udid: udid,
				token: token,
				deviceInfo: { provider: provider, device: "web" },
			});

			loggedUser.sessionData = _.pick(sessions, ["udid", "token"]);

			console.log("reqObjreqObjreqObjreqObj", loggedUser);
			res.send(popupTools.popupResponse(loggedUser));
		} catch (err) {
			console.log("errr===>", err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			res.send(popupTools.popupResponse(err));
		}
	};

	const logout = async (req, res, next) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw errors.array();
			}

			const reqObj = utils.getReqValues(req);

			let whereCodn = {};
			if (reqObj.clientIp) {
				whereCodn["loginIP"] = reqObj.clientIp;
			}

			let historyData = await loginHistory.findOne({
				where: whereCodn,
				order: [["loginTime", "DESC"]],
			});

			if (historyData) {
				historyData.logoutTime = new Date();
				await historyData.save();

				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.LOGOUT_SUCCESS,
					data: historyData
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.LOGOUT_SUCCESS,
					data: historyData
				});
			}
			
		} catch (err) {
			console.log("err :",err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	return {
		login,
		forgotPassword,
		resetPassword,
		verifyOtp,
		socialCallback,
		updatePassword,
		logout
	};
};

export default AuthController();
