import { useState } from 'react';
import Styles from './Login.module.css'
const Login = () => {

    const [formData,setFormData] =useState({
        username: '',
        password: ''
    });
    const setUserName = (value:string) => {
    setFormData({...formData,username:value})
    }
    const setPassword=(value:string)=>{
        setFormData({...formData,password:value})
    }


const login=()=>{
    if(formData.username === '' || formData.password === ''){
        alert('Invalid credentials');
    }else{
       console.log(formData);
    } 
}

  return (
    <div className={Styles.container}>
    <h1>Login</h1>
        <div>
            <label htmlFor="Email">Email:</label>
            <input type="text" id="Email" name="Email" required value={formData.username} onChange={(e)=>{setUserName(e.target.value)}}/>
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required value={formData.password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <button type="submit" onClick={login}>sumbit</button>
    </div>
  )
}

export default Login