import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    likeType: {
        type: Boolean
    },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        index: true
    }
}, { timestamps: true });

export const Like = mongoose.model("Like", likeSchema);