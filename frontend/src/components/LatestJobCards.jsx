import { Badge } from './ui/badge';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(`/description/${job._id}`)} 
      className='p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transition-transform transform hover:scale-105'>
      <div className='mb-2'>
        <h1 className='font-medium text-base sm:text-lg'>{job?.company?.name}</h1>
        <p className='text-xs sm:text-sm text-gray-500'>{job?.location}</p>
      </div>
      <div className='mb-4'>
        <h1 className='font-bold text-base sm:text-lg my-2'>{job?.title}</h1>
        <p className='text-xs sm:text-sm text-gray-600'>{job?.bio}</p>
      </div>
      <div className='flex flex-wrap items-center gap-2 mt-2 sm:mt-4'>
        <Badge className='text-blue-700 font-bold text-xs sm:text-sm' variant='ghost'>{job?.position} positions</Badge>
        <Badge className='text-[#F83002] font-bold text-xs sm:text-sm' variant='ghost'>{job?.jobType}</Badge>
        <Badge className='text-[#7209b7] font-bold text-xs sm:text-sm' variant='ghost'>{job?.salary}</Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
