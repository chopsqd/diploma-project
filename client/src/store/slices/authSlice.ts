import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IUser} from "../../types/manager";
import jwtDecode from "jwt-decode";

interface IInitialState {
    user: IUser | null
}

const initialState: IInitialState = {
    user: null
}

if(localStorage.getItem('token')) {
    const decodedToken: IUser = jwtDecode(localStorage.getItem('token') as string)

    if(decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token')
    } else {
        initialState.user = decodedToken
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state: IInitialState, action: PayloadAction<IUser>): void => {
            localStorage.setItem('token', action.payload.token)
            state.user = action.payload
        },
        logout: (state: IInitialState): void => {
            localStorage.removeItem('token')
            state.user = null
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer