import { createContext, useState, useEffect } from 'react';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories([{ id: 1, title: "Lights", icon: faLightbulb, count: 2 }]);
    }, []);

    return (
        <CategoriesContext.Provider value={{ categories }}>
            {children}
        </CategoriesContext.Provider>
    );
}