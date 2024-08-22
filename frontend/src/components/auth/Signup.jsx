import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({//This line uses the useState hook from React to create two variables:
    fullname: "",//input: This is an object that holds the current state of your form data. Initially, it's set to an empty object with properties given
    email: "",//These properties will store the user's input as they fill out the form.
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
    firstNiche: "",
    secondNiche: "",
    thirdNiche: ""
    
  });
  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {//This function defines a generic event handler named changeEventHandler that will handle input changes for all the form fields. It takes an event object (e) as a parameter.
    setInput({ ...input, [e.target.name]: e.target.value });//setInput: This is a function that allows you to update the input state object.
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.role == 'Student') {
      
      formData.append("firstNiche", input.firstNiche);
      formData.append("secondNiche", input.secondNiche);
      formData.append("thirdNiche", input.thirdNiche);
    }
    if (input.file) {
      formData.append("file", input.file);
    }
    //api calling
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          'Content-Type': "multipart/form-data"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally {
      dispatch(setLoading(false));
    }
  }
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className="w-1/2 border border-grey-200 rounded-md p-4 my-10">
          <h1 className='font-bold text-xl mb-5'>Sign up</h1>
          <div className='my-2'>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder='yashika'
            />
          </div>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder='yashika@gmail.com'
            />
          </div>
          <div className='my-2'>
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder='91*****'
            />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder='unique@123'
            />
          </div>
          <div className='my-2'>
            <Label>First Niche</Label>
            <Input
              type="text"
              value={input.firstNiche}
              name="firstNiche"
              onChange={changeEventHandler}
              placeholder='Front End Developer'
            />
          </div>
          <div className='my-2'>
            <Label>Second Niche</Label>
            <Input
              type="text"
              value={input.secondNiche}
              name="secondNiche"
              onChange={changeEventHandler}
              placeholder='Backend Developer'
            />
          </div>
          <div className='my-2'>
            <Label>Third Niche</Label>
            <Input
              type="text"
              value={input.thirdNiche}
              name="thirdNiche"
              onChange={changeEventHandler}
              placeholder='Data Analyst'
            />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role == 'Student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role == 'Recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className='w-full my-4'>Signup</Button>
          }
          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
      </div>
    </div>

  )
}

export default Signup