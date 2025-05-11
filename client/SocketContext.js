// SocketContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const newSocket = io('http://localhost:5000'); // Replace with your server URL

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        newSocket.on('bookRequestNotification', (data) => {
            console.log('Received book request notification:', data);
            setNotifications(prev => [...prev, data.message]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.off('connect');
            newSocket.off('bookRequestNotification');
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, notifications }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);