import { createContext, useState, useEffect } from "react";
import { getDeviceTypes } from "../services/accessoryServices";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getDeviceTypes().then((deviceTypes) => {
      const categories = deviceTypes.map((deviceType) => ({
        id: deviceType.id,
        title: deviceType.name,
      }));
      setCategories(categories);
    });
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
