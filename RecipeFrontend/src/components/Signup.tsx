import Navbar from "./Navbar"


type UserProfile = {
    firstName: string;
    lastName: string;
    email: string;
    password: string; // Consider using a more secure approach for passwords
    profilepic: File; // URL to the user's profile picture
  };
  

const Signup = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div>
            
        </div>
    </div>
  )
}

export default Signup