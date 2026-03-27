import React, { useEffect } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, loading, user } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/welcome');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center space-y-8"
      >
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
            <Trophy className="w-12 h-12 text-background" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">THE PITCH</h1>
          <p className="text-muted-foreground mt-2">Organize. Play. Dominate.</p>
        </div>

        <div className="bg-card border border-border p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">Welcome Back</h2>
          <p className="text-muted-foreground mb-8">Sign in with your Google account to start organizing matches and joining games.</p>
          
          <button
            onClick={login}
            className="w-full bg-foreground text-background py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              className="w-6 h-6"
              referrerPolicy="no-referrer"
            />
            Sign in with Google
          </button>
        </div>

        <p className="text-xs text-muted-foreground px-8">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
