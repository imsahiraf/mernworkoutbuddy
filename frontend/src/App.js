import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
// import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import EmailVerify from './components/EmailVerify'
import Home from './pages/Home'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  const { user } = useSelector((state) => state.authReducer)
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route
              path="/verify/:token"
              element={<EmailVerify />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;