import { createContext, useEffect, useState } from "react";

export const FieldContext = createContext();

export const FieldContextWrapper = ({ children }) => {
  const [field, setField] = useState("Tours");
  

  useEffect(() => {
  }, []);

  return (
    <FieldContext.Provider
      value={{
        setField,
        field
      }}
    >
      {children}
    </FieldContext.Provider>
  );
};