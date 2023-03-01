import { Link } from "react-router-dom"
import { useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  }
  
  return (
    <div className="mt-28">
      <form className="flex flex-col justify-between w-96 h-80 m-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="pl-2 font-bold" htmlFor="username">User Name</label>
          <input 
            className="border-solid border-2 border-gray-500 p-2 rounded-md" 
            onChange={(e) => {setUsername(e.target.value)}}
            type="text" 
            name="username" 
            placeholder="User Name..."
            value={username}/>
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
          <Link className="text-sm text-center cursor-pointer pl-2 mt-2 hover:underline text-blue-500" to="/signup">
            Don't have and account? Click here and sign up now.
          </Link>
          <Link className="text-sm text-center cursor-pointer pl-2 mt-2 hover:underline text-blue-500" to="/confirm">
            Got a code? Click here to verify your account.
          </Link>
          <Link className="text-sm text-center cursor-pointer pl-2 mt-4 hover:underline text-blue-500" to="/forgot">
            Forgot password?
          </Link>
        </div>

        <button className="w-1/2 border border-green-700 bg-green-600 rounded-md h-10 mt-4 self-center text-white" type="submit">
          Sign In
        </button>
      </form>
    </div>
  )
}