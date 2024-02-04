import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./Components/Login"
import Register from "./Components/Register"
import Home from "./Components/Home"
import { UserProvider } from './Components/UserContext/UserContext'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {

  return (
    <UserProvider>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/Home" Component={Home} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        {/* <Navigate from='/' to='/register'/>  */}
      </Routes>
    </UserProvider>
  )
}

export default App
