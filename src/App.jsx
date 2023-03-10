import { useState, useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

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
import Profile from "./secure/Profile";

export default function App() {
  const navigate = useNavigate();
  
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [userDetails, setUserDetails] = useState({});


  useEffect(() => {
    const getUser = async () => {
      const user = await cognito.getCurrentUser();
      if (user) {
        setUser(user);

        // grab user access token
        const userToken = await cognito.getAccessToken();
        setToken(userToken);

        // grab user reviews from db
        await axios.get(`${import.meta.env.VITE_API_URL}/api/review`, {
          headers: {
            Authorization: userToken
          }
        })
        .then(res => setUserReviews(res.data));

        // grab user details from db
        await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
          headers: {
            Authorization: userToken
          }
        })
        .then(res => setUserDetails(res.data));
      }
    }
    getUser();

  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      await cognito.signIn({ username, password });

      const user = await cognito.getCurrentUser();
      setUser(user);

      navigate("/home");
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg("Problem signing in 😢");
    }
  }

  const handleSignup = async ({ username, email, password }) => {
    try {
      const res = await cognito.signUp({ username, email, password });

      const form = JSON.stringify({
        id: res.userSub,
        name: res.user.username
      });

      await axios.post(`${import.meta.env.VITE_API_URL}/api/user`, form,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      
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
      setErrorMsg("Problem confirming user 😢. Please check form inputs.");
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
    <UserContext.Provider 
      value={{user, setUser, errorMsg, setErrorMsg, userReviews, setUserReviews, token, setToken, userDetails, setUserDetails}}
    >
      <div>
        <Header/>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="login" element={<LoginForm  onSubmit={handleLogin}/>}/>
            <Route path="signup" element={<SignupForm onSubmit={handleSignup}/>}/>
            <Route path="confirm" element={<ConfirmForm onSubmit={handleConfirm}/>}/>
            <Route path="forgot" element={<ForgotPassword onSubmit={handleForgotPassword}/>}/>
            <Route path="reset" element={<ResetPasswordForm onSubmit={handleResetPassword}/>}/>
            <Route path="home" element={<Secure/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="*" element={<NoPage/>}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </UserContext.Provider>
  )
}

