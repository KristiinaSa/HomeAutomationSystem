import { createContext, useState, useEffect } from 'react';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        setRooms([
            {
                id: 1,
                name: "Living room",
                cards: [{ id: 1, title: "Lights", icon: "faLightbulb", count: 2 }],
            },
            {
                id: 2,
                name: "Bedroom",
                cards: [{ id: 2, title: "Lights", icon: "faLightbulb", count: 1 }],
            },
        ]);
    }, []);

    return (
        <RoomContext.Provider value={{ rooms }}>
            {children}
        </RoomContext.Provider>
    );
}