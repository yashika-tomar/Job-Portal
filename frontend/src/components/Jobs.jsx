import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Filter } from 'lucide-react'; // Import the Filter icon
import { motion } from 'framer-motion';

const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase());
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  useEffect(() => {
    // Hide filter on larger screens
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setShowFilter(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        {/* Toggle Button */}
        <div className='block sm:hidden mb-4'>
          <button 
            onClick={() => setShowFilter(!showFilter)} 
            className='flex items-center gap-2 px-4 py-2 rounded'>
            <Filter className='h-4 w-4' /> {/* Filter Icon */}
            {showFilter ? 'Hide Filter' : 'Show Filter'}
          </button>
        </div>

        <div className='flex gap-5'>
          {/* FilterCard */}
          <div className={`w-full sm:w-1/4 ${showFilter ? 'block' : 'hidden'} sm:block`}>
            <FilterCard />
          </div>

          {/* Job List */}
          <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {
                filterJobs.length <= 0 ? <span>Job not found</span> : (
                  filterJobs.map((job) => (
                    <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                  ))
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
