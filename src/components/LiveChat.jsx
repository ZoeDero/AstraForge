import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/cosmic-forge-theme.css';
import '../styles/animations.css';

/**
 * Composant LiveChat - Widget de chat en direct avec IA pour communiquer avec les visiteurs
 * @returns {JSX.Element} - Widget de chat flottant
 */
const LiveChat = () => {
  const { t, i18n } = useTranslation(undefined, { useSuspense: false });
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'agent', 
      text: t('livechat.greeting'), 
      timestamp: new Date() 
    },
    {
      id: 2,
      sender: 'system',
      text: t('livechat.systemMessage'),
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [conversationHistory, setConversationHistory] = useState([
    { role: "system", content: "Tu es un assistant virtuel pour AstraForge, un studio de design et développement web. Tu dois être amical, professionnel et utile. Tu peux répondre aux questions sur les services, les tarifs, les délais et aider les visiteurs à comprendre ce que nous proposons. Si on te demande des informations très spécifiques que tu ne connais pas, propose de mettre le visiteur en contact avec un conseiller humain." },
    { role: "assistant", content: t('livechat.greeting') }
  ]);

  // Mettre à jour les messages initiaux lorsque la langue change
  useEffect(() => {
    setMessages([
      { 
        id: 1, 
        sender: 'agent', 
        text: t('livechat.greeting'), 
        timestamp: new Date() 
      },
      {
        id: 2,
        sender: 'system',
        text: t('livechat.systemMessage'),
        timestamp: new Date()
      }
    ]);
    
    setConversationHistory([
      { role: "system", content: "Tu es un assistant virtuel pour AstraForge, un studio de design et développement web. Tu dois être amical, professionnel et utile. Tu peux répondre aux questions sur les services, les tarifs, les délais et aider les visiteurs à comprendre ce que nous proposons. Si on te demande des informations très spécifiques que tu ne connais pas, propose de mettre le visiteur en contact avec un conseiller humain." },
      { role: "assistant", content: t('livechat.greeting') }
    ]);
  }, [i18n.language, t]);

  // Faire défiler automatiquement vers le bas lorsque de nouveaux messages arrivent
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Animation d'ouverture du chat
  useEffect(() => {
    if (isOpen) {
      document.querySelector('.cosmic-chat-container').classList.add('slide-up');
    }
  }, [isOpen]);

  // Fonction pour obtenir une réponse de l'IA
  const getAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    try {
      // Mettre à jour l'historique de conversation avec le message de l'utilisateur
      const updatedHistory = [...conversationHistory, { role: "user", content: userMessage }];
      setConversationHistory(updatedHistory);
      
      // En production, vous utiliseriez l'API OpenAI ici
      // Pour l'instant, nous simulons une réponse intelligente
      
      // Simuler un délai de réponse
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 1000));
      
      // Générer une réponse basée sur le contexte
      let responseText = '';
      const lowerCaseMessage = userMessage.toLowerCase();
      
      if (lowerCaseMessage.includes('bonjour') || lowerCaseMessage.includes('salut') || lowerCaseMessage.includes('hello')) {
        responseText = t('livechat.responses.greeting');
      } else if (lowerCaseMessage.includes('tarif') || lowerCaseMessage.includes('prix') || lowerCaseMessage.includes('coût')) {
        responseText = t('livechat.responses.pricing');
      } else if (lowerCaseMessage.includes('délai') || lowerCaseMessage.includes('temps') || lowerCaseMessage.includes('durée')) {
        responseText = t('livechat.responses.timeline');
      } else if (lowerCaseMessage.includes('service') || lowerCaseMessage.includes('prestation')) {
        responseText = t('livechat.responses.services');
      } else if (lowerCaseMessage.includes('portfolio') || lowerCaseMessage.includes('exemple') || lowerCaseMessage.includes('travaux')) {
        responseText = t('livechat.responses.portfolio');
      } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('rendez-vous') || lowerCaseMessage.includes('rdv')) {
        responseText = t('livechat.responses.contact');
      } else if (lowerCaseMessage.includes('merci')) {
        responseText = t('livechat.responses.thanks');
      } else if (lowerCaseMessage.includes('technologie') || lowerCaseMessage.includes('stack') || lowerCaseMessage.includes('framework')) {
        responseText = t('livechat.responses.technology');
      } else if (lowerCaseMessage.includes('processus') || lowerCaseMessage.includes('étape') || lowerCaseMessage.includes('déroulement')) {
        responseText = t('livechat.responses.process');
      } else if (lowerCaseMessage.includes('humain') || lowerCaseMessage.includes('personne') || lowerCaseMessage.includes('conseiller')) {
        responseText = t('livechat.responses.human');
      } else if (lowerCaseMessage.includes('ia') || lowerCaseMessage.includes('intelligence artificielle') || lowerCaseMessage.includes('robot')) {
        responseText = t('livechat.responses.ai');
      } else {
        responseText = t('livechat.responses.default');
      }
      
      // Mettre à jour l'historique avec la réponse de l'IA
      setConversationHistory([...updatedHistory, { role: "assistant", content: responseText }]);
      
      // Ajouter la réponse aux messages affichés
      addMessage('agent', responseText);
      
    } catch (error) {
      console.error('Erreur lors de la communication avec l\'IA:', error);
      addMessage('agent', 'Désolé, j\'ai rencontré un problème technique. Pourriez-vous réessayer ou nous contacter directement via notre formulaire ?');
    } finally {
      setIsTyping(false);
    }
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
    getAIResponse(newMessage);
    setNewMessage('');
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
        className={`cosmic-chat-button ${!isOpen && 'pulse-glow'}`}
        aria-label={t('livechat.title')}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {!isOpen && (
              <span className="absolute -top-2 -right-2 bg-forge-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                1
              </span>
            )}
          </>
        )}
      </button>
      
      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="cosmic-chat-container">
          {/* En-tête */}
          <div className="cosmic-chat-header">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-nebula-purple flex items-center justify-center cosmic-float">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium cosmic-gradient-text">Assistant IA AstraForge</p>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-400 mr-1 animate-pulse"></div>
                  <p className="text-xs">En ligne</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 focus:outline-none hover-lift"
              aria-label={t('livechat.close')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Corps du chat */}
          <div className="cosmic-chat-messages">
            {messages.map((msg, index) => (
              <div 
                key={msg.id} 
                className={`${
                  msg.sender === 'system' 
                    ? 'system-message fade-in' 
                    : msg.sender === 'user'
                      ? 'cosmic-message cosmic-message-user slide-left'
                      : 'cosmic-message cosmic-message-agent slide-right'
                } ${index > 0 ? 'delay-' + (index % 5) : ''}`}
              >
                {msg.sender === 'system' ? (
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-2 text-nebula-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>{msg.text}</div>
                  </div>
                ) : (
                  <>
                    <div>{msg.text}</div>
                    <div className="text-xs opacity-70 text-right mt-1">
                      {formatTime(msg.timestamp)}
                    </div>
                  </>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="cosmic-message cosmic-message-agent slide-right">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{t('livechat.typing')}</div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Formulaire d'envoi */}
          <form onSubmit={handleSendMessage} className="cosmic-chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t('livechat.placeholder')}
              className="cosmic-input focus:outline-none focus:ring-2 focus:ring-nebula-purple"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="cosmic-button-send flex-shrink-0 hover-lift"
              aria-label={t('livechat.send')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
