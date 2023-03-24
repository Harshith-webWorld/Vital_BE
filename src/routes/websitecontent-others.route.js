import multer from "multer";
import path from "path";
import fs from "fs";
import { check, oneOf, body, query, param, header } from "express-validator";
import websiteContentOthersCtrl from "../controllers/websitecontent-others.controller";
import express from "express";
const router = express.Router();

let filepath = path.join(__dirname, "../../../") + "src/uploads/websitecontent-others";
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		console.info(`filePath::  ${filepath}`);
		console.info(`file exists:: ${fs.existsSync(filepath)}`);
		if (!fs.existsSync(filepath)) {
			fs.mkdirSync(filepath, { recursive: true });
		}
		callback(null, filepath);
	},
	filename(req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

router
	.post(
		"/createMenu",
		upload.fields([
			{
				name: "others",
			},
		]),
		websiteContentOthersCtrl.create
	)
	.get("/listMenu", websiteContentOthersCtrl.getwebsiteContentOthers)

	.get(
		"/getoneMenu/:id",
		websiteContentOthersCtrl.getwebsiteContentOthers
	)

	.put(
		"/updateMenu/:id",
		upload.fields([
			{
				name: "others",
			},
		]),
		websiteContentOthersCtrl.create
	)

	.delete(
		"/deleteMenu/:id",
		websiteContentOthersCtrl.deletewebsiteContentOthers
	)
	.post(
		"/create-OthersLink",
		upload.fields([
			{
				name: "otherslink",
			},
		]),
		websiteContentOthersCtrl.createOthersLinks
	)
	.get("/listOthersLinks/:otherMenuId", websiteContentOthersCtrl.getwebsiteContentOthersLinks)

	.get(
		"/getone-OthersLink/:id",
		websiteContentOthersCtrl.getwebsiteContentOthersLinks
	)

	.put(
		"/update-OthersLink/:id",
		upload.fields([
			{
				name: "otherslink",
			},
		]), websiteContentOthersCtrl.createOthersLinks
	)

	.delete(
		"/delete-OthersLink/:id",
		websiteContentOthersCtrl.deletewebsiteContentOthersLinks
	)

	.post(
		"/create-OthersSection",
		websiteContentOthersCtrl.createOthersections
	)
	.get("/listOthersSections/:otherMenuId", websiteContentOthersCtrl.getwebsiteContentOthersSections)
	.get("/getone-OthersSection/:id", websiteContentOthersCtrl.getwebsiteContentOthersSections)
	.put("/update-OthersSection/:id", websiteContentOthersCtrl.createOthersections)
	.delete("/delete-OthersSection/:id", websiteContentOthersCtrl.deletewebsiteContentOthersSections)

	.get("/otherslink/:fileName", websiteContentOthersCtrl.getothersLinkFile)
	.get("/blogs/:fileName", websiteContentOthersCtrl.getFile)


export default router;
