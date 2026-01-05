import React, { useEffect } from "react";
import { PROFILE_PIC, LOGO, Supported_Languages } from "../utils/constants";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { AiOutlineHome } from "react-icons/ai";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const shouldShowLanguageDropdown = isLoginPage || showGptSearch;

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //  cleanup
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

 return (
  <div className="fixed top-0 left-0 z-50 w-full px-14 py-4 bg-gradient-to-b from-black flex items-center justify-between">
    {/* LOGO */}
    <img className="w-44" src={LOGO} alt="Netflix logo" />

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-4 pr-5">
      
      {/* 🌍 LANGUAGE DROPDOWN (Login + GPT only) */}
      {shouldShowLanguageDropdown && (
        <select
          className=" p-2 
          bg-gray-900 
          text-white 
          rounded 
          cursor-pointer 
          border border-gray-700
          hover:bg-gray-700
          transition-colors"
          onChange={handleLanguageChange}
          defaultValue="en"
        >
          {Supported_Languages.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}  className="bg-gray-900 text-white hover:bg-gray-800">
              {lang.name}
            </option>
          ))}
        </select>
      )}

      {/* 🤖 GPT SEARCH BUTTON (only when logged in) */}
      {user && (
        <button
          className="py-2 px-4 bg-purple-800 text-white rounded-md hover:bg-purple-700 transition-colors"
          onClick={handleGptSearchClick}
        >
          {showGptSearch ? <AiOutlineHome className="text-xl" /> : "GPT Search"}
        </button>
      )}

      {/* 👤 PROFILE (only when logged in) */}
      {user && (
        <div className="relative group cursor-pointer flex items-center gap-2">
          <span className="text-white text-md font-medium">
            {user.displayName}
          </span>

          <img
            src={PROFILE_PIC}
            alt="User profile"
            className="w-10 h-10 rounded object-cover"
          />

          <div className="
            absolute right-0 top-full mt-2 w-36
            bg-black text-white
            border border-gray-700
            rounded
            opacity-0 invisible
            group-hover:opacity-100 group-hover:visible
            transition-all duration-200
            z-50
          ">
            <button
              onClick={handleSignOut}
              className="w-full text-center px-3 py-3 text-sm hover:bg-gray-800"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default Header;
