import { useState } from "react";
import { Link } from "react-router-dom";

export default function ResetPasswordForm({ onSubmit, setErrorMsg }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
    } else {
      setErrorMsg(null);
      onSubmit({ username, code, password });
    }
  }

  return (
    <div className="mt-28 h-96">
      <form className="flex flex-col justify-between w-96 h-full m-auto" onSubmit={(e) => {handleSubmit(e)}}>
        <h1 className="text-center text-xl font-bold">Check your email for the code!</h1>
        <div className="flex flex-col">
          <label className="pl-2 font-bold" htmlFor="code">Code</label>
          <input 
            className="border-solid border-2 border-gray-500 p-2 rounded-md" 
            onChange={(e) => {setCode(e.target.value)}}
            type="code" 
            name="code" 
            placeholder="Code..."
            value={code}
          />
        </div>

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
          <label className="pl-2 font-bold" htmlFor="password">New Password</label>
          <input 
            className="border-solid border-2 border-gray-500 p-2 rounded-md" 
            onChange={(e) => {setPassword(e.target.value)}}
            type="password" 
            name="password" 
            placeholder="Password..."
            value={password}/>
        </div>
        <div className="flex flex-col">
          <label className="pl-2 font-bold" htmlFor="confirm-password">Confirm New Password</label>
          <input 
            className="border-solid border-2 border-gray-500 p-2 rounded-md" 
            onChange={(e) => {setConfirmPassword(e.target.value)}}
            type="password" 
            name="password" 
            placeholder="Confirm Password..."
            value={confirmPassword}/>
        </div>

        <button className="w-1/2 border border-green-700 bg-green-600 rounded-md h-10 self-center text-white" type="submit">Sign Up</button>
      </form>
    </div>
  )
}