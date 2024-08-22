import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        savedJobs: [],
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        addSavedJob: (state, action) => {
            const job = action.payload;
          
            // Ensure savedJobs is an array
            if (!Array.isArray(state.savedJobs)) {
              state.savedJobs = [];
            }
          
            // Check if the job is already saved
            const isAlreadySaved = state.savedJobs.some(savedJob => savedJob._id === job._id);
          
            // Add the job if it's not already saved
            if (!isAlreadySaved) {
              state.savedJobs.push(job);
            }
          },
          removeSavedJob: (state, action) => {
            state.savedJobs = state.savedJobs.filter(job => job._id !== action.payload);
          },
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    addSavedJob,
    removeSavedJob,
} = jobSlice.actions;

export default jobSlice.reducer;
