import { Job } from "../models/job.model.js";
//Admin/Recruiter ke liye
export const postJob = async (req, res) => {
    try {
        const { title, bio, description, requirements, responsibilities, qualifications, jobNiche, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !bio ||  !description || !requirements || !responsibilities || !qualifications || !jobNiche || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            });
        };
        const job = await Job.create({
            title,
            bio,
            description,
            requirements,
            responsibilities,
            qualifications,
            jobNiche,
            salary,
            location,
            jobType,
            experienceLevel: Number(experience),
            position: Number(position),
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
//student ke liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";//to filter jobs based on keywords, to access the jobs use .query 
        const query = {
            $or: {//we used or because there will be multiple keywords
                title: { $regex: keyword, $options: "i" },
                description: { $regex: keyword, $options: "i" },//we use "i" to make the keyword case insensitive
            }
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });//we create the query above now we will use the query to find the jobs 
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
//Student ke liye
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"

        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        };
        return res.status(200).json({ job, success: true })
    } catch (error) {
        console.log(error);
    }
}
//Admin/recruiter kitne job create kiya hai abhi tak
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        };
        return res.status(200).json({ jobs, success: true })
    } catch (error) {
        console.log(error);

    }
}