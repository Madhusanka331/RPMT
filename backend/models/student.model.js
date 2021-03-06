import mongoose from "mongoose";
import { mediaServices } from "../services/media.service";

const _schema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			unique: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		photo: {
			type: String,
		},
		phone: {
			type: String,
			required: true,
		},
		groupId: {
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

_schema.virtual("user", {
	ref: "User",
	localField: "userId",
	foreignField: "_id",
	justOne: true,
});

_schema.virtual("group", {
	ref: "Group",
	localField: "groupId",
	foreignField: "_id",
	justOne: true,
});

_schema.virtual("photoUrl").get(function () {
	return this.photo ? mediaServices.getProfilePicturesURL(this.photo) : null;
});

export const Student = mongoose.model("Student", _schema);
