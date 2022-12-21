import React from "react";
import { UserContext } from './SignUp';
import { useState, useContext } from "react";


const LoginForm = ({ task }) => {
    const [userName, setUserName] = useState("")    
    const [password, setPassword] = useState("")    
    const { login, signUp2 } = useContext(UserContext)

    async function signInNow() {
        task === 'Sign In' ? login(userName, password) : signUp2(userName, password)
      }


    return (
      <div className='show'>
        <div className="login-form">
          <div className="form-box solid">
            <form>
              <h1 className="login-text">{task}</h1>
              <label>Username</label>
              <br></br>
              <input 
                  type="text" 
                  name="username" 
                  className="login-box" 
                  value = {userName} 
                  onChange={(e) => setUserName(e.target.value)} />
              <br></br>
              <label>Password</label>
              <br></br>
              <input 
                  type="password" 
                  name="password" 
                  className="login-box" 
                  value = {password} 
                  onChange={(e) => setPassword(e.target.value)} />
              <br></br>
            </form>
            <button className="login-btn"onClick={() => signInNow()}>click</button>
          </div>
        </div>
      </div>
    );
  };

export default LoginForm;