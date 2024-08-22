import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./Routes/user.route.js";
import companyRoute from "./Routes/company.route.js";
import jobRoute from "./Routes/job.route.js";
import applicationRoute from "./Routes/application.route.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";
dotenv.config({});

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
            origin: 'https://job-hunt-portal.vercel.app',
            credentials: true
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

//apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application",applicationRoute);

//http://localhost:8000/api/v1/user/register
//http://localhost:8000/api/v1/user/login
//http://localhost:8000/api/v1/user/profile/update


app.listen(PORT, () => {
            connectDB();
            newsLetterCron()//zeeshuCode
            console.log(`Server Running at port ${PORT}`);
})
