
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
      </Routes>
      <Routes>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Routes>
        <Route path='/password' element={<Password/>}/>
      </Routes>
      <Routes>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      <Routes>
        <Route path='/recovery' element={<Recovery/>}/> 
      </Routes>
      <Routes>
        <Route path='/reset' element={<Reset/>}/> 
      </Routes>
      <Routes>
        <Route path='*' element={<Pagenotfound/>}/>
      </Routes>
    </Router>
     
    </>
  )
}

export default App
