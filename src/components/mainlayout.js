import { Navigate, Outlet } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from "../config/firebase";


const MainLayout = () => {


    const[user,isLoading] = useAuthState(auth);

    if(isLoading){return <p>Yükleniyor...</p>}


if(!user){
    return <Navigate to="/sign-in" replace/>
}

  return <Outlet/>;
};

export default MainLayout;
