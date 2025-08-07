import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import './ChatContainer.css'

const ChatContainer = () => {
    const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)
    const { authUser, onlineUsers } = useContext(AuthContext)
    const scrollEnd = useRef()
    const [input, setInput] = useState('')

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if(input.trim() === "") return null
        await sendMessage({text: input.trim()})
        setInput("")
    }

    const handleSendImage = async (e) => {
        const file = e.target.files[0]
        if(!file || !file.type.startsWith("image/")){
            toast.error("select an image file")
            return
        }
        const reader = new FileReader()
        reader.onloadend = async () => {
            await sendMessage({image: reader.result})
            e.target.value = ""
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        if(selectedUser){
            getMessages(selectedUser._id)
        }
    },[selectedUser])

    useEffect(() => {
        if(scrollEnd.current && messages){
            scrollEnd.current.scrollIntoView({ behavior: "smooth"})
        }
    },[messages])

    return selectedUser ? (
        <div className='chat-container'>
            {/* ------- header ------- */}
            <div className='chat-header'>
                <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="user-avatar"/>
                <p className='user-name'>
                    {selectedUser.fullName}
                    {onlineUsers.includes(selectedUser._id) && <span className="online-indicator"></span>}
                </p>
                <img onClick={()=> setSelectedUser(null)} src={assets.arrow_icon} alt="" className='mobile-back-icon'/>
                <img src={assets.help_icon} alt="" className='desktop-help-icon'/>
            </div>
            
            {/* ------- chat area ------- */}
            <div className='chat-messages'>
                {messages.map((msg, index) => (
                    <div key={index} className={`message-container ${msg.senderId !== authUser._id ? 'reversed' : ''}`}>
                        {msg.image ? (
                            <img src={msg.image} alt="" className='message-image'/>
                        ) : (
                            <p className={`message-text ${msg.senderId === authUser._id ? 'sent' : 'received'}`}>
                                {msg.text}
                            </p>
                        )}
                        <div className="message-meta">
                            <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} alt="" className='sender-avatar' />
                            <p className='message-time'>{formatMessageTime(msg.createdAt)}</p>
                        </div>
                    </div>
                ))}
                <div ref={scrollEnd}></div>
            </div>

            {/* ------- bottom area ------- */}
            <div className='message-input-container'>
                <div className='input-wrapper'>
                    <input 
                        onChange={(e)=> setInput(e.target.value)} 
                        value={input} 
                        onKeyDown={(e)=> e.key === "Enter" ? handleSendMessage(e) : null} 
                        type="text" 
                        placeholder="Send a message"
                        className='message-input'
                    />
                    <input onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden/>
                    <label htmlFor="image">
                        <img src={assets.gallery_icon} alt="" className="gallery-icon"/>
                    </label>
                </div>
                <img onClick={handleSendMessage} src={assets.send_button} alt="" className="send-button" />
            </div>
        </div>
    ) : (
        <div className='empty-chat-state'>
            <img src={assets.logo_icon} className='empty-chat-logo' alt="" />
            <p className='empty-chat-text'>Chat anytime, anywhere</p>
        </div>
    )
}

export default ChatContainer