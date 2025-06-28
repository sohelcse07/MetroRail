import { useEffect, useState } from 'react';
import { WebApp } from '@zakarliuka/tg-webapp';

const TelegramWebApp = () => {
  const [isReady, setIsReady] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Initialize Telegram Web App
    WebApp.ready();
    setIsReady(true);

    // Set up event listeners
    WebApp.onEvent('viewportChanged', () => {
      setIsExpanded(WebApp.isExpanded);
    });

    return () => {
      WebApp.offEvent('viewportChanged');
    };
  }, []);

  const expandApp = () => {
    WebApp.expand();
  };

  const openBot = () => {
    WebApp.openTelegramLink('https://t.me/DhakaMetro_bot');
  };

  const closeWebApp = () => {
    WebApp.close();
  };

  return (
    <div className="telegram-webapp-container">
      <div className="telegram-header">
        <h3>Dhaka Metro Telegram</h3>
        {isReady && (
          <div className="telegram-controls">
            {!isExpanded && (
              <button onClick={expandApp} className="expand-btn">
                Expand
              </button>
            )}
            <button onClick={closeWebApp} className="close-btn">
              Close
            </button>
          </div>
        )}
      </div>
      
      <div className="telegram-content">
        {isReady ? (
          <iframe
            src={`https://web.telegram.org/k/#@DhakaMetro_bot`}
            className="telegram-iframe"
            title="Telegram Web App"
            allow="microphone; camera"
          />
        ) : (
          <div className="loading-state">
            <p>Initializing Telegram...</p>
          </div>
        )}
      </div>
      
      <div className="telegram-footer">
        <button onClick={openBot} className="open-bot-btn">
          Open in Telegram App
        </button>
      </div>
    </div>
  );
};

export default TelegramWebApp;