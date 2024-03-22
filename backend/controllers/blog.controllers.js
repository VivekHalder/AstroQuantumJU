import { uploadToCloudinary } from "../services/cloudinary.services.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Blog } from './../models/blog.model.js';

const createPost = asyncHandler( async ( req, res, next ) => {
    try {

        console.log("clicked...")
        const { title, images, content } = req.body;

        // console.log( title );
        // console.log( content );
        // console.log( coverImg );

        
        //console.log("before post", req.file.path);

        const coverImgLocalPath = req.file.path;

        //console.log( "after post", coverImgLocalPath );

        const coverImg = await uploadToCloudinary( coverImgLocalPath );

        if( !coverImg ){
            throw new ApiError(
                500,
                "Could not upload to cloudinary."
            )
        }

        const owner = req.user._id;        
    
        const createdBlog = await Blog.create({
            title,
            images,
            content,
            coverImg: coverImg.url,
            owner
        });
    
        if( !createdBlog ){
            throw new ApiError(
                401,
                "Could not post the blog"
            );
        }
    
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                createdBlog,
                "Blog posted successfully."
            )
        );
    } catch (error) {
        console.error(` Error occured while posting the blog. Error: ${ error.message }. `);
        next(error);
    }
} );

const getAllPost = asyncHandler( async ( req, res, next ) => {
    const result = await Blog.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerInfo"
            },
        },
        {
            $unwind: "$ownerInfo"
        },
        {
            $project: {
                "id": "_id",
                "title": "$title",
                "coverImg": "$coverImg",
                "content": "$content",
                "owner": "$ownerInfo.name",
                "date": { 
                    $dateToString: {
                        format: "%Y-%m-%d", date: "$createdAt"
                    } 
                }, 
                "time": {
                    $dateToString: {
                        format: "%H:%M:%S", date: "$createdAt"
                    }
                }
            }
        }
    ]);

    //console.log( result );

    return res.
    status(200)
    .json(
        new ApiResponse(
            200,
            result,
            "All the blogs."
        )
    )
} );

export { createPost, getAllPost };