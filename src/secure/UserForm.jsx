import { useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import axios from 'axios';

export default function UserForm () {
  const { userDetails, setUserDetails, token } = useContext(UserContext);

  const [bio, setBio] = useState("");
  const [viewForm, setViewForm] = useState(true);

  const submitUserDetails = async (e) => {
    e.preventDefault();
    const form = {
      bio: bio
    }

    await axios.put(`${import.meta.env.VITE_API_URL}/api/user`, form, {
      headers: {
        Authorization: token
      }
    });

    // grab new user details from db
    await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => setUserDetails(res.data));
  }

  return (
    <div>
      <div className="flex justify-center">
        <button 
          hidden={!viewForm}
          onClick={() => {setViewForm(false)}}
          className="my-5 w-48 bg-green-600 hover:bg-green-800 text-white text-2xl font-bold py-3 px-4 rounded-md shadow-lg"
        >Edit Profile
        </button>
      </div>

      <div className="w-1/2 px-24 py-5 bg-slate-200 rounded-2xl mx-auto shadow-xl" hidden={viewForm}>
        <div className='text-2xl font-bold flex flex-row'>
          <i className="fa-solid fa-circle-xmark absolute text-2xl text-red-500 hover:cursor-pointer"
            onClick={() => {setViewForm(true)}}  
          ></i>
          <h1 className="mx-auto">Edit Your Profile</h1>
        </div>
        <form
          className="flex flex-col mx-auto"
          onSubmit={submitUserDetails}
        >
          <label className="mt-2">Bio</label>
          <textarea 
            className='p-1'
            id="" 
            cols="30" 
            rows="10"
            placeholder='Enter Bio'
            value={bio}
            onChange={(e) => {setBio(e.target.value)}}
          >
          </textarea>
          <button 
            className="mt-2 mx-auto w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg"
            type="submit"
          >Submit
          </button>
        </form>
      </div>
    </div>
  )
}