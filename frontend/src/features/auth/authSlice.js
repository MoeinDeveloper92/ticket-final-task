import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

//Get user from localstorage
const user = JSON.parse(localStorage.getItem("user"))
//shape and mold state in any way that we want...
const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}

//Register New User
export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await authService.registerUser(userData)
    } catch (error) {
        //we get the message from the backend
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//Login New User
export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        return authService.loginUser(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    return await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            //when we logout , we not only delete it from localstorage, we laso delte it from state
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer