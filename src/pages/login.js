
import { Box } from '@chakra-ui/react';
import AuthForm from '../components/AuthForm';

export default function Login() {
  return (

    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <AuthForm isLogin={true} />
    </Box>
  );
}