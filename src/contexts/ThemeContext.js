import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  netflix: {
    name: 'Netflix Classic',
    colors: {
      primary: '#E50914',
      background: '#141414',
      surface: '#2F2F2F',
      text: '#FFFFFF',
      textSecondary: '#B3B3B3',
      accent: '#E50914',
      hover: '#F40612',
      gradient: 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
      cardBackground: 'rgba(47, 47, 47, 0.8)',
      modalBackground: 'rgba(0, 0, 0, 0.9)'
    }
  },
  dark: {
    name: 'Dark Mode',
    colors: {
      primary: '#BB86FC',
      background: '#121212',
      surface: '#1E1E1E',
      text: '#FFFFFF',
      textSecondary: '#A0A0A0',
      accent: '#BB86FC',
      hover: '#C89EFC',
      gradient: 'linear-gradient(135deg, #BB86FC 0%, #9965F4 100%)',
      cardBackground: 'rgba(30, 30, 30, 0.8)',
      modalBackground: 'rgba(0, 0, 0, 0.9)'
    }
  },
  light: {
    name: 'Light Mode',
    colors: {
      primary: '#1976D2',
      background: '#FFFFFF',
      surface: '#F5F5F5',
      text: '#212121',
      textSecondary: '#757575',
      accent: '#1976D2',
      hover: '#1565C0',
      gradient: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)',
      cardBackground: 'rgba(245, 245, 245, 0.9)',
      modalBackground: 'rgba(255, 255, 255, 0.95)'
    }
  },
  cyberpunk: {
    name: 'Cyberpunk',
    colors: {
      primary: '#00FF9F',
      background: '#0A0A0A',
      surface: '#1A1A2E',
      text: '#EEEEFF',
      textSecondary: '#16213E',
      accent: '#00FF9F',
      hover: '#00E68C',
      gradient: 'linear-gradient(135deg, #00FF9F 0%, #00D4AA 100%)',
      cardBackground: 'rgba(26, 26, 46, 0.8)',
      modalBackground: 'rgba(10, 10, 10, 0.95)'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('netflix');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('neha-portfolio-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage when changed
  useEffect(() => {
    localStorage.setItem('neha-portfolio-theme', currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName] && themeName !== currentTheme) {
      setIsTransitioning(true);
      
      // Add transition delay for smooth theme change
      setTimeout(() => {
        setCurrentTheme(themeName);
        setTimeout(() => setIsTransitioning(false), 300);
      }, 150);
    }
  };

  const value = {
    theme: themes[currentTheme],
    currentTheme,
    changeTheme,
    isTransitioning,
    availableThemes: Object.keys(themes).map(key => ({
      key,
      name: themes[key].name
    }))
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};