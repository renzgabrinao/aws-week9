import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// aws cognito functions
import * as cognito from '../../cognito';

// context
import { UserContext } from "../context/UserContext";

export default function Header() {

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = async () => {
    await cognito.signOut();
    setUser(null);
    navigate("/");
  } 

  return (
    <nav className="h-12 flex flex-row justify-between items-center px-9 text-xl">
      <div className="hover:cursor-pointer">
        { user ?
          <>
            <Link to="/home">AWS WEEK 9</Link>
          </> 
          : 
          <>
            <Link to="/">AWS WEEK 9</Link>
          </>
        }
      </div>
      <ul className="flex flex-col justify-between">
        {user ?
          <>
            <li className="hover:underline"><Link to="/profile">Hello, {user.username}</Link></li>
            <li onClick={handleSignOut} className="hover:underline hover:cursor-pointer">Sign Out</li>
          </> 
          : 
          <>
            <li className="hover:underline"><Link to="/login">Log In</Link></li>
            <li className="hover:underline"><Link to="/signup">Sign Up</Link></li>
          </>
        }
      </ul>
    </nav>
  )
}