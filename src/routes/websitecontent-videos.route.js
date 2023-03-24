import multer from "multer";
import path from "path";
import fs from "fs";
import { check, oneOf, body, query, param, header } from "express-validator";
import websiteContentVideosCtrl from "../controllers/websitecontent-videos.controller";
import express from "express";
const router = express.Router();
let filepath =
	path.join(__dirname, "../../../") + "src/uploads/websitecontent-videos";
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
		console.log(`cb::`, file.originalname);
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

router
	.post(
		"/create",
		upload.fields([
			{
				name: "videos",
			},
			{
				name: "thumbnail"
			}
		]),
		websiteContentVideosCtrl.create
	)
	.get("/list", websiteContentVideosCtrl.getwebsiteContentVideos)

	.get(
		"/getone",
		[
			query("id")
				.exists()
				.withMessage("website Content Video Id is required"),
		],
		websiteContentVideosCtrl.getwebsiteContentVideos
	)

	.put(
		"/update",
		upload.fields([
			{
				name: "videos",
			},
			{
				name: "thumbnail"
			}
		]),
		websiteContentVideosCtrl.create
	)

	.delete(
		"/delete",
		[query("id").exists().withMessage("website Content Video is required")],
		websiteContentVideosCtrl.deletewebsiteContentVideos
	)
	.get("/videos/:fileName", websiteContentVideosCtrl.getFile);

export default router;
