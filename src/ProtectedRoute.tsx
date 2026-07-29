import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2, KeyRound, Lock, ShieldAlert, Clock } from 'lucide-react';
import { onAuthStateChanged, User as FirebaseUser, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { sanitizeEmail, isValidEmail } from './utils/security';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes in ms

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);

  // Rate Limiting State
  const [attempts, setAttempts] = useState<number>(() => {
    const saved = localStorage.getItem('admin_failed_attempts');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lockoutUntil, setLockoutUntil] = useState<number>(() => {
    const saved = localStorage.getItem('admin_lockout_until');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [remainingTimeSeconds, setRemainingTimeSeconds] = useState<number>(0);

  // Timer effect for countdown & checking expiry
  useEffect(() => {
    const checkLockout = () => {
      const now = Date.now();
      if (lockoutUntil > now) {
        setRemainingTimeSeconds(Math.ceil((lockoutUntil - now) / 1000));
      } else {
        setRemainingTimeSeconds(0);
        if (lockoutUntil > 0) {
          // Lockout expired, reset counters
          setLockoutUntil(0);
          setAttempts(0);
          localStorage.removeItem('admin_lockout_until');
          localStorage.setItem('admin_failed_attempts', '0');
        }
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isLockedOut = lockoutUntil > Date.now();

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (isLockedOut) {
      return;
    }

    const cleanEmail = sanitizeEmail(email);
    if (!isValidEmail(cleanEmail)) {
      setAuthError('Veuillez entrer une adresse e-mail valide.');
      return;
    }

    setIsAuthSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, cleanEmail, password);
      // Reset rate limiting on successful login
      setAttempts(0);
      setLockoutUntil(0);
      localStorage.removeItem('admin_failed_attempts');
      localStorage.removeItem('admin_lockout_until');
    } catch (err: any) {
      console.error(err);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem('admin_failed_attempts', newAttempts.toString());

      if (newAttempts >= MAX_ATTEMPTS) {
        const lockoutTime = Date.now() + LOCKOUT_DURATION_MS;
        setLockoutUntil(lockoutTime);
        localStorage.setItem('admin_lockout_until', lockoutTime.toString());
        setAuthError(`Nombre maximal d'essais atteint (5/5). Le portail est bloqué pendant 15 minutes.`);
      } else {
        let errMsg = 'Échec de l\'authentification. / Authentication failed.';
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
          errMsg = `Mot de passe ou email incorrect. (${newAttempts}/${MAX_ATTEMPTS} essais)`;
        } else {
          errMsg = `${err.message || 'Error'} (${newAttempts}/${MAX_ATTEMPTS} essais)`;
        }
        setAuthError(errMsg);
      }
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F4F9FC] dark:bg-[#020617] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#FC9905]" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F4F9FC] dark:bg-[#020617] pt-32 pb-16 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-[#1E293B] rounded-3xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-800"
        >
          <div className="p-8 text-center bg-gradient-to-br from-[#110195] to-[#FC9905] text-white relative">
            <div className="mx-auto w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
              {isLockedOut ? <Lock className="w-8 h-8 text-amber-300 animate-pulse" /> : <KeyRound className="w-8 h-8 text-white" />}
            </div>
            <h2 className="text-2xl font-bold">Portail Sécurisé / Protected Admin</h2>
            <p className="text-white/80 text-sm mt-1">Authentification requise pour accéder au dashboard</p>
          </div>

          <form onSubmit={handleAuthSubmit} className="p-8 space-y-4">
            {isLockedOut ? (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl text-amber-800 dark:text-amber-300 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 font-bold text-base text-amber-900 dark:text-amber-200">
                  <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  Portail temporairement verrouillé
                </div>
                <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-400">
                  Suite à 5 tentatives infructueuses, l'accès est bloqué pendant 15 minutes pour des raisons de sécurité.
                </p>
                <div className="inline-flex items-center gap-2 pt-2 px-4 py-1.5 bg-amber-100 dark:bg-amber-900/50 rounded-full font-mono text-sm font-bold text-amber-900 dark:text-amber-100">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-spin" />
                  Temps restant : {formatTime(remainingTimeSeconds)}
                </div>
              </div>
            ) : authError ? (
              <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-100 dark:border-red-900/50 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <div>{authError}</div>
              </div>
            ) : null}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Adresse E-mail / Email Address
              </label>
              <input
                required
                disabled={isLockedOut}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="contact@overseastaffingsolutions.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Accès Administrateur : <span className="font-mono">contact@overseastaffingsolutions.com</span>
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mot de passe / Password
                </label>
                {attempts > 0 && !isLockedOut && (
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    {attempts}/{MAX_ATTEMPTS} essais
                  </span>
                )}
              </div>
              <input
                required
                disabled={isLockedOut}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isAuthSubmitting || isLockedOut}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#110195] to-[#FC9905] text-white font-medium rounded-xl hover:shadow-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isAuthSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              {isLockedOut ? 'Bloqué / Locked' : 'Se connecter / Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}

