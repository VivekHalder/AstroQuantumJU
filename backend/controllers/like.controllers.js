import { Like } from "../models/likes.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const likeBlog = asyncHandler(async (req, res, error) => {
    const { blogId } = req.body;
    const { id } = req.user;

    try {
        if(!id){
            throw new ApiError(
                400,
                "User ID is required."
            )
        }
    
        if(!blogId){
            throw new ApiError(
                400,
                "Blog ID is required."
            )
        }
    
        const existingLike = await Like.findOne({ likedBy: id, post: blogId });
    
        if(!existingLike){
            const newLike = {
                likeType: true,
                likedBy: id,
                post: blogId
            }
    
            await Like.create(newLike);
            
            return res
            .status(201)
            .json(new ApiResponse(
                200,
                true,
                "Liked!!!"
            ));
        } else{
            if(existingLike.likeType === true){
                throw new ApiError(
                    400,
                    "Already Liked!!!"
                )
            } else{
                existingLike.likeType = true;
                const updatedLike = await existingLike.save();
    
                if(updatedLike){
                    return res
                    .status(200)
                    .json( new ApiResponse(
                        200,
                        "Like updated."
                    ) )
                } else{
                    throw new ApiError(
                        500,
                        "Failed to update dislike to like."
                    )
                }
            }
        }
    } catch (error) {
        console.log(`Error occured. ${error}`);
        next(error)
    }
});

const dislikeBlog = asyncHandler(async (req, res, next) => {
    const { blogId } = req.body;
    const { id } = req.user;

    try {
        if (!id) {
            throw new ApiError(
                400, "User ID is required."
            );
        }

        if (!blogId) {
            throw new ApiError(
                400, "Blog ID is required."
            );
        }

        const existingLike = await Like.findOne({ likedBy: id, post: blogId });

        if (!existingLike) {
            const newDislike = {
                likeType: false,
                likedBy: id,
                post: blogId
            }

            const createNewDislike = await Like.create( newDislike );

            if(!createNewDislike){
                throw new ApiError(
                    500,
                    "Couldnot dislike the post"
                )
            } else{
                return res
                    .status(201)
                    .json(new ApiResponse(
                        200,
                        true,
                        "Disliked!!!"
                    ))
            }
        } else {
            if (existingLike.likeType === false) {
                throw new ApiError(400, "Already disliked!!!");
            } else {
                existingLike.likeType = false;
                const updatedLike = await existingLike.save();

                if (updatedLike) {
                    return res
                        .status(200)
                        .json(new ApiResponse(
                            200,
                            "Dislike updated."
                        ));
                } else {
                    throw new ApiError(
                        500, "Failed to update like to dislike."
                    );
                }
            }
        }
    } catch (error) {
        console.log(`Error occurred: ${error}`);
        next(error);
    }
});

const countLikes = asyncHandler(async (req, res, next) => {
    const { blogId } = req.body;

    console.log("this is the blogid", blogId);

    try {
        if(!blogId){
            throw new ApiError(
                400,
                "Blog ID is required to find the number of likes."
            );
        }
    
        const likeCount = await Like.aggregate(
            [
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
            ]
        );
    
        return res
            .status(200)
            .json( new ApiResponse(
                200,
                likeCount.length > 0 ? likeCount[0].count : 0,
                "Number of liked retrieved."
            ) );
    } catch (error) {
        console.log(`Error occured. Error: ${error}`);
        next(error);
    }
});

export { likeBlog, dislikeBlog, countLikes };