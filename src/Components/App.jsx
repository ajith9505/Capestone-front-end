import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import Home from "./Home"
import { UserProvider } from './UserContext/UserContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import { jwtDecode } from "jwt-decode"


function App() {

  const token = localStorage.getItem("userToken");
  const decoded = token ? jwtDecode(token) : {};
  const name = decoded.user.name;

  return (
    <UserProvider>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/Home" Component={Home} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        {/* <Navigate from='/' to='/register'/>  */}
      </Routes>
    </UserProvider>
  )
}

export default App
