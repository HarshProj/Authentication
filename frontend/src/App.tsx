
import Username from './Components/Username.jsx';
import Reset from './Components/Reset.js';
import Password from './Components/Password.js'
import Register from './Components/Register.js'
import Recovery from './Components/Recovery.js'
import Profile from './Components/Profile.js'
import Pagenotfound from './Components/Pagenotfound.js'
import{
BrowserRouter as Router,
Route,
Routes
} from 'react-router-dom'
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Username/>}/>
      
        <Route path='/register' element={<Register/>}/>
      
        <Route path='/password' element={<Password/>}/>
      
        <Route path='/profile' element={<Profile/>}/>
      
        <Route path='/recovery' element={<Recovery/>}/> 
      
        <Route path='/reset' element={<Reset/>}/> 
        <Route path='*' element={<Pagenotfound/>}/>
      </Routes>
    </Router>
     
    </>
  )
}

export default App
