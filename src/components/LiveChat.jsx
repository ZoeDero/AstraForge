import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/cosmic-forge-theme.css';
import '../styles/animations.css';

/**
 * Composant LiveChat - Widget de chat en direct avec IA pour communiquer avec les visiteurs
 * @returns {JSX.Element} - Widget de chat flottant
 */
const LiveChat = () => {
  const { t } = useTranslation(undefined, { useSuspense: false });
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'agent', 
      text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?', 
      timestamp: new Date() 
    },
    {
      id: 2,
      sender: 'system',
      text: '👨‍💻 Vous discutez avec un assistant virtuel alimenté par l\'intelligence artificielle. Pour parler à un conseiller humain, veuillez utiliser le formulaire de contact.',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [conversationHistory, setConversationHistory] = useState([
    { role: "system", content: "Tu es un assistant virtuel pour AstraForge, un studio de design et développement web. Tu dois être amical, professionnel et utile. Tu peux répondre aux questions sur les services, les tarifs, les délais et aider les visiteurs à comprendre ce que nous proposons. Si on te demande des informations très spécifiques que tu ne connais pas, propose de mettre le visiteur en contact avec un conseiller humain." },
    { role: "assistant", content: "Bonjour ! Comment puis-je vous aider aujourd'hui ?" }
  ]);

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
        responseText = 'Bonjour ! Ravi de vous rencontrer. Comment puis-je vous aider avec votre projet aujourd\'hui ?';
      } else if (lowerCaseMessage.includes('tarif') || lowerCaseMessage.includes('prix') || lowerCaseMessage.includes('coût')) {
        responseText = 'Nos tarifs sont personnalisés selon les besoins spécifiques de chaque projet. Pour le développement web, nous commençons à partir de 1500€ pour un site vitrine, et 3000€ pour une boutique en ligne. Pour le design graphique, nos forfaits commencent à 500€. Pourriez-vous me donner plus de détails sur votre projet pour que je puisse vous fournir une estimation plus précise ?';
      } else if (lowerCaseMessage.includes('délai') || lowerCaseMessage.includes('temps') || lowerCaseMessage.includes('durée')) {
        responseText = 'Nos délais varient selon la complexité du projet. Généralement, un site vitrine prend 2-3 semaines, une boutique en ligne 4-8 semaines, et un projet sur mesure peut prendre 2-4 mois. Avez-vous une date limite particulière pour votre projet ?';
      } else if (lowerCaseMessage.includes('service') || lowerCaseMessage.includes('prestation')) {
        responseText = 'Chez AstraForge, nous proposons plusieurs services : développement web, design d\'interface utilisateur, création d\'identité visuelle, photographie professionnelle, et motion design. Quel type de service vous intéresse particulièrement ?';
      } else if (lowerCaseMessage.includes('portfolio') || lowerCaseMessage.includes('exemple') || lowerCaseMessage.includes('travaux')) {
        responseText = 'Vous pouvez consulter notre portfolio dans la section Galerie de notre site. Nous y présentons nos projets récents dans différents domaines : sites web, applications, identités visuelles, etc. Souhaitez-vous que je vous oriente vers un type de projet particulier ?';
      } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('rendez-vous') || lowerCaseMessage.includes('rdv')) {
        responseText = 'Vous pouvez nous contacter via notre formulaire de contact ou directement par email à contact@astraforge.com. Nous proposons également des consultations gratuites de 30 minutes pour discuter de votre projet. Souhaitez-vous planifier un rendez-vous ?';
      } else if (lowerCaseMessage.includes('merci')) {
        responseText = 'Je vous en prie ! C\'est toujours un plaisir d\'aider. N\'hésitez pas si vous avez d\'autres questions.';
      } else if (lowerCaseMessage.includes('technologie') || lowerCaseMessage.includes('stack') || lowerCaseMessage.includes('framework')) {
        responseText = 'Nous travaillons avec diverses technologies modernes : React, Vue.js, Node.js, WordPress, Shopify pour le développement web, et la suite Adobe pour le design. Nous adaptons notre stack technologique aux besoins spécifiques de chaque projet. Y a-t-il une technologie particulière qui vous intéresse ?';
      } else if (lowerCaseMessage.includes('processus') || lowerCaseMessage.includes('étape') || lowerCaseMessage.includes('déroulement')) {
        responseText = 'Notre processus de travail se déroule en plusieurs étapes : 1) Consultation initiale pour comprendre vos besoins, 2) Proposition détaillée avec devis, 3) Conception et prototypage, 4) Développement et tests, 5) Lancement et suivi. Nous vous impliquons à chaque étape pour assurer que le résultat final corresponde parfaitement à vos attentes.';
      } else if (lowerCaseMessage.includes('humain') || lowerCaseMessage.includes('personne') || lowerCaseMessage.includes('conseiller')) {
        responseText = 'Je comprends que vous souhaitez parler à un conseiller humain. Vous pouvez nous contacter directement via notre formulaire de contact ou par email à contact@astraforge.com. Un membre de notre équipe vous répondra dans les 24 heures ouvrables.';
      } else if (lowerCaseMessage.includes('ia') || lowerCaseMessage.includes('intelligence artificielle') || lowerCaseMessage.includes('robot')) {
        responseText = 'En effet, je suis un assistant virtuel alimenté par l\'intelligence artificielle. Je suis conçu pour vous aider avec des informations générales sur nos services. Pour des questions plus spécifiques ou personnalisées, n\'hésitez pas à contacter notre équipe humaine via le formulaire de contact.';
      } else {
        responseText = 'Merci pour votre message. Je comprends votre intérêt pour nos services. Pourriez-vous me donner plus de détails sur votre projet ou vos besoins spécifiques ? Cela m\'aidera à vous fournir les informations les plus pertinentes.';
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
        aria-label="Chat en direct"
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
              placeholder="Écrivez votre message..."
              className="cosmic-input focus:outline-none focus:ring-2 focus:ring-nebula-purple"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="cosmic-button-send flex-shrink-0 hover-lift"
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
