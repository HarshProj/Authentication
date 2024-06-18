
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
import { Authorization, Protect } from './Middleware/Authorization.js';
function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path='/' element={<Username/>}/>
      
        <Route path='/register' element={<Register/>}/>
      
        <Route path='/password' element={<Protect><Password/></Protect>}/>
      

        <Route path='/profile' element={<Authorization><Profile/>
  
  </Authorization>}/>
      
        <Route path='/recovery' element={<Protect><Recovery/></Protect>}/> 
      
        <Route path='/reset' element={<Reset/>}/> 
        <Route path='*' element={<Pagenotfound/>}/>
      </Routes>
    </Router>
     
    </>
  )
}

export default App
