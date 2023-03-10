import { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export default function ForgotPassword({ onSubmit }) {
  const [username, setUsername] = useState("");

  const { errorMsg } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username });
  }
  
  return (
    <div className="h-screen flex justify-center items-center">
      <form className="flex flex-col justify-between w-96 h-60" onSubmit={handleSubmit}>
        <h1 className="text-center text-xl font-bold">Enter your user name to reset your password</h1>
        <div className="flex flex-col">
          <label className="pl-2 font-bold" htmlFor="username">User Name</label>
          <input 
            className="border-solid border-2 border-gray-500 p-2 rounded-md" 
            onChange={(e) => {setUsername(e.target.value)}}
            type="text" 
            name="username" 
            placeholder="User Name..."
            value={username}/>
          <Link className="text-sm text-center cursor-pointer pl-2 mt-4 hover:underline text-blue-500" to="/reset">
            Already got a code?
          </Link>
        </div>

        <button className="w-1/2 border border-green-700 bg-green-600 rounded-md h-10 self-center text-white mt-4" type="submit">
          Submit
        </button>
        { errorMsg && <div className="text-red-600 text-sm text-center pl-2 mt-1">{errorMsg}</div> }
      </form>
    </div>
  )
}