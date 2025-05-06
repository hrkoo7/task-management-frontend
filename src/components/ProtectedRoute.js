// src/components/ProtectedRoute.js

// components/ProtectedRoute.js
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    console.log('ProtectedRoute: user:', user, 'loading:', loading);
    if (loading) return; // Wait for auth check to finish

    if (!user) {
      router.replace('/login');
    } else {
      setAuthorized(true);
    }
  }, [user, loading, router]);

  // don’t flash anything until we know
  if (loading || !authorized) return null;

  return <>{children}</>;
}