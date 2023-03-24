import multer from "multer";
import path from "path";
import fs from "fs";
import { check, oneOf, body, query, param, header } from "express-validator";
import websiteContentProgramInfosCtrl from "../controllers/websitecontent-programinfos.controller";
import express from "express";
const router = express.Router();
let filepath = path.join(__dirname, "../../../") + "src/uploads/website-programinfos";
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
		"/create-programInfo",
		upload.fields([
			{
				name: "programInfos",
			},
		]),
		websiteContentProgramInfosCtrl.create
	)
	.get("/listProgramInfos", websiteContentProgramInfosCtrl.getwebsiteContentProgramInfos)

	.get(
		"/getone-programInfo/:id",
		websiteContentProgramInfosCtrl.getwebsiteContentProgramInfos
	)

	.put(
		"/update-programInfo/:id",
		upload.fields([
			{
				name: "programInfos",
			},
		]),
		websiteContentProgramInfosCtrl.create
	)

	.delete(
		"/delete-programInfo/:id",
		websiteContentProgramInfosCtrl.deletewebsiteContentProgramInfos
	)
	.get("/blogs/:fileName",websiteContentProgramInfosCtrl.getFile)

	.post(
		"/create-programInfoLink",
		upload.fields([
			{
				name: "programInfoLinks",
			},
		]),
		websiteContentProgramInfosCtrl.createProgramInfoLinks
	)
	.get("/listProgramInfoLinks/:programInfoId", websiteContentProgramInfosCtrl.getwebsiteContentProgramInfoLinks)

	.get(
		"/getone-programInfoLink/:id",
		websiteContentProgramInfosCtrl.getwebsiteContentProgramInfoLinks
	)

	.put(
		"/update-programInfoLink/:id",
		websiteContentProgramInfosCtrl.createProgramInfoLinks
	)

	.delete(
		"/delete-programInfoLink/:id",
		websiteContentProgramInfosCtrl.deletewebsiteContentProgramInfoLinks
	)
	.get("/programInfoLinks/:fileName",websiteContentProgramInfosCtrl.getProgramInfoLinkFile)

	.post(
		"/create-programInfoSection",
		websiteContentProgramInfosCtrl.createProgramInfoSections
	)
	.get("/listProgramInfoSections/:programInfoId", websiteContentProgramInfosCtrl.getwebsiteContentProgramInfoSections)
	.get("/getone-programInfoSection/:id",websiteContentProgramInfosCtrl.getwebsiteContentProgramInfoSections)
	.put("/update-programInfoSection/:id",websiteContentProgramInfosCtrl.createProgramInfoSections)
	.delete("/delete-programInfoSection/:id",websiteContentProgramInfosCtrl.deletewebsiteContentProgramInfoSections)

export default router;
