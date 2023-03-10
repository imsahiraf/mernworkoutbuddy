import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useSelector, useDispatch } from 'react-redux'
import WorkOut from './WorkOut'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useSelector((state) => state.authReducer)

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1><WorkOut/></h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar