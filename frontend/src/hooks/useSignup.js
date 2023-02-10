import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [msg, setMsg] = useState("");
  const { dispatch } = useDispatch()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {

        setMsg('You are now successfully registered. We had sent you the link on your email please verify it.');
      // save the user to local storage
      // localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      // dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error, msg }
}