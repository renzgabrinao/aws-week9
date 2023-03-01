import { useState } from "react"

export default function SignupForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, email, code });

  }

  return (
    <div className="mt-28">
      <form className="flex flex-col justify-between w-96 h-72 m-auto" onSubmit={(e) => {handleSubmit(e)}}>
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
            value={email}
          />
        </div>
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

        <button className="w-1/2 border border-green-700 bg-green-600 rounded-md h-10 self-center text-white" type="submit">Confirm Account</button>
      </form>
    </div>
  )
}