import { useState, useContext } from 'react'; 
import { UserContext } from '../context/UserContext';
import axios from 'axios';

export default function ReviewForm () {
  const { setUserReviews, token } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(100);

  const [viewForm, setViewForm] = useState(true);


  const submitReview = async (e) => {
    e.preventDefault();

    const paragraphs = [];
    const split = review.split("#np");

    for (let i = 0; i < split.length; i++) {
      paragraphs.push({
        paragraph: i,
        body: split[i]
      });
    }
  
    const form = {
      "title": title,
      "review": JSON.stringify(paragraphs),
      "rating": rating
    }

    // upload review to db
    await axios.post(`${import.meta.env.VITE_API_URL}/api/review`, form, {
      headers: {
        Authorization: token
      }
    });

    await axios.get(`${import.meta.env.VITE_API_URL}/api/review`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => setUserReviews(res.data))
    .catch(err => console.log(err));

    setTitle("");
    setReview("");
    setRating(100);
  };

  return (
    <div>
      <div className="flex justify-center">
        <button 
          hidden={!viewForm}
          onClick={() => {setViewForm(false)}}
          className="my-5 w-60 bg-green-600 hover:bg-green-800 text-white text-2xl font-bold py-3 px-4 rounded-md shadow-lg"
        >Create Review
        </button>
      </div>

      <div 
        className="w-1/2 px-24 py-5 bg-slate-200 rounded-2xl mx-auto shadow-xl"
        hidden={viewForm}
      >
        <div className="text-2xl font-bold flex flex-row">
          <i className="fa-solid fa-circle-xmark absolute text-2xl text-red-500 hover:cursor-pointer"
            onClick={() => {setViewForm(true)}}  
          ></i>
          <h1 className="mx-auto">Create A Movie Review!</h1>
        </div>

        <form 
          onSubmit={submitReview}
          className="flex flex-col mx-auto"
        >
          <label className="mt-2">Title</label>
          <input 
            className="p-1 rounded-md shadow-sm"
            type="text"  
            placeholder="Enter Title"
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}
          />
          <label className="mt-2">Review</label>
          <div className="flex flex-row h-10 leading-10 hover:text-green-800">
            <i className="fa-regular fa-lightbulb my-1 mr-3 text-xl"></i>
            <h3>Go into a new paragraph by separating with #np !</h3>
          </div>
          <textarea 
            className="p-1 rounded-md shadow-sm"
            cols="30" 
            rows="10"
            placeholder="Enter movie review"
            value={review}
            onChange={(e) => {setReview(e.target.value)}}
          />
          <label className="mt-2">Rating (%)</label>
          <input 
            className="p-1 rounded-md shadow-sm"
            type="number"  
            placeholder="Enter Rating"
            value={rating}
            onChange={(e) => {setRating(e.target.value)}}
          />
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