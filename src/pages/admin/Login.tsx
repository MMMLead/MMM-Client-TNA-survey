import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  // If already logged in and admin, redirect
  if (user && isAdmin) {
    navigate(from, { replace: true });
  }

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // AuthContext will update and ProtectedRoute will handle the rest
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <LogIn className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Secure access for authorized personnel only
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-red-400 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {user && !isAdmin && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-yellow-400 mt-0.5" />
            <p className="text-sm text-yellow-700">
              Access denied. Your account does not have administrator privileges.
            </p>
          </div>
        )}

        <div className="mt-8 space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-blue-200"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign in with Google"
            )}
          </button>
          
          <p className="text-center text-xs text-gray-500">
            By signing in, you agree to our terms and security policies.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
