import express from "express";
import { check } from "express-validator";
import authCtrl from "../controllers/auth.controller";
const router = express.Router();
import passportLinkedIn from "../services/auth/linkedin";
import passportGithub from "../services/auth/github";
import passportTwitter from "../services/auth/twitter";
import passportFacebook from "../services/auth/facebook";
import passportGoogle from "../services/auth/google";
import label from "../../config/resources";


router
	.post(
		"/login",
		[
			check("password")
				.exists()
				.withMessage(label.PASSWORD_REQUIRED),
		
			check("userName")
				.exists()
				.withMessage(label.USERNAME_REQUIRED)
			
		],
		authCtrl.login
	)
	.post(
		"/logout", authCtrl.logout
	)

	.post(
		"/forgotPassword",
		[
			check("email")
				.exists()
				.withMessage("Email is required")
		],
		authCtrl.forgotPassword
	)

	.put(
		"/resetPassword/:id",
		[
			check("email")
				.exists()
				.withMessage("Email is required"),
			check("otp")
				.exists()
				.withMessage("OTP is required"),
			check("newpassword")
				.exists()
				.withMessage("OTP is required")
			
		],
		authCtrl.resetPassword
	)
	.post(
		"/verifyOtp",
		[
			check("email")
				.exists()
				.withMessage("Email is required"),
			check("otp")
				.exists()
				.withMessage("OTP is required")
		],
		authCtrl.verifyOtp
	)
	.post(
		"/updatePassword/:id",
		[
			check("newpassword")
				.exists()
				.withMessage("Password is required"),
		],
		authCtrl.updatePassword
	)

	.get('/linkedin', passportLinkedIn.authenticate('linkedin'))
	.get('/linkedin/callback',
		passportLinkedIn.authenticate('linkedin', { failureRedirect: '/' }),
		authCtrl.socialCallback)

	.get('/google', passportGoogle.authenticate('google', { scope: ['email', 'profile'] }))
	.get('/google/callback',
		passportGoogle.authenticate('google', { failureRedirect: '/' }),
		authCtrl.socialCallback)

	.get('/github', passportGithub.authenticate('github', { scope: ['user:email'] }))
	.get('/github/callback',
		passportGithub.authenticate('github', { failureRedirect: '/' }),
		authCtrl.socialCallback)



	.get('/twitter', passportTwitter.authenticate('twitter'))
	.get('/twitter/callback',
		passportTwitter.authenticate('twitter', { failureRedirect: '/' }),
		authCtrl.socialCallback)


	.get('/facebook', passportFacebook.authenticate('facebook'))
	.get('/facebook/callback',
		passportFacebook.authenticate('facebook', { failureRedirect: '/' }),
		authCtrl.socialCallback);

export default router;
