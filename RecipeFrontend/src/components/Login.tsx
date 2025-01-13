import { useState } from 'react';
import Styles from './Login.module.css'
import useLogin from '../hooks/useLogin';
import Navbar from './Navbar';
const Login = () => {
    const [formData,setFormData] =useState({
        username: '',
        password: ''
    });
    const {loginUser,error,loading}=useLogin();

    const setUserName = (value:string) => {
    setFormData({...formData,username:value})
    }
    const setPassword=(value:string)=>{
        setFormData({...formData,password:value})
    }


const login=async()=>{
    if(formData.username === '' || formData.password === ''){
        alert('Invalid credentials');
    }else{
        loginUser(formData.username, formData.password)
    } 
}

  return (
    <div >
        <Navbar></Navbar>
        <div className={Styles.minicontainer}>
        <h1>Login</h1>
        <div>
            <label htmlFor="Email">Email:</label>
            <input type="text" id="Email" name="Email" required value={formData.username} onChange={(e)=>{setUserName(e.target.value)}}/>
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required value={formData.password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <div>{error}</div>
        <button type="submit" onClick={login} disabled={loading}>sumbit</button>
        </div>
    
    </div>
  )
}

export default Login