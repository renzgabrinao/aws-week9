import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ConfirmForm from "./ConfirmForm";
import Secure from '../secure/Secure';
import * as cognito from '../../cognito';


export default function AuthPage() {
  const [page, setPage] = useState("login");
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSignup = async ({ username, email, password }) => {
    try {
      await cognito.signUp({ username, email, password });
      setPage("confirm")
    } catch (error) {
      setErrorMsg("Problem signing up");
    }
  }

  const handleConfirm = async ({ username, email, code }) => {
    try {
      await cognito.confirmUser({ username, email, code });
      setPage("secure");
    } catch (error) {
      setErrorMsg("Problem confirming user. Please check form inputs");
    }
  }

  const handlePage = (page, setPage) => {
  switch(page) {
    case "login":
      return <LoginForm setPage={setPage} onSubmit={() => {}}/>
    case "signup":
      return <SignupForm setPage={setPage} onSubmit={handleSignup} setErrorMsg={setErrorMsg}/>
    case "confirm":
      return <ConfirmForm onSubmit={handleConfirm} />
    case "secure": 
      return <Secure />
    default:
      break;
  }
}


  return (
    <div className="h-screen flex flex-col justify-start items-center">
      {handlePage(page, setPage)}
      { errorMsg && <div className="text-red-600 text-sm text-center pl-2 mt-1">{errorMsg}</div> }
    </div>
  )
}

