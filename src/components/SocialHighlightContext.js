import React, { createContext, useState, useContext } from 'react';

/* Composant pour mettre en surbrillance les icones de réseaux sociaux */

const SocialHighlightContext = createContext();

export const SocialHighlightProvider = ({ children }) => {
  const [highlight, setHighlight] = useState(false);

  const triggerHighlight = () => {
    setHighlight(true);
    setTimeout(() => setHighlight(false), 3000);
  };

  return (
    <SocialHighlightContext.Provider value={{ highlight, triggerHighlight }}>
      {children}
    </SocialHighlightContext.Provider>
  );
};

export const useSocialHighlight = () => useContext(SocialHighlightContext);
