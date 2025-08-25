'use client';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

export default function LoginButton() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
     // const user = result.user;
    //  console.log('User:', user.displayName, user.email);
    } catch (err) {
      console.error('Login error:', err.message);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >Google Login
    </button>
  );
}

