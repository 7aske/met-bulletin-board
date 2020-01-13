import { Router } from "express";
import { constants as STATUS } from "http2";
import SlideModel from "../schema/SlideSchema";
import { ISlide } from "../../@types/Slide";
import { authorizeRequest } from "../middleware/authentication";

const slide = Router();


/**
 * Fetches all slides if no body supplied. Otherwise finds a slide by 'slideID' if JSON body supplied as follows:
 * {
 * 	 	slideID: "slide_id"
 * }
 */
slide.get("/", async (req, res) => {
	const slideID = req.body["slideID"];
	if (slideID) {
		let slide = await SlideModel.findOne({slideID});
		res.status(STATUS.HTTP_STATUS_OK).json(slide);
	} else {
		const slides = await SlideModel.find();
		res.status(STATUS.HTTP_STATUS_OK).json({slides});
	}
});

/**
 * Deletes the slide by given ID from request body.
 * {
 *     "slideID": "slide_id"
 * }
 */
slide.delete("/", authorizeRequest, async (req, res) => {
	const slideID: string = req.body["slideID"] || req.query["slideID"];
	if (slideID === undefined) {
		res.status(STATUS.HTTP_STATUS_NOT_FOUND).json({slideID, message: "Not Found"});
	} else {
		try {
			const r = await SlideModel.findOneAndDelete({slideID}).exec();
			if (r !== null) {
				res.status(STATUS.HTTP_STATUS_OK).json({slideID, message: "Ok"});
			} else {
				res.status(STATUS.HTTP_STATUS_NOT_FOUND).json({slideID, message: "Not Found"});
			}
		} catch (e) {
			console.error(e);
			res.status(STATUS.HTTP_STATUS_BAD_REQUEST).json(e);
		}
	}
});

/**
 * Updates the slide by slideID property. 'slideID' property is required.
 * {
 *     "slideID": "slide_id",
 *
 *     "prop1": "val1",
 *     "prop2": "val2",
 *     ...
 * }
 */
slide.put("/", authorizeRequest, async (req, res) => {
	let slide: ISlide = req.body;
	try {
		slide = await SlideModel.findOneAndUpdate({slideID: slide.slideID}, {...slide}, {new: true});
		res.status(STATUS.HTTP_STATUS_CREATED).json(slide);
	} catch (e) {
		console.error(e);
		res.status(STATUS.HTTP_STATUS_BAD_REQUEST).json(e);
	}
});

/**
 * Creates a new slide. JSON body should be as follows:
 * 	{
 *		slideID: {type: String, required: false},
 *		slideTitle: {type: String, required: true},
 *		slideBodyTitle: {type: String, required: true},
 *		slideBodyText: {type: String, required: true},
 *		slideImageUrl: {type: String, default: ""},
 *		poll: {type: PollSchema, required: false},
 *  }
 */
slide.post("/", authorizeRequest, async (req, res) => {
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
