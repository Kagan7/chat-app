import { Navigate, Outlet } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from "../config/firebase";

const AuthLayout = ()=>{

   const [user,isLoading]= useAuthState(auth)

   if(isLoading){return <p>Loading...</p>}

    if(user){
        return <Navigate to="/" replace />
    }

    return <Outlet/>;
}

export default AuthLayout