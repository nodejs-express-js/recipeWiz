import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import useChef from './hooks/useChef';
import Home from './components/Home';
import Signup from './components/Signup';
import Profile from './components/Profile';


function App() {
  const {state}=useChef();
  return (
    <div>
      <Routes> 
        <Route path="/login" element={state.token==='' ? <Login></Login> : <Navigate to="/"></Navigate> }></Route>
        <Route path="/signup" element={state.token==='' ? <Signup></Signup> : <Navigate to="/"></Navigate> }></Route>
        <Route path="/profile" element={state.token==='' ?  <Navigate to="/login"></Navigate> : <Profile></Profile> }></Route>
        <Route path="/" element={state.token==='' ? <Navigate to="/login"></Navigate> : <Home></Home>}></Route>

      </Routes>
    </div>
  )
}

export default App
