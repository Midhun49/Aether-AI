import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import ImageGen from './components/ImageGen';
import VideoGen from './components/VideoGen';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'chat' && <Chat />}
        {activeTab === 'image' && <ImageGen />}
        {activeTab === 'video' && <VideoGen />}
        
        {/* Background Glows */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '500px',
          height: '500px',
          background: 'var(--accent-glow)',
          filter: 'blur(150px)',
          opacity: 0.15,
          zIndex: 0,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '-100px',
          width: '500px',
          height: '500px',
          background: 'var(--accent-glow)',
          filter: 'blur(150px)',
          opacity: 0.1,
          zIndex: 0,
          pointerEvents: 'none'
        }} />
      </main>
    </div>
  );
}

export default App;
