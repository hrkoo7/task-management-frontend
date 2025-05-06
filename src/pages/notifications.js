// pages/notifications.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Heading,
  Stack,
  Text,
  Spinner,
  Center,
  Badge,
  VStack,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import ProtectedRoute from '../components/ProtectedRoute';

export default function NotificationsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1) Wait for auth to finish
    if (authLoading) return;

    // 2) Redirect if not logged in
    if (!user) {
      router.replace('/login');
      return;
    }

    // 3) Fetch notifications once user is confirmed
    api
      .get('/api/notifications')
      .then(({ data }) => setNotifications(data))
      .catch((err) => console.error('Error loading notifications:', err))
      .finally(() => setLoading(false));
  }, [authLoading, user, router]);

  // While auth or data is loading, show skeleton/spinner
  if (authLoading || loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <ProtectedRoute>
      <Box p={6}>
        <Heading mb={6}>Notifications</Heading>
        {notifications.length === 0 ? (
          <Text color="gray.500">You have no notifications.</Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {notifications.map((note) => (
              <Box
                key={note.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                _hover={{ bg: 'gray.50' }}
              >
                <Stack direction="row" justify="space-between" align="center">
                  <Text>{note.message}</Text>
                  <Badge colorScheme={note.read ? 'gray' : 'green'}>
                    {new Date(note.createdAt).toLocaleDateString()}{' '}
                    {new Date(note.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Badge>
                </Stack>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </ProtectedRoute>
  );
}
