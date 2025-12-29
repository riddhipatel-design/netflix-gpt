import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
   
    const[isSignInForm, setIsSignInForm] = useState(true);

   const toggleSignInForm = () =>{
    setIsSignInForm(!isSignInForm);
   }

  return (
    <div>
      <Header />

      {/* Background container */}
      <div className="relative">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9ddb442a-aca7-4d85-9cd1-dbed62f18f26/web/CA-en-20251222-TRIFECTA-perspective_40233631-5c6a-4e96-92cc-4001dd827c62_large.jpg"
          alt="background"
          className="w-full h-screen object-cover"
        />

        {/* Login form */}
        <div className="w-full max-w-[480px]">
        <form className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 bg-black/75 py-14 px-16 rounded text-white">
        <h1 className="font-bold text-3xl pb-4">{isSignInForm? "Sign In" : "Sign Up"}</h1>
       {!isSignInForm && <input
            type="text"
            placeholder="Name"
            className="p-3 mt-1 bg-gray-800 text-white rounded h-[56px] w-full"
          />}
          <input
            type="text"
            placeholder="Email or phone number"
            className="p-3 mt-1 bg-gray-800 text-white rounded h-[56px] w-full"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 bg-gray-800 text-white rounded h-[56px] w-full"
          />

          <button
            type="submit"
            className="p-3 bg-red-700 text-white font-semibold rounded w-full"
          >
            {isSignInForm? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now" } </p>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
