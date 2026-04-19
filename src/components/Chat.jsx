import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Sparkles, ShieldCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am Aether AI. I can help you with questions, analysis, or generating creative content. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Mock User Details for Analysis
  const userDetails = {
    name: "Alex",
    preferences: ["dark mode", "efficiency", "creative storytelling"],
    recentInterests: ["AI ethics", "Space exploration", "Cyberpunk aesthetics"]
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response with user detail analysis
    setTimeout(() => {
      let response = "";
      if (input.toLowerCase().includes("who am i")) {
        response = `Based on my analysis of your profile, you are **${userDetails.name}**. You have a strong preference for **${userDetails.preferences.join(", ")}**. Your recent interactions show a deep interest in **${userDetails.recentInterests.join(" and ")}**.`;
      } else if (input.toLowerCase().includes("moderation") || input.toLowerCase().includes("adult")) {
        response = "I operate with standard safety protocols to ensure a productive and safe environment for all users. I cannot generate content that violates these safety guidelines.";
      } else {
        response = `That's an interesting topic! Considering your interest in ${userDetails.recentInterests[1]}, I think you'd find it fascinating how AI is evolving in that space. Would you like me to dive deeper into that?`;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <div style={{ 
        padding: '20px 40px', 
        borderBottom: '1px solid var(--border-subtle)', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(9, 9, 11, 0.5)',
        backdropFilter: 'blur(8px)'
      }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Conversation</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Powered by Aether-Core v2.4</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="glass" style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
            <ShieldCheck size={14} /> Safe Mode Active
          </div>
        </div>
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex',
                gap: '16px',
                maxWidth: '850px',
                margin: msg.role === 'user' ? '0 0 0 auto' : '0',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: msg.role === 'user' ? 'var(--bg-card)' : 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '4px'
              }}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} color="white" />}
              </div>
              <div style={{
                background: msg.role === 'user' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                padding: msg.role === 'user' ? '12px 20px' : '0',
                borderRadius: '16px',
                color: 'var(--text-primary)',
                lineHeight: '1.6',
                fontSize: '15px'
              }}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={20} color="white" />
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)' }} />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)' }} />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)' }} />
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '20px 40px 40px', background: 'transparent' }}>
        <div className="glass" style={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          borderRadius: '24px', 
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          <div style={{ padding: '0 8px', color: 'var(--accent-primary)' }}>
            <Sparkles size={20} />
          </div>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Aether anything..." 
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '15px',
              padding: '12px 0'
            }}
          />
          <button 
            onClick={handleSend}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '16px',
              background: 'var(--accent-primary)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Send size={18} />
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '15px' }}>
          Aether AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
};

export default Chat;
