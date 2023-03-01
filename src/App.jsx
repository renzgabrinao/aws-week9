import { useState, useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

// layout
import Header from "./layout/Header";
import Footer from "./layout/Footer";

// pages
import NoPage from "./NoPage";
import Landing from "./Landing";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import ConfirmForm from "./auth/ConfirmForm";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPasswordForm from "./auth/ResetPasswordForm";
import Secure from './secure/Secure';

// aws cognito functions
import * as cognito from '../cognito';

// context
import { UserContext } from "./context/UserContext";

export default function App() {

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await cognito.getCurrentUser();

      if (user) {
        setUser(user)
      } else {
        setUser(null);
      }
    }
    getUser();

  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      await cognito.signIn({ username, password });

      const user = await cognito.getCurrentUser();
      console.log(user);
      setUser(user);

      navigate("/home");
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg("Problem signing in 😢");
    }
  }

  const handleSignup = async ({ username, email, password }) => {
    try {
      await cognito.signUp({ username, email, password });
      navigate("/confirm");
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg("Problem signing up 😢");
    }
  }

  const handleConfirm = async ({ username, email, code }) => {
    try {
      await cognito.confirmUser({ username, email, code });
      navigate("/login");
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg("Problem confirming user 😢. Please check form inputs");
    }
  }

  const handleForgotPassword = async ({ username }) => {
    try {
      await cognito.forgotPassword({ username });
      navigate("/reset");
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg("Problem sending email 😢... Is your username correct?");
    }
  }

  const handleResetPassword = async ({ username, code, password }) => {
    try {
      await cognito.resetPassword({ username, code, newPassword: password });
      navigate("/login");
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg("Problem resetting password 😢.");
    }
  }

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div>
        <Header/>
        <div className="min-h-screen bg-slate-300">
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="login" element={<LoginForm  onSubmit={handleLogin} setErrorMsg={setErrorMsg}/>}/>
            <Route path="signup" element={<SignupForm onSubmit={handleSignup} setErrorMsg={setErrorMsg}/>}/>
            <Route path="confirm" element={<ConfirmForm onSubmit={handleConfirm} setErrorMsg={setErrorMsg}/>}/>
            <Route path="forgot" element={<ForgotPassword onSubmit={handleForgotPassword} setErrorMsg={setErrorMsg}/>}/>
            <Route path="reset" element={<ResetPasswordForm onSubmit={handleResetPassword} setErrorMsg={setErrorMsg}/>}/>
            <Route path="home" element={<Secure/>}/>
            <Route path="*" element={<NoPage/>}/>
          </Routes>
          { errorMsg && <div className="text-red-600 text-sm text-center pl-2 mt-1">{errorMsg}</div> }
        </div>
        <Footer />
      </div>
    </UserContext.Provider>
  )
}

