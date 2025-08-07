import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import './Sidebar.css'

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext)
    const { logout, onlineUsers } = useContext(AuthContext)
    const [input, setInput] = useState(false)
    const navigate = useNavigate()

    const filteredUsers = input ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())) : users

    useEffect(() => {
        getUsers()
    }, [onlineUsers])

    return (
        <div className={`sidebar-container ${selectedUser ? "mobile-hidden" : ''}`}>
            <div className='sidebar-header'>
                <div className='header-content'>
                    <img src={assets.logo} alt="logo" className='logo-image' />
                    <div className="menu-container">
                        <img src={assets.menu_icon} alt="Menu" className='menu-icon' />
                        <div className='dropdown-menu'>
                            <p onClick={() => navigate('/profile')} className='menu-item'>Edit Profile</p>
                            <hr className="menu-divider" />
                            <p onClick={() => logout()} className='menu-item'>Logout</p>
                        </div>
                    </div>
                </div>

                <div className='search-container'>
                    <img src={assets.search_icon} alt="Search" className='search-icon'/>
                    <input 
                        onChange={(e) => setInput(e.target.value)} 
                        type="text" 
                        className='search-input'
                        placeholder='Search User...'
                    />
                </div>
            </div>

            <div className='users-list'>
                {filteredUsers.map((user, index) => (
                    <div 
                        onClick={() => {
                            setSelectedUser(user)
                            setUnseenMessages(prev => ({...prev, [user._id]: 0}))
                        }}
                        key={index} 
                        className={`user-item ${selectedUser?._id === user._id ? 'active-user' : ''}`}
                    >
                        <img src={user?.profilePic || assets.avatar_icon} alt="" className='user-avatar'/>
                        <div className='user-info'>
                            <p className='user-name'>{user.fullName}</p>
                            {onlineUsers.includes(user._id)
                                ? <span className='online-status'>Online</span>
                                : <span className='offline-status'>Offline</span>
                            }
                        </div>
                        {unseenMessages[user._id] > 0 && (
                            <p className='unread-count'>{unseenMessages[user._id]}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar