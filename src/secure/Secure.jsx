import { useContext } from "react";

// context
import { UserContext } from "../context/UserContext";

export default function Secure() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {
        user ? 
        <>
          <h1 className="text-center">SECURE PAGE</h1>
        </> 
        : 
        <>
          <h1 className="text-center">You have no access on this page.</h1>
        </>
      }

    </div>
  )
}