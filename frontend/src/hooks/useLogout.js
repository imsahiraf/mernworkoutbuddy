// import { useAuthContext } from './useAuthContext'
import { useSelector, useDispatch } from 'react-redux'
// import { useWorkoutsContext } from './useWorkoutsContext'

export const useLogout = () => {
  const dispatch = useDispatch()
  // const { dispatch: dispatchWorkouts } = useDispatch()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatch({ type: 'SET_WORKOUTS', payload: null })
  }

  return { logout }
}