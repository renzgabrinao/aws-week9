import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import * as cognito from '../../cognito';
import axios from 'axios';

import defaultPic from '../assets/default-profile.jpg';
import UserForm from "./UserForm";

// context
import { UserContext } from "../context/UserContext";



export default function Profile() {
  const { user, userDetails} = useContext(UserContext);

  useEffect(() => {
    const checkForUser = async () => {
      if(!user) {
        return <Navigate to="/login" replace/>
      }
    }
    checkForUser();

    console.log(userDetails)
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center mt-5">
        <img 
          src={userDetails.image_name ? defaultPic : defaultPic} 
          alt="asdf" 
          className="rounded-full w-1/4 h-1/4"
        />
        <h1 className="text-3xl font-bold mt-5">{userDetails.display_name}</h1>
        <h1 className="text-xl font-semibold my-5">{userDetails.bio}</h1>
      </div>
      <UserForm/>
    </div>
  );
}