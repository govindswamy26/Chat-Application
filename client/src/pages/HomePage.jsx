import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import './HomePage.css'

const HomePage = () => {
    const { selectedUser } = useContext(ChatContext)

    return (
        <div className='homepage-container'>
            <div className={`homepage-layout glass-wrapper ${selectedUser ? 'with-selected-user' : 'without-selected-user'}`}>
                <Sidebar />
                <ChatContainer />
                <RightSidebar />
            </div>
        </div>
    )
}

export default HomePage