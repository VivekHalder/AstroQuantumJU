import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler( async ( req, res, next ) => {
    try {
        console.log("THIS IS REQUEST COOKIES", req.cookies);
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        console.log(token);
        

        if(!token){
            throw new ApiError(401, "Unauthorized Request");
        }
        
        const decodedToken = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET );
        //console.log(decodedToken);

        const user = await User.findById( decodedToken?._id ).select( "-password -refreshToken" );
    
        if(!user){
            throw new ApiError( 401, "Invalid Access Token" );
        }
    
        req.user = user;
        //console.log("reached1");
        next();
        //console.log("reached2");
    } catch (error) {
        throw new ApiError( 400, error?.message || "Invalid Request." );
    }
} );