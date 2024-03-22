import { Like } from "../models/likes.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

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

export { likeBlog, dislikeBlog };