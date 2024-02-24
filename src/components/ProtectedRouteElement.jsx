import { Navigate } from "react-router-dom";
import { useContext } from 'react';
import LoggedInStatusContext from '../contexts/LoggedInStatusContext';

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  
  const loggedIn = useContext(LoggedInStatusContext);

  return (
    loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
  )
};

export default ProtectedRouteElement;