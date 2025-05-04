import { useState, useEffect } from 'react';
import { IconButton, Menu, MenuButton, MenuList, MenuItem, Badge } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import io from 'socket.io-client';
import api from '../services/api';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL);
    
    socket.on('newNotification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const markAsRead = async (id) => {
    await api.patch(`/api/notifications/${id}/read`);
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Notifications"
        icon={
          <>
            <BellIcon />
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge colorScheme="red" borderRadius="full" ml={1}>
                {notifications.filter(n => !n.read).length}
              </Badge>
            )}
          </>
        }
      />
      <MenuList maxH="300px" overflowY="auto">
        {notifications.map(notification => (
          <MenuItem
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            bg={notification.read ? undefined : 'blue.50'}
          >
            {notification.message}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}