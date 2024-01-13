import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user : {
        name: "",
        faculty: "",
        year: 0,
        department: "",
        phone: "",
        email: "",
    }
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: ( state, action ) => {
            state.user = {...action.payload};
        }
    }
});

// console.log( userSlice.reducer );
// console.log( userSlice.actions );

export const { addUser } = userSlice.actions;
export default userSlice.reducer;