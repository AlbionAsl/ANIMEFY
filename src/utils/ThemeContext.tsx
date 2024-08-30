// src/utils/ThemeContext.tsx
import React, { createContext, useContext } from 'react';

interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  buttonText: string;
}

interface ThemeContextType {
  colors: ThemeColors;
}

const defaultTheme: ThemeColors = {
  background: '#121212',
  text: '#FFFFFF',
  primary: '#BB86FC',
  buttonText: '#000000',
};

const ThemeContext = createContext<ThemeContextType>({ colors: defaultTheme });

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ colors: defaultTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);