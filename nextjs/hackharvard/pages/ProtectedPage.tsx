// ProtectedPage.tsx
import React, { useEffect } from 'react';
import { useAuthContext } from '../components/AuthContext';  // Adjust the import path to match your file structure
import { useRouter } from 'next/router';

const ProtectedPage: React.FC = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      // Redirect to login page if user is not authenticated
      router.push('/login');
    }
  }, [user, router]);

  if (user == null) {
    // Optionally render a loading state or nothing while waiting for user data
    return null;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Only logged-in users can see this page.</p>
    </div>
  );
};

export default ProtectedPage;
