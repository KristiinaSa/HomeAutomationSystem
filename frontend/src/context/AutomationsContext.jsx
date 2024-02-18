import { useState, createContext } from "react";
import { dummyAutomations } from "../dummyData/dummyAutomations";

export const AutomationsContext = createContext();

export const AutomationsProvider = ({ children }) => {
  const [automations, setAutomations] = useState(dummyAutomations);

  return (
    <AutomationsContext.Provider value={{ automations, setAutomations }}>
      {children}
    </AutomationsContext.Provider>
  );
};
