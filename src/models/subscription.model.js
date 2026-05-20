import mongoose,{Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber : { // the one who subscribes
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    channel : {
        type : Schema.Types.ObjectId, // one to whom we have to subscribe
        ref  : "User",
    }


},{timestamps : true});


export const Subscription = mongoose.model("Subscription",subscriptionSchema);

