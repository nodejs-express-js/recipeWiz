import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'


function App() {
  return (
    <div>
      <Routes> 
          <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </div>
      
  )
}

export default App
