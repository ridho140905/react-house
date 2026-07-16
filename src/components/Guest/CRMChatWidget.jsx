import React, { useState, useEffect, useRef } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';

const CRMChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const { user, profile } = useAuth();
  
  const [sessionEmail, setSessionEmail] = useState('');
  const [sessionName, setSessionName] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const updateSession = () => {
      if (user) {
        setSessionEmail(user.email);
        setSessionName(profile?.full_name || user.user_metadata?.full_name || 'Member');
      } else {
        let savedEmail = localStorage.getItem('guest_chat_email');
        if (!savedEmail) {
          savedEmail = `guest_${Math.floor(Math.random() * 100000)}@guest.furnitureq.com`;
          localStorage.setItem('guest_chat_email', savedEmail);
        }
        setSessionEmail(savedEmail);
        setSessionName('Guest Visitor');
      }
    };

    updateSession();
    
    // Dengarkan perubahan dari form Contact Us
    window.addEventListener('chatEmailUpdated', updateSession);
    return () => window.removeEventListener('chatEmailUpdated', updateSession);
  }, [user, profile]);

  useEffect(() => {
    if (!sessionEmail) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('email', sessionEmail)
        .order('created_at', { ascending: true });
        
      if (!error && data) {
        setMessages(data);
      }
    };
    
    fetchMessages();

    const channel = supabase
      .channel(`chat_widget_${sessionEmail}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `email=eq.${sessionEmail}`
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionEmail]);

  useEffect(() => {
    // Auto scroll ke bawah saat pesan baru masuk
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!messageText.trim() || !sessionEmail) return;
    
    const textToSend = messageText;
    setMessageText("");
    
    try {
      const { data, error } = await supabase.from('messages').insert([
        {
          name: sessionName,
          email: sessionEmail,
          message: textToSend,
          sender: 'user'
        }
      ]).select();
      
      if (error) throw error;

      if (data && data.length > 0) {
        setMessages(prev => {
          if (prev.find(m => m.id === data[0].id)) return prev;
          return [...prev, data[0]];
        });
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Gagal mengirim pesan.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Box */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 mb-4 overflow-hidden flex flex-col h-96 transition-all duration-300 transform origin-bottom-right">
          {/* Header */}
          <div className="p-4 flex justify-between items-center text-white" style={{ backgroundColor: '#4F45B6' }}>
            <div>
              <h4 className="font-bold">Customer Support</h4>
              <p className="text-xs text-[#E0DDF7]">Kami siap membantu (Online)</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-[#3c348f] p-1 rounded-lg transition-colors">
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 p-4 bg-gray-50 overflow-y-auto flex flex-col space-y-3">
            <div className="bg-[#F4F2FF] text-[#3c348f] p-3 rounded-xl rounded-tl-none self-start max-w-[85%] text-sm">
              Halo! Ada yang bisa kami bantu terkait pesanan atau produk FurnitureQ? 😊
            </div>
            
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`p-3 rounded-xl max-w-[85%] text-sm shadow-sm ${
                  msg.sender === 'user' 
                    ? "bg-white border border-gray-200 text-gray-800 rounded-tr-none self-end" 
                    : "bg-[#F4F2FF] text-[#3c348f] rounded-tl-none self-start"
                }`}
              >
                {msg.message}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
            <input 
              type="text" 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ketik pesan..." 
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#4F45B6] focus:ring-1 focus:ring-[#4F45B6] transition-all"
            />
            <button 
              onClick={handleSend}
              className="text-white p-2.5 rounded-xl transition-colors hover:bg-[#3c348f]" 
              style={{ backgroundColor: '#4F45B6' }}
            >
              <FiSend className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-gray-800 hover:bg-gray-900' : 'hover:opacity-90'} text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
        style={{ backgroundColor: isOpen ? '' : '#4F45B6' }}
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default CRMChatWidget;
