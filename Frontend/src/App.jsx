import './App.css'
// import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home.jsx'
import LoginForm from './components/Login.jsx'
import Signup from './components/Register.jsx'
import Whiteboard from './components/whiteboard.jsx'
import BadCredentials from './components/BadCredentials.jsx'
import Profile from './components/profile.jsx'
import CoinReward from './components/rewardComponent.jsx'
import GroupDashboard from './components/groupdashboard.jsx'
import ChatPage from './components/chatpage.jsx'
import GroupResources from './components/groupResources.jsx'
import TaskForm from './components/taskform.jsx'
import Poll from './components/Poll.jsx'
import VideoChat from './components/videochat'
import ProfileForm from './components/ProfileForm.jsx'
// import JoinMeeting from './components/JoinMeeting.jsx'
function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/invalidinfo' element={<BadCredentials />} />
        <Route path='/group' element={<GroupDashboard />} />
        <Route path='/groupchat' element={<ChatPage />} />
        <Route path='/taskform' element={<TaskForm />} />
        <Route path='/reward' element={<CoinReward />} />
        <Route path='/resources' element={<GroupResources />} />
        <Route path='/poll' element={<Poll />} />
        <Route path='/videochat' element={<VideoChat />} />
        <Route path='/whiteboard' element={<Whiteboard />} />
        <Route path='/createprofile' element={<ProfileForm />} />
        {/* <Route path='/join' element={<JoinMeeting />} /> */}
      </Routes>
    </div>
  )
}

export default App
