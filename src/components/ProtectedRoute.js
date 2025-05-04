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
    // once we've checked auth...
    if (!loading) {
      if (!user) {
        // not logged in → redirect
        router.replace('/login');
      } else {
        // logged in → render children
        setAuthorized(true);
      }
    }
  }, [user, loading, router]);

  // don’t flash anything until we know
  if (!authorized) return null;

  return <>{children}</>;
}