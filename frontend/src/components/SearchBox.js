import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

export default function SearchBox() {

  const [search, setSearch] = useState('')
  const [emptyFields, setEmptyFields] = useState([])

  const { workouts } = useSelector((state) => state.workoutsReducer)
  
  const dispatch  = useDispatch()
  const { user } = useSelector((state) => state.authReducer)

  const fetchWorkouts = async () => {
  
    const response = await fetch(`/api/workouts/search/${search}`, {
      headers: {'Authorization': `Bearer ${user.token}`},
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'SET_WORKOUTS', payload: json})
    }
  }

  useEffect(() => {
    if(search != ''){
      fetchWorkouts()
    }
  }, [dispatch, user, search])

  return (
    // <div>Hi</div>
    <form>
      <input 
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder='Search Your Workout'
        className={emptyFields.includes('title') ? 'error' : ''}
      />
    </form>
    
  )
}
