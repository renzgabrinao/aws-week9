import { useState } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export default function SignupForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { errorMsg, setErrorMsg } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
    } else {
      setErrorMsg(null);
      onSubmit({ username, email, password });
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="flex flex-col justify-between w-96 h-2/5" onSubmit={(e) => {handleSubmit(e)}}>
        <div className="flex flex-col">
          <label className="pl-2 font-bold" htmlFor="username">User Name</label>
          <input 
            className="border-solid border-2 border-gray-500 p-2 rounded-md" 
            onChange={(e) => {setUsername(e.target.value)}}
            type="text" 
            name="username" 
            placeholder="Name..."
            value={username}/>
        </div> 

        <div className="flex flex-col">
          <label className="pl-2 font-bold" htmlFor="email">Email</label>
          <input 
            className="border-solid border-2 border-gray-500 p-2 rounded-md" 
            onChange={(e) => {setEmail(e.target.value)}}
            type="email" 
            name="email" 
            placeholder="Email..."
            value={email}/>
        </div>

        <div className="flex flex-col">
          <label className="pl-2 font-bold" htmlFor="password">Password</label>
          <input 
            className="border-solid border-2 border-gray-500 p-2 rounded-md" 
            onChange={(e) => {setPassword(e.target.value)}}
            type="password" 
            name="password" 
            placeholder="Password..."
            value={password}/>
        </div>

        <div className="flex flex-col">
          <label className="pl-2 font-bold" htmlFor="confirm-password">Confirm Password</label>
          <input 
            className="border-solid border-2 border-gray-500 p-2 rounded-md" 
            onChange={(e) => {setConfirmPassword(e.target.value)}}
            type="password" 
            name="password" 
            placeholder="Confirm Password..."
            value={confirmPassword}/>

          <Link className="text-sm cursor-pointer pl-2 mt-1 hover:underline text-blue-500" to="/login">
            Already have an account? Click here to sign in
          </Link>
        </div>

        <button className="w-1/2 border border-green-700 bg-green-600 rounded-md h-10 self-center text-white" type="submit">Sign Up</button>
        { errorMsg && <div className="text-red-600 text-sm text-center pl-2 mt-1">{errorMsg}</div> }
      </form>
    </div>
  )
}