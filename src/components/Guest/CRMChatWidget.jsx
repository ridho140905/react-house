import React, { useState } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

const CRMChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-xl rounded-tr-none self-end max-w-[85%] text-sm shadow-sm">
              Saya ingin bertanya tentang garansi sofa Nordic.
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
            <input 
              type="text" 
              placeholder="Ketik pesan..." 
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#4F45B6] focus:ring-1 focus:ring-[#4F45B6] transition-all"
            />
            <button className="text-white p-2.5 rounded-xl transition-colors" style={{ backgroundColor: '#4F45B6' }}>
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
