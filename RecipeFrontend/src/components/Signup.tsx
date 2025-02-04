import useSignUp from "../hooks/useSignUp";
import Navbar from "./Navbar"
import { ChangeEvent, useState } from "react";
import Styles from './SignUp.module.css'
type UserProfile = {
    firstName: string;
    lastName: string;
    email: string;
    password: string; // Consider using a more secure approach for passwords
    confirmpassword:string;
    profilepic: File | null; // Updated to allow null
  };
  

const Signup = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    profilepic: null,
  });
  const {loading,error,sendSignUpInfoToServer}=useSignUp();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserProfile({ ...userProfile, profilepic: e.target.files[0] });
    }
  };
  const signup=async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
    if(userProfile.confirmpassword!==userProfile.password){
      alert("Passwords do not match");
      return;
    }
    console.log(userProfile)
    if(userProfile.profilepic===null){
      alert("Please select a profile picture");
      return;
    }
    sendSignUpInfoToServer(userProfile.firstName,userProfile.lastName,userProfile.email,userProfile.password,userProfile.profilepic)
  }
  return (
    <div className={Styles.container}>
    <Navbar></Navbar>
    <form className={Styles.formContainer}>
        <h1 className={Styles.signupTitle}>Signup</h1>
        <div className={Styles.inputContainer}>
            <label className={Styles.label}>FirstName</label>
            <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                required 
                value={userProfile.firstName} 
                onChange={(e) => { setUserProfile({ ...userProfile, firstName: e.target.value }) }} 
                className={Styles.inputField}
            />
        </div>
        <div className={Styles.inputContainer}>
            <label className={Styles.label}>LastName</label>
            <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                required 
                value={userProfile.lastName} 
                onChange={(e) => { setUserProfile({ ...userProfile, lastName: e.target.value }) }} 
                className={Styles.inputField}
            />
        </div>
        <div className={Styles.inputContainer}>
            <label className={Styles.label}>Email</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                value={userProfile.email} 
                onChange={(e) => { setUserProfile({ ...userProfile, email: e.target.value }) }} 
                className={Styles.inputField}
            />
        </div>
        <div className={Styles.inputContainer}>
            <label className={Styles.label}>Password</label>
            <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                value={userProfile.password} 
                onChange={(e) => { setUserProfile({ ...userProfile, password: e.target.value }) }} 
                className={Styles.inputField}
            />
        </div>
        <div className={Styles.inputContainer}>
            <label className={Styles.label}>Confirm Password</label>
            <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                required 
                value={userProfile.confirmpassword} 
                onChange={(e) => { setUserProfile({ ...userProfile, confirmpassword: e.target.value }) }} 
                className={Styles.inputField}
            />
        </div>
        <div className={Styles.inputContainer}>
            <label className={Styles.label}>Profile Pic</label>
            <input 
                type="file" 
                id="profilePic" 
                name="profilePic" 
                accept="image/*" 
                required 
                onChange={handleFileChange} 
                className={Styles.fileInput}
            />
        </div>
        <div className={Styles.errorMessage}>{error}</div>
        <button 
            type="submit" 
            onClick={(e) => signup(e)} 
            disabled={loading} 
            className={Styles.submitButton}
        >
            Signup
        </button>
    </form>
</div>

  )
}

export default Signup