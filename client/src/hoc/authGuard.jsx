import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom";

import { isAuth } from '../store/actions/users';


const AuthGuard = ({ children }) => {
  const users = useSelector(state => state.users);
  const location = useLocation();

  if (!users.auth) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return children;
}

export default AuthGuard;