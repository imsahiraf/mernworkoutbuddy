import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";

const EmailVerify = () => {
  
  const [validUrl, setValidUrl] = useState(false);

  const param = useParams();

  useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const response = await fetch('/api/user/token/' + param.token, {
          method: 'GET'
        })
        if(response.status == 200){
          setValidUrl(true);
        }
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

  return (
    <Fragment>
			{validUrl ? (
				<div>
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button style={{color:'green'}}>Login</button>
          </Link>
        </div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
    
    
  )
}

export default EmailVerify