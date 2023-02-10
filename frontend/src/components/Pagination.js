import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useSelector, useDispatch } from 'react-redux'

const Pagination = (totalPages, selected = 1) => {
//   const { logout } = useLogout()
//   const { user } = useSelector((state) => state.authReducer)

  

  const li = () => {
    for (let i = 0; i < totalPages; i++) {
      // <pageLink pageNumber={i}/>
        // pageLink(i)
    } 
  }

  return (
    <ul className="pagination mt-30" id="pagination">
        {li}
    </ul>
  )
}

// const pageLink = (pageNumber) => {

//   const handleClick = async () => {
      
//   }

//   return (
//       <li className="page-item active"><a className="page-link" onclick={handleClick}>{pageNumber}</a></li>
//   )
// }



export default Pagination