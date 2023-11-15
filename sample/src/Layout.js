import React,{useContext} from "react";
import { Navigate, Outlet ,useLocation} from "react-router-dom";
import AuthContext from "./context/AuthProvider"
export default function Layout() { 
  const location = useLocation()
  const {auth}=useContext(AuthContext)
  return (auth?.accessToken? <Outlet/>:<Navigate to={`/login`} state={{from:location}} replace/>)
}
///////////////
///////////////

