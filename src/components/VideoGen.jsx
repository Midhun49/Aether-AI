import React, { useState } from 'react';
import { Play, Video as VideoIcon, Wand2, Download, Loader2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoGen = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    // Simulate generation
    setTimeout(() => {
      // Mock video generation
      setVideoUrl("https://www.w3schools.com/html/mov_bbb.mp4");
      setIsGenerating(false);
    }, 5000);
  };

  return (
    <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Video Studio</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Animate your imagination. Generate cinematic video clips from text.</p>
          </div>
          <div className="glass" style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '12px', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={14} /> Beta Feature
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-card" style={{ padding: '24px', position: 'relative', minHeight: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {isGenerating ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 20px' }}>
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    style={{ position: 'absolute', inset: 0, border: '4px solid rgba(59,130,246,0.1)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loader2 size={32} color="var(--accent-primary)" />
                  </div>
                </div>
                <p style={{ fontSize: '18px', fontWeight: '500' }}>Rendering frames...</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '5px' }}>This usually takes 30-60 seconds</p>
              </div>
            ) : videoUrl ? (
              <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden' }}>
                <video src={videoUrl} controls autoPlay loop style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <VideoIcon size={40} style={{ opacity: 0.5 }} />
                </div>
                <p style={{ fontSize: '16px' }}>Ready to create your first clip</p>
              </div>
            )}
          </div>

          <div className="glass-card" style={{ padding: '30px' }}>
            <h4 style={{ marginBottom: '15px' }}>Scene Description</h4>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the action, camera movement, and lighting..."
                  style={{
                    width: '100%',
                    height: '100px',
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    color: 'white',
                    padding: '15px',
                    fontSize: '15px',
                    resize: 'none',
                    outline: 'none',
                  }}
                />
              </div>
              <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px',
                    background: 'var(--accent-primary)',
                    border: 'none',
                    color: 'white',
                    fontWeight: '600',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: (isGenerating || !prompt.trim()) ? 'not-allowed' : 'pointer',
                    opacity: (isGenerating || !prompt.trim()) ? 0.6 : 1,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Wand2 size={24} />
                  <span>Generate Clip</span>
                </button>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '24px' }}>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Motion</p>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-6px', left: '60%', width: '16px', height: '16px', background: 'var(--accent-primary)', borderRadius: '50%', border: '3px solid var(--bg-card)' }} />
                </div>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Duration</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['4s', '8s', '12s'].map(d => (
                    <button key={d} style={{ flex: 1, padding: '4px', background: d === '4s' ? 'rgba(59,130,246,0.2)' : 'transparent', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: 'white', fontSize: '11px' }}>{d}</button>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Style</p>
                <select style={{ width: '100%', padding: '6px', background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: 'white', fontSize: '11px' }}>
                  <option>Cinematic</option>
                  <option>Anime</option>
                  <option>3D Render</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGen;
