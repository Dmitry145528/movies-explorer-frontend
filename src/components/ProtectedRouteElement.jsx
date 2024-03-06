import { Navigate } from "react-router-dom";
import { useContext } from 'react';
import LoggedInStatusContext from '../contexts/LoggedInStatusContext';
import { ENDPOINT_SIGNIN } from '../utils/constans';

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  
  const loggedIn = useContext(LoggedInStatusContext);

  return (
    loggedIn ? <Component {...props} /> : <Navigate to={ENDPOINT_SIGNIN} replace />
  )
};

export default ProtectedRouteElement;