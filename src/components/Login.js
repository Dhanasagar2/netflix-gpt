import React, { useRef, useState } from 'react'
import Header from "./Header";
import { checkValidData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const Password = useRef(null);
  const name = useRef(null);

  //const FullName = useRef(null);
const handleButtonClick = () =>{
  //valiate the form data

  console.log(name);
  const message= checkValidData(email.current.value, Password.current.value, isSignInForm ? undefined :name.current.value);
  setErrorMessage(message);

  if(message) return; 
  // sign In / sign Up logic
  if(!isSignInForm) {
    //signUp Logic
   createUserWithEmailAndPassword(
    auth, 
    email.current.value, 
    Password.current.value
  )
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: "name.current.value", 
      photoURL: "https://avatars.githubusercontent.com/u/181720346?s=400&u=65d88156e1f7400cadcb5da6ad4575697138b929&v=4"
    }).then(() => {
    
    const {uid, email, displayName, photoURL} = auth.currentUser;
                       dispatch(
                        addUser(
                            {   uid: uid, 
                                email:email, 
                                displayName:displayName, 
                                photoURL
                            })
                    );  

     navigate("/browse");
    })
    .catch((error) => {
      setErrorMessage(error.message);
    });
    
    console.log(user)
    navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" +errorMessage);
  });

  }
  else{
    //signIn Logic
    signInWithEmailAndPassword(
      auth, 
      email.current.value, 
      Password.current.value
    )
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+ "-" +errorMessage);
  });
  }
};

const toggleSignInForm = () => {
  setIsSignInForm(!isSignInForm);
};

  return (
    <div className="relative w-screen h-screen overflow-hidden">
        <Header />
        
          <img 
            className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/8200f588-2e93-4c95-8eab-ebba17821657/web/IN-en-20250616-TRIFECTA-perspective_9cbc87b2-d9bb-4fa8-9f8f-a4fe8fc72545_medium.jpg"
            alt="background" 
          />
        
        <form 
            onSubmit={(e) => e.preventDefault()} 
            className="w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 bg-black bg-opacity-80 text-white rounded-lg shadow-lg">
            <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>

        {!isSignInForm && (
        <input 
          ref={name}
          type="text" 
          placeholder="Full Name" 
          className="p-4 my-4 w-full bg-gray-700" 
          />
        )}
        <input 
          ref={email}
          type="text" 
          placeholder="Email Adress" 
          className="p-4 my-4 w-full bg-gray-700" 
          />

        <input 
          ref={Password}
          type="password" 
          placeholder="Password" 
          className="p-4 my-4 w-full bg-gray-700" 
          />
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick ={toggleSignInForm}>
            {isSignInForm ? "New to Netflix? Sign up now" : "Already Registered! Sign In now"}
          </p>

        </form>
    </div>
  )
};

export default Login;