import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { AuthProvider } from '../contexts/AuthContext';
import { SocketProvider } from '../contexts/SocketContext';
import ErrorBoundary from '../components/ErrorBoundary';
import NavBar from '../components/NavBar';
import theme from '../styles/theme'; // Optional custom theme

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <ErrorBoundary>
        <AuthProvider>
          <SocketProvider>
            <NavBar />
            
            <Component {...pageProps} />
          </SocketProvider>
        </AuthProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default MyApp;