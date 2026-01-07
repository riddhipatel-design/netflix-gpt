import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { getFirebaseAuthErrorMessage } from "../utils/firebaseErrors";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const langKey = useSelector((store) => store.config.lang);

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    // Validate the Form data
    const message = checkValidData(
      email.current.value.trim(),
      password.current.value.trim()
    );
    setErrorMessage(message);
    if (message) return;

    // sign in /sign up
    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value.trim(),
        password.current.value.trim()
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          return updateProfile(user, {
            displayName: name.current.value.trim(),
          });
        })
        .then(() => {
          // Profile updated!
          const { uid, email, displayName } = auth.currentUser;
          dispatch(
            addUser({ uid: uid, email: email, displayName: displayName })
          );
        })

        .catch((error) => {
          setErrorMessage(getFirebaseAuthErrorMessage(error.code, false));
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value.trim(),
        password.current.value.trim()
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          setErrorMessage(getFirebaseAuthErrorMessage(error.code, true));
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

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
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
        {/* Login form */}
        <div className="w-full">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="
      absolute top-1/2 left-1/2
      -translate-x-1/2 -translate-y-1/2
      flex flex-col gap-6
      bg-black/75
      py-10 px-8 sm:py-14 sm:px-16
      rounded text-white
     w-[80%] sm:w-[70%] md:w-[65%] lg:w-[45%] xl:w-[35%]
    "
          >
            <h1 className="font-bold text-3xl pb-4">
              {isSignInForm ? lang[langKey].signIn : lang[langKey].signUp}
            </h1>

            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder={lang[langKey].namePlaceholder}
                className="p-3 mt-1 bg-gray-800 text-white rounded w-full"
              />
            )}

            <input
              ref={email}
              type="text"
              placeholder={lang[langKey].emailPlaceholder}
              className="p-3 mt-1 bg-gray-800 text-white rounded w-full"
            />

            <input
              ref={password}
              type="password"
              placeholder={lang[langKey].passwordPlaceholder}
              className="p-3 bg-gray-800 text-white rounded w-full"
            />

            {errorMessage && (
              <p className="text-red-600 text-md font-medium mt-1">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="p-3 bg-red-700 text-white font-semibold rounded w-full"
              onClick={handleButtonClick}
            >
              {isSignInForm ? lang[langKey].signIn : lang[langKey].signUp}
            </button>

            <p className="py-4 text-gray-300 text-sm sm:text-base">
              {isSignInForm ? (
                <>
                  {lang[langKey].newToNetflix}{" "}
                  <button
                    type="button"
                    onClick={toggleSignInForm}
                    className="ml-1 text-white hover:underline"
                  >
                    {lang[langKey].signUp}
                  </button>
                </>
              ) : (
                <>
                  {lang[langKey].alreadyRegistered}{" "}
                  <button
                    type="button"
                    onClick={toggleSignInForm}
                    className="ml-1 text-white hover:underline"
                  >
                    {lang[langKey].signIn}
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
