import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "./SignUp";
import LoginForm from "./LoginForm";

function NavBar() {
    const [modal, setModal] = useState(false)
    const { user, logout } = useContext(UserContext)
  
    const handleLogin = () => {
      setModal(!modal)        
    };

    const handleSignUp = () => {
      setModal(!modal)        
    };

    const handleLogout = () => {
      setModal(!modal)
      logout()
  };

  return (
    <div className="navbar">
      {user.name === '' ? 
      <>
            <div style={{float: 'right', marginRight: '5vw'}}>
                <span onClick={() => modal ? setModal(!modal) : setModal('Sign In')} className="loginicon">
                Sign In 
                </span>
                <span onClick={() => modal ? setModal(!modal) : setModal('Sign Up')} className="loginicon">
                Sign Up
                </span>
            </div>
            {modal && user.name === '' && <LoginForm task={modal} />}
      </>
      : <div style={{float: 'right', marginRight: '5vw'}}>
        <span onClick={handleLogout} className="loginicon">
          Sign Out
        </span>
      </div>}
    </div>
  );
}

export default NavBar;

//https://codesandbox.io/s/animation-login-popup-form-8z817?from-embed=&file=/src/styles.css:59-177