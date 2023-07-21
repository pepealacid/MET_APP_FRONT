import React, { createContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [t, setT] = useState({});

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`../src/translations/${language}.json`);
        const data = await response.json();
        setT(data);
      } catch (error) {
        console.log(error);
        setT({})
      }
    };
    fetchTranslations();
  }, [language]);

  

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
