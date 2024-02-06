import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    images: [
        {
            type: String
        }
    ],
    content: {
        type: String,
        required: [ true, "Does it make sense to upload a blog without a blog." ],
        min: [ 60, "The length of the blog cannot be less than 60 words." ],
        max: [ 1000, "The length of the blog has to less than 1000 words." ],
    },
    coverImg: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

export const Blog = mongoose.model( "Blog", blogSchema );