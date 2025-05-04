import { Flex, Heading, Button, Spacer, Link, Box, IconButton } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import NotificationBell from './NotificationBell';
import { useRouter } from 'next/router';

export default function NavBar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="gray.100"
      boxShadow="sm"
      w="100%"
    >
      {/* Left side: Logo / Title */}
      <Link
        onClick={() => router.push('/dashboard')}
        _hover={{ textDecoration: 'none' }}
      >
        <Heading size="lg" cursor="pointer">
          Task Management
        </Heading>
      </Link>

      <Spacer />

      {/* Right side: Links & Actions */}
      <Flex align="center" gap={4}>
        <Link onClick={() => router.push('/dashboard')} _hover={{ textDecoration: 'none' }}>
          Dashboard
        </Link>
        <Link onClick={() => router.push('/tasks')} _hover={{ textDecoration: 'none' }}>
          Tasks
        </Link>

        {/* Notification Bell */}
        {user && (
          <IconButton
            aria-label="Notifications"
            variant="ghost"
            icon={<NotificationBell />}
            onClick={() => router.push('/notifications')}
          />
        )}

        {/* Logout Button (only when logged in) */}
        {user && (
          <Button
            colorScheme="red"
            size="sm"
            onClick={async () => {
              await logout();
              router.push('/login');
            }}
          >
            Logout
          </Button>
        )}
      </Flex>
    </Flex>
  );
}