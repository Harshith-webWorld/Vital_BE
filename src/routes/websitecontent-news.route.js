import multer from "multer";
import path from "path";
import fs from "fs";
import { check, oneOf, body, query, param, header } from "express-validator";
import websiteContentNewsCtrl from "../controllers/websitecontent-news.controller";
import express from "express";
const router = express.Router();
let filepath = path.join(__dirname, "../../../") + "src/uploads/website-news";
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
		"/create",
		upload.fields([
			{
				name: "images",
			},
		]),
		websiteContentNewsCtrl.create
	)
	.get("/list", websiteContentNewsCtrl.getwebsiteContentNews)

	.get(
		"/getone",
		[query("id").exists().withMessage("website News Id is required")],
		websiteContentNewsCtrl.getwebsiteContentNews
	)

	.put(
		"/update",
		upload.fields([
			{
				name: "images",
			},
		]),
		websiteContentNewsCtrl.create
	)

	.delete(
		"/delete",
		[query("id").exists().withMessage("website News Id is required")],
		websiteContentNewsCtrl.deletewebsiteContentNews
	)
	.get("/news/:fileName",websiteContentNewsCtrl.getFile)


export default router;
