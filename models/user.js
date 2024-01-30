import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    creation_date: Date,
    user_type: String,
    user_id: String,
    profile_image: String,
    display_name: String,
    email: String,
    password: String

})

const User = mongoose.model("User", userSchema);

export default User;
