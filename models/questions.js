import mongoose from "mongoose";
import User from "./user.js";

const questionSchema = mongoose.Schema({
    tags: [
        String
    ],
    title: String,
    content: String,
    ownerOfQuestion: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    owner: {
        account_id: Number,
        user_id: Number,
        user_type: String,
        profile_image: String,
        display_name: String,
    },
    is_answered: Boolean,
    view_count: Number,
    answer_count: Number,
    score: Number,
    last_activity_date: Number,
    creation_date: Number,
    last_edit_date: Number,
    question_id: Number,
    content_license: String,
    link: String,


})

const Question = mongoose.model("Question", questionSchema);

export default Question;
