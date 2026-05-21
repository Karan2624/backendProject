import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema({
    content : {
        type : String,
        requried: true,
    },
    vedio : {
        type : Schema.Types.ObjectId,
        ref : "Video"
    },
    Owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }

    
},{
    timeseries: true
});
commentSchema.plugin(mongooseAggregatePaginate)
export const Comment = mongoose.model("Comment",commentSchema);