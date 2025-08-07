import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import './RightSidebar.css'

const RightSidebar = () => {
    const { selectedUser, messages } = useContext(ChatContext)
    const { logout, onlineUsers } = useContext(AuthContext)
    const [msgImages, setMsgImages] = useState([])

    useEffect(() => {
        setMsgImages(
            messages.filter(msg => msg.image).map(msg => msg.image)
        )
    }, [messages])

    return selectedUser && (
        <div className={`right-sidebar-container ${selectedUser ? "mobile-hidden" : ""}`}>
            <div className='user-profile-section'>
                <img 
                    src={selectedUser?.profilePic || assets.avatar_icon} 
                    alt=""
                    className='user-avatar' 
                />
                <h1 className='user-name'>
                    {onlineUsers.includes(selectedUser._id) && <span className='online-indicator'></span>}
                    {selectedUser.fullName}
                </h1>
                <p className='user-bio'>{selectedUser.bio}</p>
            </div>

            <hr className="divider"/>

            <div className="media-section">
                <p className='media-title'>Media</p>
                <div className='media-grid'>
                    {msgImages.map((url, index) => (
                        <div key={index} onClick={() => window.open(url)} className='media-item'>
                            <img src={url} alt="" className='media-image'/>
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={() => logout()} className='logout-button'>
                Logout
            </button>
        </div>
    )
}

export default RightSidebar