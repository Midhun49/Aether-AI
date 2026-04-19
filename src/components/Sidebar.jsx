import React from 'react';
import { MessageSquare, Image, Video, Settings, User, PlusCircle, Zap } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'image', icon: Image, label: 'Generate Image' },
    { id: 'video', icon: Video, label: 'Generate Video' },
  ];

  return (
    <div className="glass" style={{
      width: '260px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      borderRight: '1px solid var(--border-subtle)',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', padding: '0 10px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Zap size={20} color="white" fill="white" />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}>AETHER AI</h2>
      </div>

      <button className="glass-card" style={{
        width: '100%',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        marginBottom: '30px',
        border: '1px dashed var(--border-subtle)',
        background: 'transparent'
      }}>
        <PlusCircle size={18} />
        <span style={{ fontWeight: '500' }}>New Session</span>
      </button>

      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', paddingLeft: '10px' }}>Capabilities</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              width: '100%',
              padding: '12px 15px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: activeTab === item.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              border: 'none',
              borderRadius: '12px',
              color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              marginBottom: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <item.icon size={20} />
            <span style={{ fontWeight: '500' }}>{item.label}</span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
        <button style={{
          width: '100%',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          borderRadius: '8px'
        }}>
          <User size={20} />
          <span>Profile</span>
        </button>
        <button style={{
          width: '100%',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          borderRadius: '8px'
        }}>
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
