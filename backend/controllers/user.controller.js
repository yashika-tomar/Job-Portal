import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";

// Register a new user
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role, firstNiche, secondNiche, thirdNiche } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        if (role === "Student" && (!firstNiche || !secondNiche || !thirdNiche)) {
            return res.status(400).json({
                message: "Please provide your preferred job niches.",
                success: false
            });
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            niches: {
                firstNiche,
                secondNiche,
                thirdNiche,
            },
            profile: {
                profilePhoto: cloudResponse.secure_url,
            },
            savedJobs: [] // Initialize with an empty array
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            niches: user.niches
        };

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

// Logout user
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, address, collegeName, branchName, gradYear, firstNiche, secondNiche, thirdNiche, skills } = req.body;

        const file = req.file;
        let cloudResponse;

        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // Updating user data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (address) user.profile.address = address;
        if (collegeName) user.profile.collegeName = collegeName;
        if (branchName) user.profile.branchName = branchName;
        if (gradYear) user.profile.gradYear = gradYear;
        if (skills) user.profile.skills = skillsArray;
        if (firstNiche) user.niches.firstNiche = firstNiche;
        if (secondNiche) user.niches.secondNiche = secondNiche;
        if (thirdNiche) user.niches.thirdNiche = thirdNiche;

        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            niches: user.niches
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

// Save job to user's saved jobs
export const saveJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.id; // middleware authentication

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ 
            message: 'User not found', 
            success: false 
        });

        if (!user.savedJobs.includes(jobId)) {
            user.savedJobs.push(jobId);
            await user.save().then(() => {
                return res.status(200).json({ message: 'Job saved successfully', success: true });
              });
            
        } else {
            return res.status(400).json({ 
                message: 'Job already saved', 
                success: false 
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: error.message, 
            success: false 
        });
    }
};

// Remove job from user's saved jobs
export const removeJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const userId = req.id; // middleware authentication

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found', success: false });

        user.savedJobs = user.savedJobs.filter(job => job.toString() !== jobId);
        await user.save();

        return res.status(200).json({ message: 'Job removed successfully', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, success: false });
    }
};
