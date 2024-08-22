import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
     
            const navigate = useNavigate();
            const [companyName, setCompanyName] = useState();
            const dispatch = useDispatch();
            const registerNewCompany = async() =>{
                        try {
                               const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                                    headers:{
                                                "Content-Type":'application/json'
                                    },
                                    withCredentials:true
                               }); 
                               if(res?.data?.success){
                                    dispatch(setSingleCompany(res.data.company));
                                    toast.success(res.data.message);
                                    const companyId= res?.data?.company?._id;
                                    navigate(`/admin/companies/${companyId}`)
                               }    
                        } catch (error) {
                                    console.log(error);
                                    
                        }
            }
  return (
    <div>
            <Navbar/>
            <div className='max-w-4xl mx-auto'>
                        <div className='my-10'>       
                        <h1 className='font-bold text-2xl'>Your Company Name</h1>
                        <p className='text-gray-500'>What would you like to give your company name? You can change this later.</p>
                        </div>

                        <Label>Company Name</Label>
                        <Input
                        type="text"
                        className="my-2"
                        placeholder="JobHunt, Microsoft etc"
                        onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <div className='flec items-center gap-2 my-10'>
                                    <Button variant="outline" onClick={() =>navigate("/admin/companies")}>Cancel</Button>
                                    <Button onClick={registerNewCompany}>Contine</Button>

                        </div>
            </div>
    </div>
  )
}

export default CompanyCreate