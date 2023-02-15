import { useEffect, useState, Suspense, lazy }from 'react'
import { useSelector, useDispatch } from 'react-redux'


// components
// import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import SearchBox from '../components/SearchBox'
const WorkoutDetails = lazy(()=>import('../components/WorkoutDetails'))

const Home = () => {

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { workouts } = useSelector((state) => state.workoutsReducer)
  
  const dispatch  = useDispatch()
  const { user } = useSelector((state) => state.authReducer)

  const handlePrevious = async () => {
    await setPage((p) => {
      if (p === 1){
        fetchWorkouts(p)
        return p;
      }
      fetchWorkouts(p - 1)
      return p - 1;
    });
  }

  const handleNext = async () => {
    await setPage((p) => {
      if (p === pageCount){
        fetchWorkouts(p)
        return p
      };
      fetchWorkouts(p + 1)
      return p + 1;
    });
  }

  const pageNumber = async (page) => {
    await setPage(() => {
      fetchWorkouts(page)
      return page;
    });
  }

  const fetchWorkouts = async (pageNo = '') => {
    
    if(pageNo === ''){
      pageNo = page
    }

    const response = await fetch(`/api/workouts/?page=${pageNo}`, {
      headers: {'Authorization': `Bearer ${user.token}`},
    })
    const json = await response.json()

    setPageCount(json.noOfPages);

    if (response.ok) {
      dispatch({type: 'SET_WORKOUTS', payload: json.data})
    }
  }

  useEffect(() => {
    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  const pages = [...Array(pageCount).keys()];

  return (
    <div className="home">
      <div className="workouts">
      <SearchBox/>
        <Suspense fallback={<p>Please wait while loading</p>}>
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
        </Suspense>
        {/* <div id="paginated"></div> */}
        {/* <Pagination totalPages = {json.noOfPages}/> */}
        <ul className="pagination mt-30" id="pagination">
          <li className="page-item"><a className="page-link" onClick={handlePrevious}>Prev</a></li>
            {pages && pages.map((item) => (
              <li className="page-item" key={item + 1}><a className="page-link" onClick={() => pageNumber(item + 1)}>{item + 1}</a></li>
            ))}
          <li className="page-item"><a className="page-link" onClick={handleNext}>Next</a></li>
        </ul>
      </div>
      <WorkoutForm />
    </div>
  )
}


export default Home