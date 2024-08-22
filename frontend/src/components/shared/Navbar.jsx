import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from '../ui/button';
import { LogOut, User2, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import axios from 'axios';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const menuItems = user && user.role === "Recruiter" ? (
        <>
            <li><Link to='/admin/companies'>Companies</Link></li>
            <li><Link to='/admin/jobs'>Jobs</Link></li>
        </>
    ) : (
        <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/jobs'>Jobs</Link></li>
            <li><Link to='/browse'>Browse</Link></li>
        </>
    );

    return (
        <div className='bg-white px-6 py-4'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Hunt</span></h1>
                </div>
                <div className='flex items-center gap-6'>
                    {/* Hamburger Icon */}
                    <div className="sm:hidden">
                        <Menu className="h-6 w-6 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} />
                    </div>

                    {/* Menu Items */}
                    <div className='hidden sm:flex'>
                        <ul className='flex font-medium items-center gap-5'>
                            {menuItems}
                        </ul>
                    </div>

                    {/* Conditional Buttons */}
                    {user ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto || 'default-avatar-icon.jpg'} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto || 'default-avatar-icon.jpg'} />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.role}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-3 my-2 text-grey-600'>
                                        {user && user.role === 'Student' && (
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
                                            </div>
                                        )}
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <div className="hidden sm:flex items-center gap-2">
                            <Link to="/login"><Button variant="outline">Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Only Menu */}
            <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                <ul className="flex flex-col items-center gap-2 mt-4">
                    {menuItems}
                    {user ? (
                        <Button onClick={logoutHandler} variant="link" className="w-full">Logout</Button>
                    ) : (
                        <>
                            <Link to="/login"><Button variant="outline" className="w-full">Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">Signup</Button></Link>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
