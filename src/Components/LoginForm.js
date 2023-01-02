import React from "react";
import { UserContext } from './SignUp';
import { useState, useContext } from "react";


const LoginForm = ({ task }) => {
    const [userName, setUserName] = useState("")    
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")    
    const { login, signUp2 } = useContext(UserContext)

    async function signInNow() {
      const response = (task === 'Sign In' ? await login(userName, password) : await signUp2(userName, password) )
      if (response) {
          setError(response['message'])
      }
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
              <div>{error}</div>
            </form>
            <button className="login-btn"onClick={() => signInNow()}>click</button>
          </div>
        </div>
      </div>
    );
  };

export default LoginForm;