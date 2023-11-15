import { useState,Fragment,useContext } from "react"
import axios from "./api/axios"
import AuthContext from "./context/AuthProvider"
import {LinkPage} from "./App"
export default function Login() {
  const {auth,setAuth}=useContext(AuthContext)
  const login_URL = `/login`
  const [user,setuser]=useState({username:"",password:""})
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post(login_URL,user)
      setAuth({username:user.username,role:data.role,accessToken:data?.accessToken})
    } catch (error) {
      console.log(error.message);
    }
  }
  const handleChange=(e)=>{
    const {name,value}=e.target
    setuser(pre=>({...pre,[name]:value}))
  }
    return (
      <Fragment>
          <form onSubmit={handleSubmit}>
          <input type="text" name="username" onChange={handleChange}/> <br />
          <input type="text" name="password" onChange={handleChange}/> <br />
          <input type="submit"/>
          </form>
      </Fragment>
    );
  }