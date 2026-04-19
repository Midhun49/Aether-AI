import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Wand2, Download, RefreshCw, AlertCircle, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageGen = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [referenceImage, setReferenceImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4 style={{ margin: 0 }}>Reference Image</h4>
                {referenceImage && (
                  <button 
                    onClick={() => setReferenceImage(null)}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                  >
                    <X size={14} /> Remove
                  </button>
                )}
              </div>
              
              {!referenceImage ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    width: '100%',
                    height: '100px',
                    border: '1px dashed var(--border-subtle)',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.02)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                >
                  <Upload size={24} style={{ marginBottom: '8px', opacity: 0.5 }} />
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Click to upload reference</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                  />
                </div>
              ) : (
                <div style={{ position: 'relative', width: '100%', height: '100px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--accent-primary)' }}>
                  <img src={referenceImage} alt="Reference" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)', display: 'flex', alignItems: 'flex-end', padding: '8px' }}>
                    <p style={{ fontSize: '10px', color: 'white' }}>Image-to-Image Mode Active</p>
                  </div>
                </div>
              )}
            </div>

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
