import { useState, useEffect } from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

export default function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const errorHandler = (errorEvent) => {
      setError(errorEvent.error);
    };
    
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (error) {
    return (
      <Box p={4} textAlign="center">
        <Heading color="red.500" mb={4}>Something went wrong</Heading>
        <Text mb={4}>{error.message}</Text>
        <Button
          colorScheme="blue"
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh Page
        </Button>
      </Box>
    );
  }

  return children;
}