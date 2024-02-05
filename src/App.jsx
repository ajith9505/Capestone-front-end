import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Login from "./Components/Login"
import Register from "./Components/Register"
import Home from "./Components/Home"
import { UserProvider } from './Components/UserContext/UserContext'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {

  return (
    <UserProvider>
      <Router>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/home" Component={Home} />
        {/* <Navigate from='/' to='/register'/>  */}
      </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
