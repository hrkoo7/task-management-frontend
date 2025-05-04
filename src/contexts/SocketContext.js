import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL, {
      withCredentials: true
    });
    
    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    newSocket.on('newNotification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log('Disconnected from WebSocket server');
    };
  }, []);

  const markNotificationRead = async (notificationId) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  return (
    <SocketContext.Provider value={{ socket, notifications, markNotificationRead }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};