import { Like } from "../models/likes.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const likeBlog = asyncHandler(async (req, res, next) => {
    const { blogId } = req.body;
    const { id } = req.user;

    try {
        console.log("Like Blog Controller - Request Body:", req.body);
        console.log("Like Blog Controller - User ID:", id);

        if (!id) {
            throw new ApiError(400, "User ID is required.");
        }

        if (!blogId) {
            throw new ApiError(400, "Blog ID is required.");
        }

        const existingLike = await Like.findOne({ likedBy: id, post: blogId });

        if (!existingLike) {
            const newLike = {
                likeType: true,
                likedBy: id,
                post: blogId
            };

            await Like.create(newLike);

            console.log("New Like created:", newLike);

            return res.status(201).json(new ApiResponse(200, true, "Liked!!!"));
        } else {
            if (existingLike.likeType === true) {
                await Like.deleteOne({
                    likedBy: id,
                    post: blogId
                });

                console.log("Existing Like deleted.");

                return res.status(200).json(new ApiResponse(200, true, "Like removed"));
            } else {
                existingLike.likeType = true;
                const updatedLike = await existingLike.save();

                console.log("Existing Like updated:", updatedLike);

                return res.status(200).json(new ApiResponse(200, "Like updated."));
            }
        }
    } catch (error) {
        console.log(`Error occurred in likeBlog controller: ${error.message}`);
        next(error);
    }
});

const dislikeBlog = asyncHandler(async (req, res, next) => {
    const { blogId } = req.body;
    const { id } = req.user;

    try {
        console.log("Dislike Blog Controller - Request Body:", req.body);
        console.log("Dislike Blog Controller - User ID:", id);

        if (!id) {
            throw new ApiError(400, "User ID is required.");
        }

        if (!blogId) {
            throw new ApiError(400, "Blog ID is required.");
        }

        const existingLike = await Like.findOne({ likedBy: id, post: blogId });

        if (!existingLike) {
            const newDislike = {
                likeType: false,
                likedBy: id,
                post: blogId
            };

            const createNewDislike = await Like.create(newDislike);

            console.log("New Dislike created:", newDislike);

            if (!createNewDislike) {
                throw new ApiError(500, "Could not dislike the post");
            } else {
                return res.status(201).json(new ApiResponse(200, true, "Disliked!!!"));
            }
        } else {
            if (existingLike.likeType === false) {
                await Like.deleteOne({
                    post: blogId,
                    likedBy: id
                });

                console.log("Existing Dislike deleted.");

                return res.status(200).json(new ApiResponse(200, true, "Dislike removed"));
            } else {
                existingLike.likeType = false;
                const updatedLike = await existingLike.save();

                console.log("Existing Dislike updated:", updatedLike);

                return res.status(200).json(new ApiResponse(200, "Dislike updated."));
            }
        }
    } catch (error) {
        console.log(`Error occurred in dislikeBlog controller: ${error.message}`);
        next(error);
    }
});

const countLikes = asyncHandler(async (req, res, next) => {
    const { blogId } = req.query;

    try {
        console.log("Count Likes Controller - Blog ID:", blogId);

        if (!blogId) {
            throw new ApiError(400, "Blog ID is required to find the number of likes.");
        }

        const likeCount = await Like.aggregate([
            {
                $match: {
                    post: new mongoose.Types.ObjectId(blogId),
                    likeType: true
                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ]);

        console.log("Like Count:", likeCount);

        return res.status(200).json(new ApiResponse(200, likeCount.length > 0 ? likeCount[0].count : 0, "Number of likes retrieved."));
    } catch (error) {
        console.log(`Error occurred in countLikes controller: ${error.message}`);
        next(error);
    }
});

const countDislikes = asyncHandler(async (req, res, next) => {
    const { blogId } = req.query;

    try {
        console.log("Count Dislikes Controller - Blog ID:", blogId);

        if (!blogId) {
            throw new ApiError(400, "Blog ID is required to find the number of dislikes.");
        }

        const dislikeCount = await Like.aggregate([
            {
                $match: {
                    post: new mongoose.Types.ObjectId(blogId),
                    likeType: false
                }
            },
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);

        console.log("Dislike Count:", dislikeCount);

        if (!dislikeCount) {
            throw new ApiError(500, "Error occurred while counting the number of dislikes.");
        }

        return res.status(200).json(new ApiResponse(200, dislikeCount.length > 0 ? dislikeCount[0].count : 0, "Number of dislikes retrieved."));
    } catch (error) {
        console.log(`Error occurred in countDislikes controller: ${error.message}`);
        next(error);
    }
});

const hasReacted = asyncHandler(async (req, res, next) => {
    const user = req.user;
    const { blogId } = req.query;

    try {
        console.log("Has Reacted Controller - User:", user);
        console.log("Has Reacted Controller - Blog ID:", blogId);

        if (!user) {
            throw new ApiError(404, "Please login to react to posts.");
        }

        if (!blogId) {
            throw new ApiError(400, "Blog ID cannot be empty.");
        }

        const reaction = await Like.aggregate([
            {
                $match: {
                    likedBy: new mongoose.Types.ObjectId(user.id),
                    post: new mongoose.Types.ObjectId(blogId)
                }
            }
        ]);

        console.log("Reaction:", reaction);

        if (!reaction) {
            throw new ApiError(500, "Error occurred while fetching the reaction of the user.");
        }

        if (reaction.length === 0) {
            return res.status(200).json(new ApiResponse(200, 0, "The user didn't react to it."));
        }

        if (reaction[0].likeType === true) {
            return res.status(200).json(new ApiResponse(200, 1, "User liked the post."));
        }

        if (reaction[0].likeType === false) {
            return res.status(200).json(new ApiResponse(200, -1, "User disliked the post."));
        }
    } catch (error) {
        console.log(`Error occurred in hasReacted controller: ${error.message}`);
        next(error);
    }
});

export { likeBlog, dislikeBlog, countLikes, countDislikes, hasReacted };