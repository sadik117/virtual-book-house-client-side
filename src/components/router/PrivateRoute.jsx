import React, { use } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import { Navigate } from 'react-router';
import Loading from '../../components/Pages/Loading';
import { useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext);
    const location = useLocation();  

    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
         return children;
    }
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>
   
};

export default PrivateRoute;