import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route,Navigate, useLocation, Link } from "react-router-dom";
import './app.css';
import Layout from "./Layout";
import NavigationBar from "./NavigationBar"
import Login from "./Login"
const role = { admin: "admin", user: "user",normal:"normal" };
const currentUser = role.normal;
export default function App() {
  return (
    <Fragment>
      <Router>
        <NavigationBar/>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/layout' element={<LinkPage/>}></Route>
          <Route  path='/' element={<Layout/>}>
            <Route path='delete' element={<UserPrivate ><Delpage/></UserPrivate>}></Route>
            <Route path='edit' element={<AdminPrivate ><EditPage/></AdminPrivate>}></Route>
            <Route path='admin' element={<AdminPrivate ><Admin/></AdminPrivate>}></Route>
          </Route>
          <Route path='*' element={<Missing/>}></Route>
        </Routes>
      </Router>
    </Fragment>
  );
}





export function LinkPage() {
  return (
  <div> 
      <ul>
        <li><Link to={"/login"}>Login</Link></li>
        <li><Link to={"/delete"}>Delete</Link></li>
        <li><Link to={"/edit"}>Edit</Link></li>
        <li><Link to={"/admin"}>Admin</Link></li>
      </ul>
  </div>);
}
function Delpage() {
  return <div className="">del</div>;
}
function EditPage() {
  return <div>edit</div>;
}
function Admin() {
  return <div>admin</div>;
}
function Missing() {
  return <div className="text-center h1">Page Not Found</div>;
}

///////////////
///////////////

function UserPrivate({ children }) {
  if (role.admin === currentUser || role.user === currentUser) {
    return <>{children}</>;
  } else {
    return <Fragment>you dont have permission to access this page</Fragment>;
  }
}
function AdminPrivate({ children }) {
  const location =useLocation()
  if (role.admin === currentUser) {
    return <>{children}</>;
  } else {
     return <Fragment>you dont have permission to access this page</Fragment>;
  }
}