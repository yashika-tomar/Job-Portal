import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
//From the Students perspective
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false
            })
        };
        //check if the user has already applied for this job
        //findOne() returns a single document that matches the specified filter.
        //findOne() is often used for retrieving a single document by its ID, or for checking if a document exists in the collection.
        const existApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existApplication) {
            return res.status(400).json({
                message: "You have already applied to this job",
                success: false
            });
        }

        //check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: "This job does not exist",
                success: false
            })
        }
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(newApplication._id);//in the job schema there is an application array in which we will save this newApplication id
        await job.save();
        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
};
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;//in application schema there is job and applicant
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({//find() returns an array of documents that match the specified filter.
            path: 'job',//populate the job in the application schema
            options: { sort: { createdAt: -1 } },
            populate: {//The populate method is used to fetch the associated job and company documents
                path: 'company',//when we populate the job schema
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!application) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        };
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
//from the Recruiter's perspective
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({//is jobId se kitne students ne apply kiya hai
            path: 'applications',//applications ki madad se isse populate karungi
            options: { sort: { createdAt: -1 } },
            populate: {//application ke andar applicant bhi tha to usse bhi populate karenge
                path: 'applicant'
            }
        });
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            })
        };
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            res.status(400).json({
                message: "Status id required",
                success: false
            })
        };
        //find the application by applicantId
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(400).json({
                message: "Application not found",
                success: false
            })
        };
        //update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated Successfully",
            success: true
        })

    } catch (error) {

    }
}