import React, { useState } from "react";
import "./Login.css";
import { Link,useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "./firebase";

function Login() {
  const navigate = useNavigate();
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = (e) => {
    e.preventDefault();
    // const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log(auth);
        if(auth){
            navigate('/');
        }
      })
    
  };
  const register = (e) => {
    e.preventDefault();
    // const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log(auth);
        if(auth){
            navigate('/');
        }
      })

      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
          className="loginLogo"
        />
      </Link>
      <div className="loginContainer">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={signIn} className="loginSignInButton">
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={register} className="loginRegisterButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
