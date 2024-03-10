import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { generateAccessAndRefreshTokens } from "./controllers_utils/generateAccessAndRefreshTokens.controllers.utils.js";
import validator from 'validator';

const registerUser = asyncHandler( async ( req, res, next ) => {
    //store the details 
    const { name, faculty, year, department, phone, email, password } = req.body;
    //console.log("Name : ", name);

    //validation
    if( [ name, faculty, year, department, phone, email, password ].some( (field) => field?.trim() === "" ) ){
        throw new ApiError(400, "All fields are mandatory");
    }

    //existing user check
    const existingUser = await User.findOne({
        $or: [{email}, {phone}]
    });

    if(existingUser){
        throw new ApiError(400, "User already exists");
    }

    //creating user
    const user = await User.create({
        name,
        faculty: faculty.toUpperCase(),
        year,
        department,
        phone,
        email: email.toLowerCase(),
        password
    });

    //getting the user from the database to send as a response.
    const createdUser = await User.findById( user?._id ).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user.");
    }

    console.log(createdUser);

    //returing response
    return res.
    status(200)
    .json(
        new ApiResponse(
            200,
            createdUser,
            "User created successfully."
        )
    )

} );

const loginUser = asyncHandler( async ( req, res, next ) => {
    console.log(req.body); 
    const { email, phone, password } = req.body;

    console.log(email, phone, password);
    if( !email && !phone ){
        throw new ApiError(400, "Either phone number or email is required.");
    }

    const user = await User.findOne({
        $or: [{email}, {phone}]
    })

    if(!user){
        throw new ApiError(404, "Invalid credentials.");
    }

    const isPasswordValid = await user.isPasswordCorrect( password );

    //console.log("Password is ", isPasswordValid);

    if(!isPasswordValid){
        throw new ApiError(401, "Wrong Password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens( user?._id );

    const loggedInUser = await User.findById( user?._id ).select( "-password -refreshToken" );

    if(!loggedInUser){
        throw new ApiError(500, "Couldnot login the user.");
    }
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    };

    //if( process.env.NODE_ENV === "production" ) options.secure = true;

    console.log("User logged in.");

    return res
    .status(200)
    .cookie( "accessToken", accessToken, options )
    .cookie( "refreshToken", refreshToken, options )
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged-in successfully."
        )
    )

} );

const logoutUser = asyncHandler( async ( req, res, next ) => {
    User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    }


    return res
    .status(200)
    .clearCookie( "accessToken", options )
    .clearCookie( "refreshToken", options )
    .json(
        new ApiResponse(
            200,
            {},
            "User successfully logged out"
        )
    );

} );

const getCurrentUser = asyncHandler( async ( req, res, next ) => {
    //console.log("reached3");
    const user = req.user;
    if(!user){
        throw new ApiError( 401, "No user exists" );
    }

    console.log(user);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Current User fetched successfully."
        )
    )
} );

const authenticateUser = asyncHandler( async( req, res, next ) => {
    try {
        //console.log("Entering authenticateUser function");
        const loggedInUser = req.user;
        //console.log("Entering authenticateUser function...2");
        const { password } = req.body;
        //console.log( password );
        

        //console.log("Entering authenticateUser function...3");
        const user = await User.findById( loggedInUser._id );
        

        //console.log("Entering authenticateUser function...4");
        if( !user ){
            throw new ApiError(
                404,
                "Couldnot find the user."
            )
        }
        

        //console.log("Entering authenticateUser function...5");
        const isPasswordCorrect = await user.isPasswordCorrect( password );
        
        //console.log("Entering authenticateUser function...6");
        if( !isPasswordCorrect ){
            throw new ApiError( 
                409,
                "Incorrect password entered."
            )
        }
    
        //console.log("Exiting authenticateUser function");

        return res
        .status( 200 )
        .json(
            new ApiResponse(
                200,
                true,
                "Password was correct."
            )
        )
    } catch (error) {
        console.log(`Error occured while authenticating the user. Error: ${ error.message }` );
    }
} );

const updateDetails = asyncHandler( async( req, res, next ) => {
    try {
        const loggedInUser = req.user;
    
        const user = await User.findById( loggedInUser._id );
    
        const { name, email, phone, emailChange, phoneChange } = req.body;
    
        const nameRegex = /^([A-Za-z]+(?:\s[A-Za-z]+)*)$/;

        if( !nameRegex.test(name) ){
            console.log(name);
            throw new ApiError( 
                422,
                "Name should only contain characters between A-Z and a-z. And spaces between names." 
            )
        }
    
        if( emailChange && !validator.isEmail( email ) ){
            throw new ApiError(
                422,
                "Invalid email."
            )
        }
    
        const phoneNumberRegex = /^\d{10}$/;
    
        if( phoneChange && !phoneNumberRegex.test( phone ) ){
            throw new ApiError(
                422,
                "Invalid phone number format."
            )
        }
    
        if( emailChange ){
            const existingUserByEmail = await User.findOne(
                {
                    $or: [ {email} ]
                }
            ) 
        
            if( existingUserByEmail ){
                throw new ApiError(
                    409,
                    "User with the email already exists."
                )
            }
        }

        if( phoneChange ){
            const existingUserByPhone = await User.findOne(
                {
                    $or: [ {phone} ]
                }
            ) 
        
            if( existingUserByPhone ){
                throw new ApiError(
                    409,
                    "User with the phone number already exists."
                )
            }
        }
    
        let flag = false;
    
        if( name !== user.name ){
            flag = true;
            user.name = name;
        }
    
        if( email !== user.email ){
            flag = true;
            user.email = email;
        }
    
        if( phone !== user.phone ){
            flag = true;
            user.phone = phone;
        }
        
        if( flag ) user.save( { validateBeforeSave: false } );
    
        const updatedUser = await User.findById( user._id ).select( "-password -refreshToken" );
    
        return res.
        status(200)
        .json(
            new ApiResponse(
                200,
                updatedUser,
                "User details updates successfully."
            )
        );
    } catch (error) {
        console.log(`Error occured while updating the details. Error ${ error.message }`);
    }
} );

const getNormalUsers = asyncHandler( async( req, res, next ) => {
    try {
        const users = await User.aggregate([
            {
              $match: {
                role: "user"
              }
            }
        ]);

        if(!users){
            throw new ApiError(
                404,
                "Error occured in fetching the users."
            );
        }
    
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                users,
                "All users fetched."
            )
        );
    } catch (error) {
        console.log(`Error occured while fetching the users. Error: ${error.message}.`);
    }
} );

const getAdmins = asyncHandler( async( req, res, next ) => {
    try {
        const admins = await User.aggregate([
            {
              $match: {
                role: "admin"
              }
            }
        ]);

        if(!admins){
            throw new ApiError(
                404,
                "Error occured in fetching the admins."
            );
        }
    
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                admins,
                "All admins fetched."
            )
        );
    } catch (error) {
        console.log(`Error occured while fetching the admins. Error: ${error.message}.`);
    }
} );

const makeAdmin = asyncHandler( async(req, res, next) => {
    const { userId } = req.body;
    const presentAdmin = req.user;
    try {

            if(presentAdmin.role === "user"){
                throw new ApiError(
                    403,
                    "The user is not Authorized to Grant adminship to someone."
                )
            }
            const user = await User.findById( userId );
    
            if(!user){
                throw ApiError(
                    404,
                    "User not found!!!"
                )
            }
    
            if(user.role === "admin"){
                throw ApiError(
                    400,
                    "User is already an admin."
                );
            }
    
            user.role = "admin";
            user.save({validateBeforeSave: false});
    
            const updatedUser = await User.findById(userId).select("-refreshToken -password");

            console.log(updatedUser);
    
            return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    updatedUser,
                    "User successfully promoted to admin."
                )
            );
    } catch (error) {
        console.log(`Error occured while promoting an user to admin. Error: ${error.message}.`);
    }

} );

export { registerUser, loginUser, logoutUser, getCurrentUser, authenticateUser, updateDetails, getNormalUsers, getAdmins, makeAdmin };