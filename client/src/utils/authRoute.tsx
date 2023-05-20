import React, {ReactElement} from 'react';
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../hooks/useRedux";

function AuthRoute({ children }: {children: ReactElement }) {
    const user = useAppSelector(state=> state.auth.user)
    return user ? children : <Navigate to="/" />
}

export default AuthRoute