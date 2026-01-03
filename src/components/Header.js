import React, { useEffect } from 'react'
import { PROFILE_PIC, LOGO } from "../utils/constants";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from "../utils/userSlice"

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName })
      );
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

  return (
    <div className="fixed top-0 left-0 z-50 w-full px-14 py-4 bg-gradient-to-b from-black flex items-center justify-between">
      {/* LOGO */}
      <img
        className="w-44"
        src={LOGO}
        alt="Netflix logo"
      />

      {/* PROFILE SECTION */}
      {user && (
        <div className="relative group flex items-center gap-3 pr-5 cursor-pointer">
          {/* ✅ USER NAME */}
          <span className="text-white text-sm font-medium">
            {user.displayName}
          </span>

          {/* Avatar */}
          <img
            src={PROFILE_PIC}
            alt="User profile"
            className="w-10 h-10 rounded object-cover"
          />

          {/* Dropdown */}
          <div
            className="
    absolute right-0 top-full mt-2 w-30
    bg-black text-white
    border border-gray-700
    rounded
    opacity-0 invisible
    group-hover:opacity-100 group-hover:visible
    transition-all duration-200
    z-50
  "
          >
            <button
              onClick={handleSignOut}
              className="w-full text-center px-4 py-3 text-sm hover:bg-gray-800"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
