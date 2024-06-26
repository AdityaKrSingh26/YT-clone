import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        imgUrl: {
            type: String,
            required: true,
        },
        likes: {
            type: [String],
            default: [],
        },
        dislikes: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Community", communitySchema);
