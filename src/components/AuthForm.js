import { useState } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Heading,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { authValidationSchema } from '../utils/validation';
import { useRouter } from 'next/router';

export default function AuthForm({ isLogin }) {
  const { login, register } = useAuth();        // ← pull in your context methods
  const router = useRouter();
  const [generalError, setGeneralError] = useState('');

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: authValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setGeneralError('');
      try {
        let userData;
        if (isLogin) {
          userData = await login(values.email, values.password);
        } else {
          userData = await register(values.email, values.password);
        }
        console.log('Logged in/register user:', userData);
        router.push('/dashboard');              // Next.js navigation
      } catch (error) {
        console.error('Auth error:', error);
        const message = error.message || error.error || 'Unexpected error';
        setGeneralError(message);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4} maxW="md" mx="auto" mt={10}>
        <Heading textAlign="center">
          {isLogin ? 'Login' : 'Register'}
        </Heading>

        {generalError && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {generalError}
          </Alert>
        )}

        <FormControl isInvalid={formik.touched.email && formik.errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            {...formik.getFieldProps('email')}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.password && formik.errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            {...formik.getFieldProps('password')}
          />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          isLoading={formik.isSubmitting}
          isDisabled={!formik.isValid}
        >
          {isLogin ? 'Sign In' : 'Create Account'}
        </Button> 
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={formik.isSubmitting}
        onClick={() => router.push(isLogin ? '/register' : '/login')}
        >   
          {isLogin ? 'Create Account' : 'Go to Login'}
        </Button>
      </Stack>
    </form>
  );
}
