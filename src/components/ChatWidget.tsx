'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/lib/AuthContext';
import api from '@/lib/api';
import { MessageSquare, X, ArrowLeft, Send, Copy, Check, ShieldAlert, Key, HelpCircle } from 'lucide-react';
import styles from './ChatWidget.module.css';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
}

export default function ChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'netflix'>('chat');

  // AI Chat States
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      content: 'Hello! I am your ThickWire support assistant. Ask me anything about our subscription plans, pricing, or billing policies. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Netflix OTP Flow States
  const [netflixStep, setNetflixStep] = useState<number>(0);
  const [gmailInput, setGmailInput] = useState('');
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [copied, setCopied] = useState(false);
  const [usageStats, setUsageStats] = useState<{ today: number; todayLimit: number; month: number; monthLimit: number } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isAiLoading, mode, netflixStep]);

  // Fetch Usage Stats when entering Netflix mode
  const fetchUsageStats = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await api.get('/customer/netflix/usage');
      setUsageStats(data);
    } catch (err) {
      console.error('Failed to load usage stats', err);
    }
  }, [user]);

  // Start Netflix Flow
  const startNetflixFlow = () => {
    if (!user) {
      setNetflixStep(0); // Show Login required message
    } else {
      setNetflixStep(1); // Prompt for Gmail
      fetchUsageStats();
    }
    setMode('netflix');
  };

  // Exit Netflix Flow
  const exitNetflixFlow = () => {
    setMode('chat');
    setOtpError('');
    setOtpCode('');
  };

  // Handle AI Message Submit
  const handleSendMessage = async (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    
    const userText = (textOverride || inputValue).trim();
    if (!userText || isAiLoading) return;

    if (!textOverride) {
      setInputValue('');
    }

    const newMsg: Message = {
      id: Math.random().toString(),
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsAiLoading(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const { data } = await api.post('/chat/message', {
        message: userText,
        history: historyPayload,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: 'bot',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('AI chat failed', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: 'bot',
          content: 'Sorry, I am having trouble connecting to my service. Please contact us on WhatsApp for fast support!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Handle Gmail submission (Netflix Step 1 -> Step 2)
  const handleGmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gmailInput.trim()) return;

    // Transition to instructions page
    setNetflixStep(2);
  };

  // Fetch Netflix Code (Netflix Step 2/4 -> Step 3 -> Step 4)
  const fetchNetflixOtp = async () => {
    setIsOtpLoading(true);
    setOtpError('');
    setOtpCode('');
    setNetflixStep(3);

    try {
      const { data } = await api.post('/customer/netflix/request-code', {
        gmailAddress: gmailInput.trim(),
        codeType: 'signin',
      });

      if (data.found) {
        setOtpCode(data.code);
        setNetflixStep(4);
      } else {
        setOtpError(data.message || 'No sign-in code found in the last 24 hours. Please send the link from Netflix, wait 30 seconds, and try again.');
        setNetflixStep(4);
      }
      fetchUsageStats();
    } catch (err: any) {
      console.error('OTP request failed', err);
      setOtpError(err.response?.data?.message || 'An error occurred while fetching your Netflix code. Please try again.');
      setNetflixStep(4);
      fetchUsageStats();
    } finally {
      setIsOtpLoading(false);
    }
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    if (!otpCode) return;
    navigator.clipboard.writeText(otpCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset/Retry OTP fetch
  const handleRetryOtp = () => {
    fetchNetflixOtp();
  };

  return (
    <div className={styles.widgetContainer}>
      {/* Floating Chat Bubble Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.chatTrigger} ${!isOpen ? styles.pulseBtn : ''} ${isOpen ? styles.chatTriggerActive : ''}`}
        aria-label="Open support chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Main Panel */}
      <div className={`${styles.chatPanel} ${isOpen ? styles.chatPanelOpen : ''}`}>
        
        {/* Dynamic Header */}
        <header className={styles.panelHeader}>
          {mode === 'chat' ? (
            <div className={styles.headerTitle}>
              <MessageSquare size={20} className="text-white" />
              <div>
                <span className={styles.titleText}>ThickWire Support</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <span className={styles.statusDot} />
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Support Online</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.netflixHeader}>
              <button onClick={exitNetflixFlow} className={styles.backButton}>
                <ArrowLeft size={16} /> Back to Chat
              </button>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Key size={16} style={{ color: '#e50914' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Netflix OTP Retrieval</span>
              </div>
            </div>
          )}
          <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
            <X size={18} />
          </button>
        </header>

        {/* Content Area */}
        <div className={styles.messagesContainer}>
          {mode === 'chat' ? (
            /* ─── AI CHAT MODE ─── */
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.messageUser : styles.messageBot}`}
                >
                  <div className={`${styles.bubble} ${msg.role === 'user' ? styles.bubbleUser : styles.bubbleBot}`}>
                    {msg.content}
                  </div>
                  <span className={styles.messageTime}>{msg.timestamp}</span>
                </div>
              ))}

              {isAiLoading && (
                <div className={styles.typingIndicator}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              )}

              {/* Suggestions Chips / Quick Replies */}
              {!isAiLoading && (
                <div className={styles.quickRepliesContainer}>
                  <button onClick={() => handleSendMessage(undefined, 'What are the plans and pricing?')} className={styles.quickReplyChip}>
                    🏷️ Plans & Pricing
                  </button>
                  <button onClick={() => handleSendMessage(undefined, 'How to pay?')} className={styles.quickReplyChip}>
                    💳 How to pay?
                  </button>
                  <button onClick={startNetflixFlow} className={styles.quickReplyChip} style={{ borderColor: '#e50914', color: '#e50914' }}>
                    🍿 Get Netflix Code
                  </button>
                  <button onClick={() => handleSendMessage(undefined, 'I need help with my order')} className={styles.quickReplyChip}>
                    📞 Contact Support
                  </button>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          ) : (
            /* ─── NETFLIX OTP MODE ─── */
            <div className={styles.netflixContainer}>
              
              {/* Step 0: Auth Check */}
              {netflixStep === 0 && (
                <div className={styles.instructionCard} style={{ textAlign: 'center', padding: '24px 16px' }}>
                  <ShieldAlert size={40} style={{ color: '#fbbf24', margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Log In Required</h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
                    You need to be logged in to retrieve your Netflix sign-in code. Please sign in to your ThickWire account first.
                  </p>
                  <a
                    href="/login"
                    className={styles.actionBtn}
                    style={{ textDecoration: 'none', display: 'inline-flex' }}
                  >
                    Go to Login Page
                  </a>
                </div>
              )}

              {/* Step 1: Prompt Gmail address */}
              {netflixStep === 1 && (
                <div className={styles.instructionCard}>
                  <div className={styles.instructionStep}>Step 1 of 3</div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Enter assigned Gmail</h3>
                  <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4, marginBottom: '12px' }}>
                    Please enter the Netflix Gmail address assigned to you by ThickWire (check your order confirmation).
                  </p>
                  <form onSubmit={handleGmailSubmit} className={styles.netflixForm}>
                    <input
                      type="email"
                      required
                      placeholder="netflixacc123@gmail.com"
                      className={styles.textInput}
                      style={{ width: '100%' }}
                      value={gmailInput}
                      onChange={(e) => setGmailInput(e.target.value)}
                    />
                    <button type="submit" className={styles.actionBtn} disabled={!gmailInput.trim()}>
                      Next Step
                    </button>
                  </form>
                </div>
              )}

              {/* Step 2: Instruction on Netflix website */}
              {netflixStep === 2 && (
                <div className={styles.instructionCard}>
                  <div className={styles.instructionStep}>Step 2 of 3</div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Trigger sign-in email</h3>
                  <ol style={{ fontSize: '0.8rem', color: '#475569', paddingLeft: '16px', lineHeight: 1.5, margin: '8px 0 16px' }}>
                    <li style={{ marginBottom: '6px' }}>Go to Netflix app or <strong>netflix.com</strong></li>
                    <li style={{ marginBottom: '6px' }}>Enter the Gmail: <strong>{gmailInput}</strong></li>
                    <li style={{ marginBottom: '6px' }}>Click <strong>Send Sign-in Link</strong> or request code.</li>
                    <li>Return here and click the button below to fetch it.</li>
                  </ol>
                  <button onClick={fetchNetflixOtp} className={styles.actionBtn} style={{ width: '100%' }}>
                    I have sent it — Get my code
                  </button>
                </div>
              )}

              {/* Step 3: Fetching / Reading Inbox */}
              {netflixStep === 3 && (
                <div className={styles.instructionCard} style={{ textAlign: 'center', padding: '32px 16px' }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    border: '3px solid #f1f5f9',
                    borderTop: '3px solid #e50914',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 16px',
                  }} />
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Checking inbox...</h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4 }}>
                    Connecting to mail server and scanning for recent Netflix sign-in emails. This may take 5–15 seconds.
                  </p>
                </div>
              )}

              {/* Step 4: Result Display */}
              {netflixStep === 4 && (
                <div className={styles.instructionCard}>
                  <div className={styles.instructionStep}>Step 3 of 3</div>
                  
                  {otpCode ? (
                    /* Success */
                    <div style={{ textAlign: 'center' }}>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#047857', marginBottom: '12px' }}>Code Found Successfully!</h3>
                      <div className={styles.codeCard}>
                        <div className={styles.codeLabel}>Netflix Sign-in Code</div>
                        <div className={styles.codeValue}>{otpCode}</div>
                        <button onClick={handleCopyCode} className={styles.copyBtn}>
                          {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy to Clipboard</>}
                        </button>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '16px', lineHeight: 1.4 }}>
                        Use this code to sign in on your Netflix device. The code is valid for 10 minutes.
                      </p>
                    </div>
                  ) : (
                    /* Error / No code found */
                    <div>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#b91c1c', marginBottom: '8px' }}>Code Not Found</h3>
                      <div style={{
                        background: '#fef2f2',
                        border: '1px solid #fca5a5',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '0.8rem',
                        color: '#991b1b',
                        lineHeight: 1.5,
                        marginBottom: '16px',
                      }}>
                        {otpError}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => setNetflixStep(2)} className={styles.quickReplyChip} style={{ flex: 1, padding: '10px' }}>
                          ◀ Back
                        </button>
                        <button onClick={handleRetryOtp} className={styles.actionBtn} style={{ flex: 2, padding: '10px' }}>
                          🔄 Retry Fetch
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Rate limit usage bar */}
              {user && usageStats && (
                <div className={styles.usageMeter}>
                  <span>Today: {usageStats.today} / {usageStats.todayLimit} codes</span>
                  <span>Month: {usageStats.month} / {usageStats.monthLimit} codes</span>
                </div>
              )}
              
            </div>
          )}
        </div>

        {/* Input Footer for Chat Mode */}
        {mode === 'chat' && (
          <form onSubmit={handleSendMessage} className={styles.inputPanel}>
            <input
              type="text"
              placeholder="Type your message here..."
              className={styles.textInput}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isAiLoading}
            />
            <button type="submit" className={styles.sendBtn} disabled={!inputValue.trim() || isAiLoading}>
              <Send size={16} />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
