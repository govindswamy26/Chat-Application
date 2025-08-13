import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'
import './ProfilePage.css'

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext)
  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!selectedImg) {
      await updateProfile({fullName: name, bio})
      navigate('/')
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(selectedImg)
    reader.onload = async () => {
      const base64Image = reader.result
      await updateProfile({profilePic: base64Image, fullName: name, bio})
      navigate('/')
    }
  }

  return (
    <div className='profile-page-container'>
      <div className='profile-form-container'>
        <form onSubmit={handleSubmit} className="profile-form">
          <h3 className="form-title">Profile Details</h3>
          <p className="form-subtitle">Update your profile information and settings</p>
          
          <label htmlFor="avatar" className='avatar-upload'>
            <input 
              onChange={(e) => setSelectedImg(e.target.files[0])} 
              type="file" 
              id='avatar' 
              accept='.png, .jpg, .jpeg' 
              hidden
            />
            <img 
              src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} 
              alt="" 
              className={`avatar-preview ${selectedImg ? 'rounded' : ''}`}
            />
            <div className='avatar-upload-text'>
              <div className='avatar-upload-title'>Upload Profile Image</div>
              <div className='avatar-upload-subtitle'>Click to select a new profile picture</div>
            </div>
          </label>
          
          <div className='form-group'>
            <label className='form-label'>Full Name</label>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name}
              type="text" 
              required 
              placeholder='Enter your full name' 
              className='form-input'
            />
          </div>
          
          <div className='form-group'>
            <label className='form-label'>Bio</label>
            <textarea 
              onChange={(e) => setBio(e.target.value)} 
              value={bio} 
              placeholder="Tell us about yourself..." 
              required 
              className="form-textarea" 
              rows={4}
            ></textarea>
          </div>

          <button type="submit" className="submit-button">Save Changes</button>
        </form>
        
        <div className='profile-image-section'>
          <img 
            className={`profile-image ${selectedImg ? 'rounded' : ''}`} 
            src={authUser?.profilePic || assets.logo_icon} 
            alt="" 
          />
          <div className='profile-info'>
            <div className='profile-name'>{authUser?.fullName || 'User Name'}</div>
            <div className='profile-email'>{authUser?.email || 'user@example.com'}</div>
            <div className='profile-stats'>
              <div className='profile-stat'>
                <div className='profile-stat-number'>24</div>
                <div className='profile-stat-label'>Messages</div>
              </div>
              <div className='profile-stat'>
                <div className='profile-stat-number'>12</div>
                <div className='profile-stat-label'>Friends</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage