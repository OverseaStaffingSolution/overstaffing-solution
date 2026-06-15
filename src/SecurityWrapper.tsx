import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, EyeOff } from 'lucide-react';

interface SecurityWrapperProps {
  children: React.ReactNode;
}

export default function SecurityWrapper({ children }: SecurityWrapperProps) {
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });
  const [isBlurred, setIsBlurred] = useState(false);
  const [isVisibilityHidden, setIsVisibilityHidden] = useState(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, show: true });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 2500);
  };

  // Safe clipboard cleaning or custom message setting
  const overrideClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText("Protected Content | Propriété d'Oversea Staffing Solutions");
      }
    } catch {
      // Ignore if clipboard permissions are restricted in iframe
    }
  };

  useEffect(() => {
    // 1. Right Click Blocker
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showToast("Le clic droit est désactivé pour protéger le contenu.");
    };

    // 2. Direct Cut & Copy Blocker
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      overrideClipboard();
      showToast("La copie de texte est interdite pour des raisons de sécurité.");
    };

    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      showToast("La découpe de contenu est désactivée.");
    };

    // 3. Keyboard Shortcuts Blocker
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      // Block F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        showToast("L'ouverture des outils de développement est limitée.");
        return;
      }

      // Block Ctrl+C / Cmd+C (Copy)
      if (isCmdOrCtrl && key === 'c') {
        e.preventDefault();
        showToast("La copie de contenu est interdite.");
        return;
      }

      // Block Ctrl+S / Cmd+S (Save)
      if (isCmdOrCtrl && key === 's') {
        e.preventDefault();
        showToast("L'enregistrement de la page est désactivé.");
        return;
      }

      // Block Ctrl+P / Cmd+P (Print)
      if (isCmdOrCtrl && key === 'p') {
        e.preventDefault();
        showToast("L'impression de cette page est bloquée.");
        return;
      }

      // Block Ctrl+U / Cmd+U (View Source Code)
      if (isCmdOrCtrl && key === 'u') {
        e.preventDefault();
        showToast("L'affichage du code source est restreint.");
        return;
      }

      // Block Inspect: Ctrl+Shift+I / Cmd+Opt+I & Ctrl+Shift+J / Cmd+Opt+J & Ctrl+Shift+C / Cmd+Opt+C
      const isInspectShortcut = isCmdOrCtrl && e.shiftKey && (key === 'i' || key === 'j' || key === 'c');
      const isMacInspect = e.metaKey && e.altKey && (key === 'i' || key === 'j' || key === 'c');
      
      if (isInspectShortcut || isMacInspect) {
        e.preventDefault();
        showToast("L'inspecteur de code est désactivé.");
        return;
      }

      // Detect PrintScreen Key
      if (e.key === 'PrintScreen' || e.key === 'Snapshot' || e.keyCode === 44) {
        e.preventDefault();
        overrideClipboard();
        showToast("Capture d'écran détectée. Copie interdite.");
      }
    };

    // 4. PrintScreen Keyup listener
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen' || e.key === 'Snapshot' || e.keyCode === 44) {
        overrideClipboard();
        showToast("Prise de capture restreinte pour ce site.");
      }
    };

    // 5. Visibility and Focus Change Detectors
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsBlurred(true);
        setIsVisibilityHidden(true);
        overrideClipboard();
      } else {
        setIsBlurred(false);
        setIsVisibilityHidden(false);
      }
    };

    const handleWindowBlur = () => {
      setIsBlurred(true);
    };

    const handleWindowFocus = () => {
      setIsBlurred(false);
      setIsVisibilityHidden(false);
    };

    // Register active listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      // Clear timers and listeners
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  return (
    <>
      {/* Toast Alert Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            id="security-protection-toast"
            initial={{ opacity: 0, y: -50, x: '-50%', scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: -20, x: '-50%', scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-24 left-1/2 z-[99999] flex items-center gap-3 bg-[#0B2B5B] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#FF6B35]/40 backdrop-blur-md max-w-sm w-[calc(100%-2rem)]"
          >
            <div className="w-10 h-10 rounded-full bg-[#FF6B35]/20 flex items-center justify-center flex-shrink-0 animate-pulse">
              <ShieldAlert className="text-[#FF6B35] w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-display font-medium text-sm text-[#F4F9FC]">Accès Restreint</p>
              <p className="text-xs text-[#F4F9FC]/80 mt-0.5">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen blur overlays (Banking App Style) */}
      <AnimatePresence>
        {isBlurred && (
          <motion.div
            id="security-blur-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99998] bg-[#0B2B5B]/30 dark:bg-[#020617]/50 backdrop-blur-2xl flex flex-col items-center justify-center pointer-events-auto transition-all"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#0B2B5B] to-[#110195] p-8 rounded-3xl shadow-2xl border border-[#FC9905]/30 text-center max-w-xs mx-4 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
              <div className="mx-auto w-16 h-16 rounded-full bg-[#FC9905]/20 flex items-center justify-center mb-4 relative z-10">
                <EyeOff className="text-[#FC9905] w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-white text-lg mb-2 relative z-10">
                Session Sécurisée
              </h4>
              <p className="text-sm text-white/80 font-light relative z-10">
                Le contenu est masqué temporairement pour protéger la confidentialité.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Wrapped Application View with smooth blur transition */}
      <div 
        id="secure-viewport-container"
        style={{ 
          filter: isBlurred ? 'blur(20px)' : 'none',
          transition: 'filter 0.15s ease-in-out',
          userSelect: 'none' // Fallback selection blocker
        }}
        className="min-h-screen"
      >
        {children}
      </div>
    </>
  );
}
