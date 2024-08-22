import {Company} from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from '../utils/cloudinary.js';
export const registerCompany = async(req, res)=>{
            try {
                  const {companyName} = req.body;
                  if (!companyName) {//check if there is a company name or not
                  return res.status(400).json({
                        message:"comapany name is required",
                        success:false
                  });
            }
                  let company = await Company.findOne({name:companyName}); //check if this company is already registered  
                  if(company){
                        return res.status(400).json({
                                    message:"You cannot register same company",
                                    success:false
                        })
                  };
                  company = await Company.create({//if not then register the company
                        name: companyName,
                        userId: req.id
                    });
            
                    return res.status(201).json({
                        message: "Company registered successfully.",
                        company,//return company as well
                        success: true
                    })
            } catch (error) {
                console.log(error);        
            }
}
export const getCompany = async (req, res)=>{
            try {
                const userId = req.id;//logged in userid
                const companies = await Company.find({userId});
                if(!companies){
                        return res.status(404).json({
                                    message:"Companies not found",
                                    success:false
                        })
                }   
                return res.status(200).json({
                        companies,
                        success:true
                })     
            } catch (error) {
                 console.log(error);       
            }
}
//get company by id
export const getCompanyById = async(req, res)=>{
            try {
                      const companyId = req.params.id;
                      const company = await Company.findById(companyId);
                      if(!company){
                        return res.status(404).json({
                                    message:"Company not found",
                                    success:false
                        })
                      }
                      return res.status(200).json({
                        company,
                        success:true
                      })

            } catch (error) {
                console.log(error);        
            }
}
export const updateCompany = async(req, res)=>{
            try {
                      const {name, description, website, location}= req.body;
                
                      const file = req.file;
                      const fileUri = getDataUri(file);
                      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                      const logo = cloudResponse.secure_url;

                      //cloudinary aayega idhar

                      const updateData = {name, description, website, location, logo};

                      const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});

                      if(!company){
                        return res.status(404).json({
                                    message:"Company not found",
                                    success:false
                        })
                      }
                      return res.status(200).json({
                        message:"Company information updated",
                        success:true
                      })

            } catch (error) {
                console.log(error);        
            }
}