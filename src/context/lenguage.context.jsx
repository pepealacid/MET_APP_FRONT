import React, { createContext, useState, useEffect } from "react";

const LenguageContext = createContext();

const LenguageProvider = ({ children }) => {
  const [lenguage, setLenguage] = useState("en");
  const [t, setT] = useState({});

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`../src/translations/${lenguage}.json`);
        const data = await response.json();
        setT(data);
      } catch (error) {
        console.log(error);
        setT({})
      }
    };
    fetchTranslations();
  }, [lenguage]);

  

  return (
    <LenguageContext.Provider value={{ lenguage, setLenguage, t }}>
      {children}
    </LenguageContext.Provider>
  );
};

export { LenguageContext, LenguageProvider };
