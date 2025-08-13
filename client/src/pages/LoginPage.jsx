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
      <div className='login-logo-section'>
        <img src={assets.logo_big} alt="" className='login-logo'/>
        <p className='login-tagline'>
          Connect with friends and family in real-time with our modern chat application
        </p>
      </div>

      {/* -------- right -------- */}
      <div className='login-form-container'>
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
            <div className='form-group'>
              <label className='form-label'>Full Name</label>
              <input 
                onChange={(e) => setFullName(e.target.value)} 
                value={fullName}
                type="text" 
                className='form-input'
                placeholder="Enter your full name" 
                required
              />
            </div>
          )}

          {!isDataSubmitted && (
            <>
              <div className='form-group'>
                <label className='form-label'>Email Address</label>
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email}
                  type="email" 
                  placeholder='Enter your email address' 
                  required 
                  className='form-input'
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Password</label>
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                  type="password" 
                  placeholder='Enter your password' 
                  required 
                  className='form-input'
                />
              </div>
            </>
          )}

          {currState === "Sign up" && isDataSubmitted && (
            <div className='form-group'>
              <label className='form-label'>Bio</label>
              <textarea 
                onChange={(e) => setBio(e.target.value)} 
                value={bio}
                rows={4} 
                className='form-textarea' 
                placeholder='Tell us a bit about yourself...' 
                required
              ></textarea>
            </div>
          )}

          <button type='submit' className='submit-button'>
            {currState === "Sign up" ? "Create Account" : "Login Now"}
          </button>

          <div className='terms-container'>
            <input type="checkbox" className='terms-checkbox' />
            <div className='terms-text'>
              I agree to the 
              <span className='terms-link'> terms of use </span>
              & 
              <span className='terms-link'> privacy policy</span>.
            </div>
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
    </div>
  )
}

export default LoginPage