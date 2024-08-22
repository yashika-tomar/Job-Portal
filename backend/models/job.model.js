import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
            title: {
                        type: String,
                        required: true
            },
            bio:{
                        type: String,
                        required:true
            },
            description: {
                        type: String,
                        required: true
            },
            requirements: {
                        type: String,
                        required:true
            },
            responsibilities: {//zeeshuCode
                        type: String,
                        required: true,
            },
            qualifications: {//zeeshuCode
                        type: String,
                        required: true,
            },
            jobNiche: {//zeeshuCode
                        type: String,
                        required: true,
            },
            newsLettersSent: {//zeeshuCode
                        type: Boolean,
                        default: false,
                      },
            salary: {
                        type: String,
                        required: true
            },
            experienceLevel: {
                        type: String,
                        required: true,
            },
            location: {
                        type: String,
                        required: true
            },
            jobType: {
                        type: String,
                        required: true
            },
            position: {
                        type: Number,
                        required: true
            },
            company: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Company',
                        required: true
            },
            created_by: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                        required: true
            },
            applications: [
                        {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: 'Application',
                        }
            ]
}, { timestamps: true });
export const Job = mongoose.model("Job", jobSchema);