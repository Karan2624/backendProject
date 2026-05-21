import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const publishVideo = asyncHandler(async(req,res) => {
    const {title,description} = req.body;
    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    if(!videoLocalPath){
        throw new ApiError(400,"Video is missing");
    }
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
    if(!thumbnailLocalPath){
        throw new ApiError(400,"thumbnail is missing");
    }
    const video = await uploadOnCloudinary(videoLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    if(!video) {
        throw new ApiError(400,"Error while uploading vedio on cloudinary");
    }
    if(!thumbnail){
        throw new ApiError(400,"Error while uploading thumbnail on cloudinary");
    }
   
    const publishedVideo = await Video.create({
        title : title,
        description : description,
        videoFile : video?.url,
        thumbnail : thumbnail?.url,
        owner : req.user?._id,
        duration : video.duration || 0
    });
    return res
    .status(201)
    .json(
        new ApiResponse(
            200,publishedVideo,"Video has been published successfully"
        )
    )
});

export {publishVideo};
