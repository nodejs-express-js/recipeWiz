import { useNavigate } from "react-router-dom";
import useChef from "../hooks/useChef"
import Styles from './Navbar.module.css'
const Navbar = () => {
    const {state,dispatch}=useChef();
    const navigate=useNavigate();
  return (
    <div className={Styles.container}>
        <div className={Styles.home} onClick={()=>{navigate("/")}}>ChefShare</div>
        {
            state.email==='' ? 
            <div>
                <div onClick={()=>{navigate("/signup")}} className={Styles.signup}>signup</div>
                <div onClick={()=>{navigate("/login")}} className={Styles.login}>login</div>
            </div>
            : 
            <div className={Styles.loggedinContainer}>
                <img src={state.profilepic} alt="profile pic" className={Styles.profilePic}/>
                <div>
                <div onClick={()=>{navigate("/profile")}} className={Styles.profile}>
                    Welcome {state.email}
                </div>
                <div>
                    <button onClick={()=>dispatch({type: 'LOGOUT',payload:{email:'',token:'',profilepic:''}})}>Logout</button>
                </div>
                </div>
                
            </div>
        }
    </div>
  )
}

export default Navbar