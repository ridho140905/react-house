import { useState, useEffect, useRef, useMemo } from "react";
import PageHeader from "../components/Page.Header";
import { FaPaperPlane, FaSearch } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

export default function Chat() {
  const [activeChat, setActiveChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      setMessages(data || []);
      
      // Jika belum ada chat yang aktif dan ada pesan, set chat pertama sebagai aktif
      if (!activeChat && data && data.length > 0) {
        const firstEmail = data[data.length - 1].email; // Ambil pesan terbaru
        setActiveChat(firstEmail);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeChat]);

  const handleSendMessage = async () => {
    if (messageText.trim() === "" || !activeChat) return;
    
    const textToSend = messageText;
    setMessageText(""); // Optimistic reset
    
    try {
      const { data, error } = await supabase.from('messages').insert([
        {
          email: activeChat,
          name: 'Admin',
          message: textToSend,
          sender: 'admin'
        }
      ]).select();
      
      if (error) throw error;

      // Tambahkan langsung ke state agar instan, berjaga-jaga jika Supabase realtime belum diaktifkan
      if (data && data.length > 0) {
        setMessages(prev => {
          if (prev.find(m => m.id === data[0].id)) return prev;
          return [...prev, data[0]];
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Gagal mengirim pesan.");
    }
  };

  // Mengelompokkan pesan berdasarkan email
  const chatList = useMemo(() => {
    const grouped = {};
    messages.forEach(msg => {
      const email = msg.email;
      if (!grouped[email]) {
        grouped[email] = {
          email: email,
          name: msg.name || 'Unknown',
          time: new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          lastMsg: msg.message,
          timestamp: new Date(msg.created_at).getTime(),
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.name || email)}&background=F4F2FF&color=4F45B6`
        };
      } else {
        if (new Date(msg.created_at).getTime() > grouped[email].timestamp) {
          grouped[email].lastMsg = msg.message;
          grouped[email].time = new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          grouped[email].timestamp = new Date(msg.created_at).getTime();
          if (msg.sender === 'user' && msg.name) {
             grouped[email].name = msg.name;
          }
        }
      }
    });
    return Object.values(grouped).sort((a,b) => b.timestamp - a.timestamp);
  }, [messages]);

  const currentMessages = messages.filter(msg => msg.email === activeChat);

  return (
    <div>
      <PageHeader title="Chat" breadcrumb={["Chat"]} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[72vh]">
        {/* Kolom Kiri: Daftar Kontak */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex flex-col">
          <div className="relative mb-4">
            <input 
              type="text" 
              placeholder="Search messages..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-purple-500" 
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2">
            {isLoading ? (
              <div className="text-center text-sm text-gray-400 mt-4">Loading chats...</div>
            ) : chatList.length === 0 ? (
              <div className="text-center text-sm text-gray-400 mt-4">Belum ada pesan masuk.</div>
            ) : chatList.map((item) => (
              <div 
                key={item.email}
                onClick={() => setActiveChat(item.email)}
                className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all ${
                  activeChat === item.email ? "bg-purple-50 border border-purple-200" : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                <img src={item.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-gray-100 object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-sm font-semibold text-gray-800 truncate">{item.name}</h4>
                    <span className="text-[10px] text-gray-400">{item.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{item.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Ruang Obrolan */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex flex-col justify-between h-full">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-50">
                <img 
                  src={chatList.find(c => c.email === activeChat)?.avatar || ""} 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full object-cover bg-gray-100" 
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {chatList.find(c => c.email === activeChat)?.name}
                  </h3>
                  <span className="text-xs text-green-500 font-medium">Online</span>
                </div>
              </div>

              {/* Chat Bubbles Area */}
              <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-2">
                {currentMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                    <div className={`p-3 rounded-2xl max-w-xs md:max-w-md text-sm shadow-sm ${
                      msg.sender === "admin" 
                        ? "bg-purple-600 text-white" 
                        : "bg-gray-50 text-gray-800 border border-gray-100"
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-50">
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="Ketik balasan..." 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-purple-500"
                />
                <button 
                  onClick={handleSendMessage}
                  className="p-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-sm"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Pilih kontak untuk memulai obrolan
            </div>
          )}
        </div>
      </div>
    </div>
  );
}