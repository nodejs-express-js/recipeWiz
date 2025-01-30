import { useNavigate } from "react-router-dom";
import useChef from "../hooks/useChef"
import Styles from './Navbar.module.css'
import logo from '../recipe-logo.jpeg'
const Navbar = () => {
    const {state,dispatch}=useChef();
    const navigate=useNavigate();
  return (
    <div className={Styles.container}>
  <div className={Styles.home} onClick={() => navigate("/")}>
    <img src={logo} alt="logo" className={Styles.homeImage} />
    ChefShare
  </div>
  {state.email === "" ? (
    <div className={Styles.authContainer}>
      <div onClick={() => navigate("/signup")} className={Styles.signup}>Signup</div>
      <div onClick={() => navigate("/login")} className={Styles.login}>Login</div>
    </div>
  ) : (
    <div className={Styles.loggedinContainer}>
      <img
        src={state.profilepic}
        alt="profile pic"
        className={Styles.profilePic}
        onClick={() => navigate("/profile")}
      />
      <div className={Styles.profileDetails}>
        <div className={Styles.profile}>Welcome {state.email}</div>
        <div>
          <button 
            onClick={() => dispatch({ type: "LOGOUT", payload: { email: "", token: "", profilepic: "" } })}
            className={Styles.logoutButton}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  )
}

export default Navbar