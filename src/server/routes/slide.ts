import { Router } from "express";
import { constants as STATUS } from "http2";
import SlideModel from "../schema/SlideSchema";
import { ISlide } from "../../@types/Slide";

const slide = Router();

slide.get("/", async (req, res) => {
	const slideID = req.body["slideID"];
	if (slideID) {
		let slide = await SlideModel.findOne({slideID});
		res.status(STATUS.HTTP_STATUS_OK).json(slide);
	} else {
		const slides = await SlideModel.find({});
		res.status(STATUS.HTTP_STATUS_OK).json({slides});
	}
});

slide.delete("/", async (req, res) => {
	const slideID: string = req.body["slideID"];
	try {
		await SlideModel.findOneAndDelete({slideID}).exec();
		res.status(STATUS.HTTP_STATUS_OK).json({message: "Ok"});
	} catch (e) {
		console.error(e);
		res.status(STATUS.HTTP_STATUS_BAD_REQUEST).json(e);
	}
});


slide.put("/", async (req, res) => {
	let slide: ISlide = req.body;
	try {
		slide = await SlideModel.findOneAndUpdate({slideID: slide.slideID}, {...slide}, {new: true});
		res.status(STATUS.HTTP_STATUS_OK).json(slide);
	} catch (e) {
		console.error(e);
		res.status(STATUS.HTTP_STATUS_BAD_REQUEST).json(e);
	}
});


slide.post("/", async (req, res) => {
	let slide: ISlide = req.body;
	const slideDoc = new SlideModel(slide);
	try {
		slide = await slideDoc.save();
		res.status(STATUS.HTTP_STATUS_CREATED).json(slide);
	} catch (e) {
		console.error(e);
		res.status(STATUS.HTTP_STATUS_BAD_REQUEST).json(e);
	}

});

export default slide;
