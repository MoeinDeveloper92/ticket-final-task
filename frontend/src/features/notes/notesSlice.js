import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import noteService from "./noteService"
import { get } from "mongoose"
const initialState = {
    notes: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}


//get all Notes
export const getNotes = createAsyncThunk("note/getAll", async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.getNotes(ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false
                state.notes = action.payload
                state.isSuccess = true
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})


export const { reset } = noteSlice.actions
export default noteSlice.reducer