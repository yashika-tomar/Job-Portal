import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
            fullname: {
                        type: String,
                        required: true
            },
            email: {
                        type: String,
                        required: true,
                        unique: true
            },
            phoneNumber: {
                        type: Number,
                        required: true
            },
            
            password: {
                        type: String,
                        required: true
            },
            role: {
                        type: String,
                        enum: ["Student", "Recruiter"],
                        required: true
            },
            niches: {//zeeshuCode
                        firstNiche: { type: String },
                        secondNiche: { type: String },
                        thirdNiche: { type: String },
            },
            profile: {
                        bio: { type: String },
                        address: {
                                    type: String,
                                    
                        },
                        collegeName:{
                                    type: String,
                                   
                        },
                        branchName:{
                                    type: String,
                                   
                        },
                        gradYear:{
                                    type: Number,
                                   
                        },
                        skills: [{ type: String }],
                        resume: { type: String },//url to resume file
                        resumeOriginalName: { type: String },

                        company: {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: 'Company'
                        }, //generate a relationship between user and company schema, referencing from the company model/schema
                        profilePhoto: {
                                    type: String,
                                    default: "" //beacuse initially the user may not put a profile photo
                        }
            },
            savedJobs: [{ type: mongoose.Schema.Types.ObjectId, 
                        ref: 'Job' }
            ],
}, { timestamps: true });
export const User = mongoose.model('User', userSchema); //creates a Mongoose model named 'User' based on the userSchema. This model provides methods for interacting with the 'users' collection in your database