'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      router.push('/login');
      setIsLoading(false);
      return;
    }

    setIsAuthenticated(true);
    setIsLoading(false);
  }, [router]);

  const logout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  return { isAuthenticated, isLoading, logout };
}
