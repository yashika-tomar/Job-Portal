import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage } from './ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSavedJob, removeSavedJob } from '@/redux/jobSlice';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { savedJobs } = useSelector(store => store.job);

  const [isSaved, setIsSaved] = useState(() => {
    return Array.isArray(savedJobs) && savedJobs.some(savedJob => savedJob._id === job._id);
  });

  useEffect(() => {
    if (Array.isArray(savedJobs)) {
      setIsSaved(savedJobs.some(savedJob => savedJob._id === job._id));
    }
  }, [savedJobs, job._id]);

  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return 0;
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch(removeSavedJob(job._id));
    } else {
      dispatch(addSavedJob(job));
    }
    setIsSaved(prevIsSaved => !prevIsSaved);
  };

  return (
    <div className='p-4 sm:p-5 rounded-md shadow-md bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>
        <p className='text-xs sm:text-sm text-gray-500'>
          {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button 
          variant='outline' 
          className={`rounded-full p-1 ${isSaved ? 'text-yellow-500' : 'text-gray-500'}`} 
          size='icon'
          onClick={handleSaveToggle}
        >
          <Bookmark />
        </Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button className='p-2 sm:p-4' variant='outline' size='icon'>
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='text-base sm:text-lg font-medium'>{job?.company?.name}</h1>
          <p className='text-xs sm:text-sm text-gray-500'>{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className='text-base sm:text-lg font-bold my-2'>{job?.title}</h1>
        <p className='text-xs sm:text-sm text-gray-600 line-clamp-3'>{job?.bio}</p>
      </div>
      <div className='flex flex-wrap items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-bold text-xs sm:text-sm' variant='ghost'>{job?.position} Position(s)</Badge>
        <Badge className='text-[#F83002] font-bold text-xs sm:text-sm' variant='ghost'>{job?.jobType}</Badge>
        <Badge className='text-[#7209b7] font-bold text-xs sm:text-sm' variant='ghost'>{job?.salary}</Badge>
      </div>
      <div className='flex flex-col sm:flex-row items-center gap-2 mt-4'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline' className='w-full sm:w-auto mb-2 sm:mb-0'>Details</Button>
        <Button className={`bg-[#7209b7] w-full sm:w-auto`}
        onClick={handleSaveToggle}
        >Save for later</Button>
      </div>
    </div>
  );
};

export default Job;
