import cron from 'node-cron';
import { Job } from '../models/job.model.js';
import { User } from '../models/user.model.js';
import { sendEmail } from '../utils/sendEmail.js';

export const newsLetterCron = () => {
    cron.schedule("*/1 * * * *", async () => {
        console.log("Running Cron Automation");

        const jobs = await Job.find({ newsLettersSent: false }).populate('company', 'name');
        
        for (const job of jobs) {
            try {
                const filteredUsers = await User.find({
                        role: 'Student',
                    $or: [
                        { "niches.firstNiche": job.jobNiche },
                        { "niches.secondNiche": job.jobNiche },
                        { "niches.thirdNiche": job.jobNiche },
                    ],
                });

                for (const user of filteredUsers) {
                    const subject = `Hot Job Alert: ${job.title} in ${job.company.name} Available Now`;
                    const message = `Hi ${user.fullname},\n\nGreat News! A new job that fits your niche has just been posted. The position is for a ${job.title} with ${job.company.name}, and they are looking to hire immediately.\n\nJob Details:\n- **Position:** ${job.title}\n- **Company:** ${job.company.name}\n- **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\nDon’t wait too long! Job openings like these are filled quickly. \n\nWe’re here to support you in your job search. Best of luck!\n\nBest Regards,\nJobHunt Team`;

                    
                   
                    sendEmail({
                        email: user.email,
                        subject,
                        message
                    });
                }

                job.newsLettersSent = true;
                await job.save();

            } catch (error) {
                console.log("Error in nodecron catch block");
                console.error(error || "Some error in cron");
            }
        }
    });
};
