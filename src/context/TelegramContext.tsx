import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UserData } from '../types';

// Расширяем Window для Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: UserData;
          query_id?: string;
          auth_date?: number;
          hash?: string;
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
        showConfirm: (message: string, callback: (confirmed: boolean) => void) => void;
        showAlert: (message: string, callback?: () => void) => void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          setText: (text: string) => void;
        };
        BackButton: {
          isVisible: boolean;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
        };
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          link_color: string;
          button_color: string;
          button_text_color: string;
        };
      };
    };
  }
}

interface TelegramContextType {
  webApp: NonNullable<Window['Telegram']>['WebApp'] | null;
  user: UserData | null;
  isReady: boolean;
  showMainButton: (text: string, onClick: () => void) => void;
  hideMainButton: () => void;
  showBackButton: (onClick: () => void) => void;
  hideBackButton: () => void;
  hapticFeedback: (type: 'success' | 'error' | 'warning') => void;
  sendDataToBot: (data: object) => void;
}

const TelegramContext = createContext<TelegramContextType | null>(null);

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegram must be used within TelegramProvider');
  }
  return context;
};

interface TelegramProviderProps {
  children: ReactNode;
}

export const TelegramProvider: React.FC<TelegramProviderProps> = ({ children }) => {
  const [webApp, setWebApp] = useState<NonNullable<Window['Telegram']>['WebApp'] | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initTelegram = () => {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        setWebApp(tg);
        
        if (tg.initDataUnsafe?.user) {
          setUser(tg.initDataUnsafe.user);
        }
        
        tg.ready();
        tg.expand();
        setIsReady(true);
        
        // Устанавливаем цвета в соответствии с темой Telegram
        if (tg.themeParams) {
          document.body.style.backgroundColor = tg.themeParams.bg_color || '#ffffff';
          document.body.style.color = tg.themeParams.text_color || '#000000';
        }
      }
    };

    // Даем время для загрузки Telegram WebApp
    if (document.readyState === 'complete') {
      initTelegram();
    } else {
      window.addEventListener('load', initTelegram);
      return () => window.removeEventListener('load', initTelegram);
    }
  }, []);

  const showMainButton = (text: string, onClick: () => void) => {
    if (webApp?.MainButton) {
      webApp.MainButton.setText(text);
      webApp.MainButton.show();
      webApp.MainButton.enable();
      webApp.MainButton.onClick(onClick);
    }
  };

  const hideMainButton = () => {
    if (webApp?.MainButton) {
      webApp.MainButton.hide();
      webApp.MainButton.offClick(() => {});
    }
  };

  const showBackButton = (onClick: () => void) => {
    if (webApp?.BackButton) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(onClick);
    }
  };

  const hideBackButton = () => {
    if (webApp?.BackButton) {
      webApp.BackButton.hide();
      webApp.BackButton.offClick(() => {});
    }
  };

  const hapticFeedback = (type: 'success' | 'error' | 'warning') => {
    if (webApp?.HapticFeedback) {
      webApp.HapticFeedback.notificationOccurred(type);
    }
  };

  const sendDataToBot = (data: object) => {
    if (webApp) {
      // Отправляем данные через WebApp
      console.log('Sending data to bot:', data);
      webApp.close();
    }
  };

  return (
    <TelegramContext.Provider
      value={{
        webApp,
        user,
        isReady,
        showMainButton,
        hideMainButton,
        showBackButton,
        hideBackButton,
        hapticFeedback,
        sendDataToBot,
      }}
    >
      {children}
    </TelegramContext.Provider>
  );
};
