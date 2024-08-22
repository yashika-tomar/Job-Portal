import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
            name: "auth",
            initialState: {
                        loading: false,
                        user:null
            },
            reducers: {// Redux uses reducers to update the state based on actions.
                        //actions
                        setLoading: (state, action) => {
                                    state.loading = action.payload;
                        },
                        setUser:(state, action) =>{
                                    state.user = action.payload;
                        }
            }
});         
export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;