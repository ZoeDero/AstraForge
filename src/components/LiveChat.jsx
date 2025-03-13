import React, { useState, useEffect, useRef } from 'react';

/**
 * Composant LiveChat - Widget de chat en direct pour communiquer avec les visiteurs
 * @returns {JSX.Element} - Widget de chat flottant
 */
const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'agent', 
      text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?', 
      timestamp: new Date() 
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [isUserInfoSubmitted, setIsUserInfoSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Faire défiler automatiquement vers le bas lorsque de nouveaux messages arrivent
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Simuler une réponse automatique
  const simulateResponse = (userMessage) => {
    setIsTyping(true);
    
    // Réponses automatiques basées sur le contenu du message
    let responseText = '';
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Délai aléatoire pour simuler la frappe
    const typingDelay = Math.floor(Math.random() * 1500) + 1000;
    
    setTimeout(() => {
      if (lowerCaseMessage.includes('bonjour') || lowerCaseMessage.includes('salut') || lowerCaseMessage.includes('hello')) {
        responseText = 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?';
      } else if (lowerCaseMessage.includes('tarif') || lowerCaseMessage.includes('prix') || lowerCaseMessage.includes('coût')) {
        responseText = 'Nos tarifs varient selon les projets. Pourriez-vous me donner plus de détails sur votre besoin pour que je puisse vous fournir une estimation ?';
      } else if (lowerCaseMessage.includes('délai') || lowerCaseMessage.includes('temps') || lowerCaseMessage.includes('durée')) {
        responseText = 'Les délais dépendent de la complexité du projet. En général, un site vitrine prend 2-3 semaines, et un projet plus complexe 1-3 mois. Avez-vous une date limite en tête ?';
      } else if (lowerCaseMessage.includes('rendez-vous') || lowerCaseMessage.includes('rdv') || lowerCaseMessage.includes('rencontre')) {
        responseText = 'Vous pouvez réserver une consultation via notre formulaire de réservation. Souhaitez-vous que je vous y dirige ?';
      } else if (lowerCaseMessage.includes('merci')) {
        responseText = 'Je vous en prie ! N\'hésitez pas si vous avez d\'autres questions.';
      } else {
        responseText = 'Merci pour votre message. Un membre de notre équipe vous contactera dans les plus brefs délais. Puis-je vous aider avec autre chose en attendant ?';
      }
      
      addMessage('agent', responseText);
      setIsTyping(false);
    }, typingDelay);
  };

  // Ajouter un nouveau message
  const addMessage = (sender, text) => {
    const newMsg = {
      id: messages.length + 1,
      sender,
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // Gérer l'envoi d'un message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    addMessage('user', newMessage);
    simulateResponse(newMessage);
    setNewMessage('');
  };

  // Gérer la soumission des informations utilisateur
  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    
    if (!userInfo.name || !userInfo.email) return;
    
    setIsUserInfoSubmitted(true);
    addMessage('system', `Merci ${userInfo.name}. Un conseiller va vous répondre rapidement.`);
  };

  // Formater l'heure
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Bouton de chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
        aria-label="Chat en direct"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
      
      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out">
          {/* En-tête */}
          <div className="bg-indigo-600 dark:bg-indigo-700 p-4 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-800 flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Support AstraForge</p>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-400 mr-1"></div>
                    <p className="text-xs">En ligne</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Corps du chat */}
          <div className="flex flex-col h-96">
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.sender === 'user'
                      ? 'flex justify-end'
                      : 'flex justify-start'
                  }`}
                >
                  {message.sender === 'agent' && (
                    <div className="flex-shrink-0 mr-2">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <svg className="h-4 w-4 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={`max-w-xs sm:max-w-sm px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : message.sender === 'system'
                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs text-right mt-1 opacity-75">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 ml-2">
                      <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                        <svg className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Indicateur de frappe */}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="flex-shrink-0 mr-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <svg className="h-4 w-4 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Formulaire d'information utilisateur ou formulaire de message */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
              {!isUserInfoSubmitted ? (
                <form onSubmit={handleUserInfoSubmit} className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Veuillez fournir vos informations pour commencer la conversation
                  </p>
                  <div>
                    <input
                      type="text"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                      placeholder="Votre nom"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                      placeholder="Votre email"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Commencer la conversation
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tapez votre message..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
