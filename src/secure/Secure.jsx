import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';

// context
import { UserContext } from "../context/UserContext";

import ReviewForm from "./ReviewForm";

export default function Secure() {
  const { user, token, userReviews, setUserReviews } = useContext(UserContext);


  useEffect(() =>  {
    const checkForUser = () => {
      if(!user) {
        return <Navigate to="/login" replace/>
      }
    }

    checkForUser();
  }, []);

  const handleDelete = async (id) => {
    const form = {
      review_id: id
    }

    await axios.delete(`${import.meta.env.VITE_API_URL}/api/review`, {
      data: form,
      headers: {
        Authorization: token
      }
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err));

    await axios.get(`${import.meta.env.VITE_API_URL}/api/review`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => setUserReviews(res.data))
    .catch(err => console.log(err));

  }

  return (
    <div>
      <ReviewForm/>
      <div className="flex flex-col px-3">
        {userReviews.map((review) => (
          <div 
            key={review.id}
            className="my-2 bg-slate-200 rounded-2xl px-20 py-5 flex flex-col items-center"
          >
            <h1 className="text-center font-bold text-2xl">{review.title} Review</h1>
            <div className="my-5 bg-slate-100 rounded-lg py-4 px-10 text-justify leading-8 text-md">
              {JSON.parse(review.review).map(p => (
                <p className="mb-6" key={p.paragraph}>
                  {p.body}
                </p>
              ))}
            </div>
            <h2 className="text-center text-yellow-700 text-2xl font-bold">{review.rating}%</h2>
            <button 
              onClick={() => handleDelete(review.id)}
              className="mt-5 w-24 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

