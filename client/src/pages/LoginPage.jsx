import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'
import './LoginPage.css'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const { login } = useContext(AuthContext)

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if(currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return
    }
    login(currState === "Sign up" ? 'signup' : 'login', {fullName, email, password, bio})
  }

  return (
    <div className='login-container'>
      {/* -------- left -------- */}
      <img src={assets.logo_big} alt="" className='login-logo'/>

      {/* -------- right -------- */}
      <form onSubmit={onSubmitHandler} className='login-form'>
        <h2 className='form-title'>
          {currState}
          {isDataSubmitted && 
            <img 
              onClick={() => setIsDataSubmitted(false)} 
              src={assets.arrow_icon} 
              alt="" 
              className='back-arrow'
            />
          }
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input 
            onChange={(e) => setFullName(e.target.value)} 
            value={fullName}
            type="text" 
            className='form-input'
            placeholder="Full Name" 
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              type="email" 
              placeholder='Email Address' 
              required 
              className='form-input with-focus'
            />
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              type="password" 
              placeholder='Password' 
              required 
              className='form-input with-focus'
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea 
            onChange={(e) => setBio(e.target.value)} 
            value={bio}
            rows={4} 
            className='form-textarea with-focus' 
            placeholder='provide a short bio...' 
            required
          ></textarea>
        )}

        <button type='submit' className='submit-button'>
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className='terms-container'>
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className='auth-toggle'>
          {currState === "Sign up" ? (
            <p className='toggle-text'>
              Already have an account? 
              <span 
                onClick={() => {setCurrState("Login"); setIsDataSubmitted(false)}}
                className='toggle-link'
              >
                Login here
              </span>
            </p>
          ) : (
            <p className='toggle-text'>
              Create an account 
              <span 
                onClick={() => setCurrState("Sign up")} 
                className='toggle-link'
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginPage