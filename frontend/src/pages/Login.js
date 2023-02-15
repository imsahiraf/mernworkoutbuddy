import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading, handleCaptcha} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
    
  }
  
  // const handleCaptcha = () => {
  //   setIsLoading(false)
  // }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <ReCAPTCHA
        sitekey="6Le5LXwkAAAAACRCn5jPPDVnzd9LEKsblHyFl7IS"
        onChange={handleCaptcha}
      />
      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login