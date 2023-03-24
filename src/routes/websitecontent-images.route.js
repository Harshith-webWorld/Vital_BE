import multer from "multer";
import path from "path";
import fs from "fs";
import { check, oneOf, body, query, param, header } from "express-validator";
import websiteContentImagesCtrl from "../controllers/websitecontent-images.controller";
import express from "express";
const router = express.Router();
let filepath = path.join(__dirname, "../../../") + "src/uploads/website-images";
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		console.log(`filePath::  ${filepath}`);
		console.log(`file exists:: ${fs.existsSync(filepath)}`);
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
		websiteContentImagesCtrl.create
	)
	.get("/list", websiteContentImagesCtrl.getwebsiteContentImages)

	.get(
		"/getone",
		[query("id").exists().withMessage("website Images Id is required")],
		websiteContentImagesCtrl.getwebsiteContentImages
	)

	.put(
		"/update",
		upload.fields([
			{
				name: "images",
			},
		]),
		websiteContentImagesCtrl.create
	)

	.delete(
		"/delete",
		[query("id").exists().withMessage("website Images Id is required")],
		websiteContentImagesCtrl.deletewebsiteContentImages
	)
	.get("/images/:fileName",websiteContentImagesCtrl.getFile);


export default router;
