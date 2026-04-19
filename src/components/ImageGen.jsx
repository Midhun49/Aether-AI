import React, { useState } from 'react';
import { Image as ImageIcon, Wand2, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ImageGen = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    // Simulate generation
    setTimeout(() => {
      // For demonstration, we'll use a placeholder or a random image
      setGeneratedImage(`https://picsum.photos/seed/${Math.random()}/1024/1024`);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Image Studio</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Transform your ideas into stunning visuals with Aether's creative engine.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '24px', position: 'relative', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {isGenerating ? (
                <div style={{ textAlign: 'center' }}>
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    style={{ marginBottom: '20px' }}
                  >
                    <RefreshCw size={48} color="var(--accent-primary)" />
                  </motion.div>
                  <p>Dreaming up your visual...</p>
                </div>
              ) : generatedImage ? (
                <motion.img 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  src={generatedImage} 
                  alt="Generated" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                />
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <ImageIcon size={64} style={{ marginBottom: '20px', opacity: 0.5 }} />
                  <p>Enter a prompt to generate an image</p>
                </div>
              )}
            </div>

            <div className="glass" style={{ padding: '20px', borderRadius: '20px', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
              <AlertCircle size={20} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                <strong>Prompt Engineering Tip:</strong> Be descriptive! Instead of "a car", try "a sleek futuristic electric sports car speeding through a neon-lit cyberpunk city at night, 8k resolution, cinematic lighting."
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ marginBottom: '15px' }}>Prompt</h4>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to see..."
                style={{
                  width: '100%',
                  height: '150px',
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  color: 'white',
                  padding: '15px',
                  fontSize: '14px',
                  resize: 'none',
                  outline: 'none',
                  marginBottom: '20px'
                }}
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '12px',
                  background: 'var(--accent-primary)',
                  border: 'none',
                  color: 'white',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: (isGenerating || !prompt.trim()) ? 'not-allowed' : 'pointer',
                  opacity: (isGenerating || !prompt.trim()) ? 0.6 : 1
                }}
              >
                <Wand2 size={20} />
                {isGenerating ? 'Generating...' : 'Generate Image'}
              </button>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ marginBottom: '15px' }}>Model Settings</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Aspect Ratio</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {['1:1', '4:3', '16:9'].map(ratio => (
                      <button key={ratio} style={{ flex: 1, padding: '8px', background: ratio === '1:1' ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${ratio === '1:1' ? 'var(--accent-primary)' : 'var(--border-subtle)'}`, borderRadius: '8px', color: 'white', fontSize: '12px' }}>{ratio}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Quality</p>
                  <select style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'white' }}>
                    <option>Standard</option>
                    <option>HD (High Definition)</option>
                    <option>Ultra (4K Optimized)</option>
                  </select>
                </div>
              </div>
            </div>

            {generatedImage && (
              <button style={{
                width: '100%',
                padding: '15px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'white',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}>
                <Download size={20} />
                Download Image
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGen;
