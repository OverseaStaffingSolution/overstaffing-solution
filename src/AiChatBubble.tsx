import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { 
  MessageSquare, X, Send, Key, Check, Info, AlertCircle, HelpCircle, RefreshCw
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

function MessageTextRenderer({ text, isUser }: { text: string; isUser: boolean }) {
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 text-xs font-sans">
      {lines.map((line, lineIdx) => {
        const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ');
        let cleanLine = line;
        if (isBullet) {
          cleanLine = line.replace(/^[\s*-]+/, '');
        }

        const parseLineContent = (str: string) => {
          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
          const parts: React.ReactNode[] = [];
          let lastIndex = 0;
          let match;

          while ((match = linkRegex.exec(str)) !== null) {
            const [fullMatch, label, url] = match;
            const matchIndex = match.index;

            if (matchIndex > lastIndex) {
              parts.push(...parseBold(str.substring(lastIndex, matchIndex)));
            }

            const isExternal = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:');
            const linkId = `chat-link-${lineIdx}-${matchIndex}`;
            
            if (isExternal) {
              parts.push(
                <a
                  id={linkId}
                  key={matchIndex}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    isUser
                      ? "text-indigo-100 hover:text-white font-semibold underline underline-offset-2 mx-0.5"
                      : "text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2 mx-0.5"
                  }
                >
                  {label}
                </a>
              );
            } else {
              parts.push(
                <Link
                  id={linkId}
                  key={matchIndex}
                  to={url}
                  className={
                    isUser
                      ? "text-indigo-100 hover:text-white font-semibold underline underline-offset-2 mx-0.5"
                      : "text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2 mx-0.5"
                  }
                >
                  {label}
                </Link>
              );
            }

            lastIndex = linkRegex.lastIndex;
          }

          if (lastIndex < str.length) {
            parts.push(...parseBold(str.substring(lastIndex)));
          }

          return parts.length > 0 ? parts : [str];
        };

        const parseBold = (chunk: string): React.ReactNode[] => {
          const boldRegex = /\*\*([^*]+)\*\*/g;
          const boldParts: React.ReactNode[] = [];
          let lastIdx = 0;
          let bMatch;

          while ((bMatch = boldRegex.exec(chunk)) !== null) {
            const [fullBMatch, boldText] = bMatch;
            const bIndex = bMatch.index;

            if (bIndex > lastIdx) {
              boldParts.push(chunk.substring(lastIdx, bIndex));
            }

            boldParts.push(
              <strong 
                key={`bold-${bIndex}`} 
                className={isUser ? "font-bold text-white" : "font-bold text-slate-900"}
              >
                {boldText}
              </strong>
            );

            lastIdx = boldRegex.lastIndex;
          }

          if (lastIdx < chunk.length) {
            boldParts.push(chunk.substring(lastIdx));
          }

          return boldParts;
        };

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex items-start space-x-1.5 ml-1">
              <span className={isUser ? "text-indigo-200 mt-1 font-bold select-none" : "text-indigo-500 mt-1 font-bold select-none"}>•</span>
              <span className={isUser ? "flex-1 text-white leading-relaxed" : "flex-1 text-slate-700 leading-relaxed"}>
                {parseLineContent(cleanLine)}
              </span>
            </div>
          );
        }

        return (
          <p 
            key={lineIdx} 
            className={`${isUser ? "text-white" : "text-slate-700"} leading-relaxed min-h-[1em]`}
          >
            {parseLineContent(cleanLine)}
          </p>
        );
      })}
    </div>
  );
}

export default function AiChatBubble() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('oss_chat_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Persist messages in session
  useEffect(() => {
    sessionStorage.setItem('oss_chat_history', JSON.stringify(messages));
  }, [messages]);

  // Localized strings
  const localized = {
    EN: {
      welcomeTitle: "OSS Assistant",
      welcomeSubtitle: "Bilingual AI Expert",
      statusOnline: "Online",
      placeholder: "Ask about our services, careers, offices...",
      clearChat: "Clear Conversation",
      suggestHeader: "Suggested Questions:",
      errNoApi: "Could not communicate with the AI server. Please make sure the server is configured properly.",
      suggestions: [
        "What services does OSS offer?",
        "How can OSS reduce our operational costs?",
        "Are there any job openings?",
        "Where are your office locations?"
      ]
    },
    FR: {
      welcomeTitle: "Assistant OSS",
      welcomeSubtitle: "Expert IA bilingue",
      statusOnline: "En ligne",
      placeholder: "Posez vos questions sur nos services, carrières, bureaux...",
      clearChat: "Effacer la conversation",
      suggestHeader: "Questions suggérées :",
      errNoApi: "Impossible de communiquer avec le serveur IA. Veuillez vérifier la configuration de l'application.",
      suggestions: [
        "Quels services propose OSS ?",
        "Comment OSS peut-elle réduire nos coûts opérationnels ?",
        "Y a-t-il des postes disponibles ?",
        "Où sont situés vos bureaux ?"
      ]
    }
  }[language] || {
    welcomeTitle: "OSS Assistant",
    welcomeSubtitle: "Bilingual AI Expert",
    statusOnline: "Online",
    placeholder: "Ask about our services, careers, offices...",
    clearChat: "Clear Conversation",
    suggestHeader: "Suggested Questions:",
    errNoApi: "Could not communicate with the AI server. Please make sure the server is configured properly.",
    suggestions: [
      "What services does OSS offer?",
      "How can OSS reduce our operational costs?",
      "Are there any job openings?",
      "Where are your office locations?"
    ]
  };

  const handleClearHistory = () => {
    setMessages([]);
    sessionStorage.removeItem('oss_chat_history');
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Append user message
    const userMsg: ChatMessage = {
      role: 'user',
      parts: [{ text: text.trim() }]
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // API call to Express backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text.trim(),
          history: messages, // Send history for multi-turn chat context
        }),
      });

      const data = await response.json();

      if (response.ok && data.text) {
        setMessages([...updatedMessages, {
          role: 'model',
          parts: [{ text: data.text }]
        }]);
      } else {
        // Display clear error from server
        setMessages([...updatedMessages, {
          role: 'model',
          parts: [{ text: `⚠️ Error: ${data.error || localized.errNoApi}` }]
        }]);
      }
    } catch (error) {
      console.error("Failed to fetch chat response:", error);
      setMessages([...updatedMessages, {
        role: 'model',
        parts: [{ text: `⚠️ ${localized.errNoApi}` }]
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          id="oss-ai-chat-trigger"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-colors relative group"
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6 h-6" />
          )}
          
          {/* Subtle label on hover */}
          {!isOpen && (
            <span className="absolute right-14 bg-gray-900 text-white text-xs py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
              {localized.welcomeTitle}
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="oss-ai-chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 w-auto sm:w-[400px] h-[480px] sm:h-[550px] max-h-[70vh] sm:max-h-[600px] bg-white rounded-2xl shadow-3xl flex flex-col z-50 border border-slate-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-indigo-600 text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-lg text-white border border-white/20">
                  OS
                </div>
                <div>
                  <h3 className="font-semibold text-sm tracking-tight">{localized.welcomeTitle}</h3>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-indigo-100 font-medium">{localized.welcomeSubtitle}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Clear Conversation Button (only visible if there are messages) */}
                {messages.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="p-2 rounded-lg hover:bg-white/10 text-indigo-100 hover:text-white transition-colors cursor-pointer"
                    title={localized.clearChat}
                  >
                    <RefreshCw className="w-4.5 h-4.5" />
                  </button>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-indigo-100 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Main Window Body */}
            <div className="flex-1 flex flex-col overflow-hidden relative bg-slate-50">
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  // Welcome state with suggestions
                  <div className="h-full flex flex-col justify-center items-center text-center px-4 space-y-6">
                    <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <HelpCircle className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-base">
                        {language === 'EN' ? "How can I help you today?" : "Comment puis-je vous aider aujourd'hui ?"}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs">
                        {language === 'EN' 
                          ? "I can assist you with call center solutions, recruitment opportunities, and company information." 
                          : "Je peux vous aider concernant nos solutions de centre d'appels, nos recrutements et nos informations."}
                      </p>
                    </div>

                    <div className="w-full text-left space-y-2 max-w-sm pt-2">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        {localized.suggestHeader}
                      </p>
                      {localized.suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(s)}
                          className="w-full text-left text-xs bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200/80 hover:border-indigo-200 p-2.5 rounded-xl shadow-sm transition-all cursor-pointer duration-150"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Render messages */}
                    {messages.map((m, idx) => {
                      const isUser = m.role === 'user';
                      return (
                        <div
                          key={idx}
                          className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                              isUser
                                ? 'bg-indigo-600 text-white rounded-br-none'
                                : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                            }`}
                          >
                            <MessageTextRenderer text={m.parts[0].text} isUser={isUser} />
                          </div>
                        </div>
                      );
                    })}

                    {/* Loading/Typing Indicator */}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar */}
              <div className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSend(inputValue);
                    }
                  }}
                  placeholder={localized.placeholder}
                  disabled={isLoading}
                  className="flex-1 bg-slate-50 text-slate-800 border border-slate-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl shadow-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
