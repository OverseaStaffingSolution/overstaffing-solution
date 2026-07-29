import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { Settings, MessageSquare, Plus, Edit2, Trash2, X, Loader2, LogOut, KeyRound, Mail, Calendar, User, Search, CheckCircle, FileText, Download, Briefcase, Phone, Globe, ShieldCheck, LayoutDashboard, ChevronRight, AlertTriangle, WifiOff, RefreshCw, SearchX, Inbox, FilterX, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { db, auth } from './firebase';
import { sanitizeInput } from './utils/security';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

interface ContactDoc {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

interface ApplicationDoc {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone: string;
  coverLetter?: string;
  category?: string;
  roleId?: string;
  resumeName?: string;
  resumeData?: string;
  resumeUrl?: string;
  status: string;
  date?: string;
  createdAt?: any;
}

interface DeleteTarget {
  id: string;
  collectionName: 'applications' | 'contacts' | 'testimonials';
  title: string;
  subtitle: string;
  itemName?: string;
}

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);

  // App State
  const [activeTab, setActiveTab] = useState<'testimonials' | 'contacts' | 'applications' | 'security'>('applications');
  
  // Testimonials Tab Data
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isTestimonialsLoading, setIsTestimonialsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ quote: '', author: '', role: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Contacts Tab Data
  const [contacts, setContacts] = useState<ContactDoc[]>([]);
  const [isContactsLoading, setIsContactsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Applications Tab Data
  const [applications, setApplications] = useState<ApplicationDoc[]>([]);
  const [isApplicationsLoading, setIsApplicationsLoading] = useState(true);
  const [appSearchQuery, setAppSearchQuery] = useState('');
  const [appCategoryFilter, setAppCategoryFilter] = useState('All');
  const [appStatusFilter, setAppStatusFilter] = useState('All');

  // Security (Gateway Password) State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');
  const [securityError, setSecurityError] = useState('');
  const [isSecuritySubmitting, setIsSecuritySubmitting] = useState(false);

  // Network Offline State
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false);

  // Fetch Errors State
  const [appsError, setAppsError] = useState<string | null>(null);
  const [contactsError, setContactsError] = useState<string | null>(null);
  const [testimonialsError, setTestimonialsError] = useState<string | null>(null);

  // Deletion Modal State
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Network Status Listener
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setToastMessage('Connexion Internet rétablie avec succès.');
      fetchApplications();
      fetchContacts();
      fetchTestimonials();
    };
    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) {
        fetchTestimonials();
        fetchContacts();
        fetchApplications();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchTestimonials = async () => {
    setIsTestimonialsLoading(true);
    setTestimonialsError(null);
    try {
      const querySnapshot = await getDocs(collection(db, 'testimonials'));
      const fetched: Testimonial[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ ...doc.data(), id: doc.id } as Testimonial);
      });
      setTestimonials(fetched);
    } catch (error: any) {
      console.warn('Could not fetch testimonials:', error);
      setTestimonialsError('Impossible de charger les témoignages depuis le serveur.');
    } finally {
      setIsTestimonialsLoading(false);
    }
  };

  const fetchContacts = async () => {
    setIsContactsLoading(true);
    setContactsError(null);
    try {
      const querySnapshot = await getDocs(collection(db, 'contacts'));
      const fetched: ContactDoc[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ ...doc.data(), id: doc.id } as ContactDoc);
      });
      // Sort Contacts by Date (newest first)
      fetched.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      setContacts(fetched);
    } catch (error: any) {
      console.warn('Could not fetch contacts:', error);
      setContactsError('Impossible de charger les messages de contact.');
    } finally {
      setIsContactsLoading(false);
    }
  };

  const fetchApplications = async () => {
    setIsApplicationsLoading(true);
    setAppsError(null);
    try {
      const querySnapshot = await getDocs(collection(db, 'applications'));
      const fetched: ApplicationDoc[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ ...doc.data(), id: doc.id } as ApplicationDoc);
      });
      // Sort Applications by Date (newest first)
      fetched.sort((a, b) => {
        const timeA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : (a.date ? new Date(a.date).getTime() : 0);
        const timeB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : (b.date ? new Date(b.date).getTime() : 0);
        return timeB - timeA;
      });
      setApplications(fetched);
    } catch (error: any) {
      console.warn('Could not fetch applications:', error);
      setAppsError('Impossible de charger les candidatures.');
    } finally {
      setIsApplicationsLoading(false);
    }
  };

  const handleUpdateAppStatus = async (id: string, newStatus: string) => {
    if (!id) return;
    try {
      await updateDoc(doc(db, 'applications', id), { status: newStatus });
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Échec de la mise à jour du statut.');
    }
  };

  const handleDeleteApplication = (id: string, name: string) => {
    if (!id) {
      alert('Erreur: Identifiant de la candidature introuvable.');
      return;
    }
    setDeleteTarget({
      id,
      collectionName: 'applications',
      title: 'Supprimer la candidature',
      subtitle: `Êtes-vous sûr de vouloir supprimer la candidature de "${name}" ? Cette action effacera définitivement cette entrée de la collection des candidatures.`,
      itemName: name
    });
  };

  const handleDeleteContact = (id: string, name: string) => {
    if (!id) {
      alert('Erreur: Identifiant du message introuvable.');
      return;
    }
    setDeleteTarget({
      id,
      collectionName: 'contacts',
      title: 'Supprimer le message de contact',
      subtitle: `Êtes-vous sûr de vouloir supprimer le message de "${name}" ? Cette action effacera définitivement ce message de la collection de contacts.`,
      itemName: name
    });
  };

  const handleDelete = (id: string, author: string) => {
    if (!id) {
      alert('Erreur: Identifiant du témoignage introuvable.');
      return;
    }
    setDeleteTarget({
      id,
      collectionName: 'testimonials',
      title: 'Supprimer le témoignage',
      subtitle: `Êtes-vous sûr de vouloir supprimer le témoignage de "${author}" ? Cette action effacera définitivement cet avis de la collection des témoignages.`,
      itemName: author
    });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const { id, collectionName } = deleteTarget;
    try {
      await deleteDoc(doc(db, collectionName, id));
      if (collectionName === 'applications') {
        setApplications(prev => prev.filter(a => a.id !== id));
        setToastMessage('Candidature supprimée de la base de données avec succès.');
      } else if (collectionName === 'contacts') {
        setContacts(prev => prev.filter(c => c.id !== id));
        setToastMessage('Message de contact supprimé avec succès.');
      } else if (collectionName === 'testimonials') {
        setTestimonials(prev => prev.filter(t => t.id !== id));
        setToastMessage('Témoignage supprimé avec succès.');
      }
      setDeleteTarget(null);
    } catch (error: any) {
      console.error(`Error deleting from ${collectionName}:`, error);
      alert(`Échec de la suppression: ${error.message || 'Erreur lors de la suppression'}`);
    } finally {
      setIsDeleting(false);
      setTimeout(() => {
        setToastMessage(null);
      }, 3500);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error(err);
      let errMsg = 'Échec de l\'authentification. / Authentication failed.';
      if (err.code === 'auth/email-already-in-use') {
        errMsg = 'Cet e-mail est déjà enregistré. Veuillez utiliser l\'option "Se connecter" ci-dessous. / This email is already registered. Please use "Sign In" below.';
      } else if (err.code === 'auth/weak-password') {
        errMsg = 'Le mot de passe doit comporter au moins 6 caractères. / Password must be at least 6 characters.';
      } else if (err.code === 'auth/invalid-credential') {
        errMsg = 'Adresse e-mail ou mot de passe incorrect. / Incorrect email or password.';
      } else {
        errMsg = `${err.message || 'Error'}`;
      }
      setAuthError(errMsg);
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleOpenModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      setFormData({ quote: testimonial.quote, author: testimonial.author, role: testimonial.role });
    } else {
      setEditingId(null);
      setFormData({ quote: '', author: '', role: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleanQuote = sanitizeInput(formData.quote, 5000);
    const cleanAuthor = sanitizeInput(formData.author, 250);
    const cleanRole = sanitizeInput(formData.role, 250);

    if (!cleanQuote || !cleanAuthor || !cleanRole) {
      alert('Veuillez remplir tous les champs du témoignage.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (editingId) {
        await updateDoc(doc(db, 'testimonials', editingId), {
          quote: cleanQuote,
          author: cleanAuthor,
          role: cleanRole
        });
      } else {
        await addDoc(collection(db, 'testimonials'), {
          quote: cleanQuote,
          author: cleanAuthor,
          role: cleanRole,
          dateAdded: new Date().toISOString()
        });
      }
      setIsModalOpen(false);
      await fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Failed to save testimonial. Make sure you are logged in as admin with contact@overseastaffingsolutions.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError('');
    setSecuritySuccess('');

    if (newPassword !== confirmPassword) {
      setSecurityError('Les nouveaux mots de passe ne correspondent pas. / Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setSecurityError('Le nouveau mot de passe doit comporter au moins 6 caractères. / New password must be at least 6 characters.');
      return;
    }

    if (!currentUser || !currentUser.email) {
      setSecurityError('Aucun utilisateur connecté. / No user is logged in.');
      return;
    }

    setIsSecuritySubmitting(true);
    try {
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);

      // Update password
      await updatePassword(currentUser, newPassword);

      setSecuritySuccess('Le mot de passe du portail admin a été mis à jour avec succès ! / Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      console.error('Password change error:', err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setSecurityError('Le mot de passe actuel est incorrect. / Incorrect current password.');
      } else if (err.code === 'auth/requires-recent-login') {
        setSecurityError('Sécurité renforcée : veuillez vous déconnecter et vous reconnecter avant de changer de mot de passe. / Secure action: please log out and back in first.');
      } else {
        setSecurityError(err.message || 'Une erreur est survenue lors de la mise à jour. / An error occurred.');
      }
    } finally {
      setIsSecuritySubmitting(false);
    }
  };

  // Filter contacts based on search query
  const filteredContacts = searchQuery
    ? contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.message.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : contacts;

  // Filter applications based on search query, category, and status
  const filteredApplications = applications.filter((app) => {
    const candidateName = (app.name || `${app.firstName || ''} ${app.lastName || ''}`).toLowerCase();
    const matchesSearch =
      !appSearchQuery ||
      candidateName.includes(appSearchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(appSearchQuery.toLowerCase()) ||
      app.phone.toLowerCase().includes(appSearchQuery.toLowerCase()) ||
      (app.category || '').toLowerCase().includes(appSearchQuery.toLowerCase());

    const matchesCategory =
      appCategoryFilter === 'All' ||
      (app.category || '').toLowerCase() === appCategoryFilter.toLowerCase() ||
      (appCategoryFilter === 'Customer Service Representative' && (app.category || '').toLowerCase().includes('customer service')) ||
      (appCategoryFilter === 'Translator (Multilingual)' && (app.category || '').toLowerCase().includes('translator')) ||
      (appCategoryFilter === 'Technical Support Agent' && (app.category || '').toLowerCase().includes('technical support'));

    const matchesStatus = appStatusFilter === 'All' || app.status === appStatusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F4F9FC] dark:bg-[#020617] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#FC9905]" />
      </div>
    );
  }

  // If not signed in, render elegant auth UI
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F4F9FC] dark:bg-[#020617] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-[#1E293B] rounded-3xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-800"
        >
          <div className="p-8 text-center bg-gradient-to-br from-[#110195] to-[#FC9905]/80 text-white relative">
            <div className="mx-auto w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Portail Admin / Admin Portal</h2>
            <p className="text-white/80 text-sm mt-1">Gérer les témoignages et messages / Manage data</p>
          </div>

          <form onSubmit={handleAuthSubmit} className="p-8 space-y-4">
            {authError && (
              <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-100 dark:border-red-900/50">
                {authError}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Adresse E-mail / Email Address
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none transition-shadow"
                placeholder="contact@overseastaffingsolutions.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Autorisé : / Authorized: <span className="font-mono">contact@overseastaffingsolutions.com</span>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mot de passe / Password
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none transition-shadow"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isAuthSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#110195] to-[#FC9905] text-white font-medium rounded-xl hover:shadow-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isAuthSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              Se connecter / Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Render dashboard when authenticated
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-[#1E293B] dark:text-[#E2E8F0] flex flex-col md:flex-row antialiased font-sans">
      {/* Left Sidebar - Sticky/Fixed full height on desktop */}
      <aside className="w-full md:w-72 bg-[#0C0268] dark:bg-[#0F172A] text-white flex flex-col justify-between shrink-0 md:sticky md:top-0 md:h-screen shadow-2xl z-30 border-r border-indigo-900/40 dark:border-gray-800">
        
        {/* Top Sidebar Area */}
        <div className="flex flex-col h-full overflow-y-auto scrollbar-none">
          {/* Brand & Logo Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FC9905] to-amber-300 p-1.5 flex items-center justify-center text-slate-900 shadow-md shrink-0">
                <img src="https://i.postimg.cc/xjL3Jnyp/profl-simple.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-base leading-tight text-white tracking-tight truncate">
                  Oversea Staffing
                </h2>
                <span className="text-[11px] text-amber-300/90 font-semibold tracking-wider uppercase block truncate">
                  Portail Admin v2.0
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="p-4 flex-1">
            <p className="px-3 mb-3 text-[11px] font-bold text-indigo-200/60 dark:text-gray-400 uppercase tracking-widest">
              Navigation / Menu
            </p>

            <nav className="space-y-1.5">
              {/* Applications Tab */}
              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-semibold text-sm group ${
                  activeTab === 'applications'
                    ? 'bg-gradient-to-r from-[#FC9905] to-[#f39100] text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                    : 'text-indigo-100/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Briefcase className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${activeTab === 'applications' ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span className="truncate">Candidatures</span>
                </div>
                {applications.length > 0 && (
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold shrink-0 ${
                    activeTab === 'applications' ? 'bg-slate-950 text-amber-300' : 'bg-[#FC9905] text-white'
                  }`}>
                    {applications.length}
                  </span>
                )}
              </button>

              {/* Testimonials Tab */}
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-semibold text-sm group ${
                  activeTab === 'testimonials'
                    ? 'bg-gradient-to-r from-[#FC9905] to-[#f39100] text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                    : 'text-indigo-100/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <MessageSquare className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${activeTab === 'testimonials' ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span className="truncate">Témoignages</span>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold shrink-0 ${
                  activeTab === 'testimonials' ? 'bg-slate-950 text-amber-300' : 'bg-white/15 text-indigo-100'
                }`}>
                  {testimonials.length}
                </span>
              </button>

              {/* Contacts Tab */}
              <button
                onClick={() => setActiveTab('contacts')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-semibold text-sm group ${
                  activeTab === 'contacts'
                    ? 'bg-gradient-to-r from-[#FC9905] to-[#f39100] text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                    : 'text-indigo-100/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${activeTab === 'contacts' ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span className="truncate">Messages Contact</span>
                </div>
                {contacts.length > 0 && (
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold shrink-0 ${
                    activeTab === 'contacts' ? 'bg-slate-950 text-amber-300' : 'bg-[#FC9905] text-white'
                  }`}>
                    {contacts.length}
                  </span>
                )}
              </button>

              {/* Gateway Security Tab */}
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-semibold text-sm group ${
                  activeTab === 'security'
                    ? 'bg-gradient-to-r from-[#FC9905] to-[#f39100] text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                    : 'text-indigo-100/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <KeyRound className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${activeTab === 'security' ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span className="truncate">Mot de Passe Gateway</span>
                </div>
              </button>
            </nav>

            {/* Link back to public site */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <a
                href="/"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-indigo-200/80 hover:bg-white/10 hover:text-white transition-all group"
              >
                <Globe className="w-4 h-4 text-amber-400 shrink-0 group-hover:rotate-12 transition-transform" />
                <span>Voir le site public</span>
              </a>
            </div>
          </div>

          {/* Bottom User Bar */}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-[#FC9905] text-slate-950 font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">
                    {currentUser.email}
                  </p>
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Administrateur
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-rose-300 hover:text-white hover:bg-rose-600/30 rounded-xl transition-all shrink-0"
                title="Se déconnecter / Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Right Content Area */}
      <main className="flex-1 min-w-0 bg-[#F4F9FC] dark:bg-[#090D16] min-h-screen flex flex-col">
        {/* Header Bar */}
        <header className="bg-white dark:bg-[#1E293B] border-b border-gray-200/80 dark:border-gray-800 px-6 lg:px-10 py-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-bold text-[#110195] dark:text-white tracking-tight">
              {activeTab === 'applications' && 'Candidatures Reçues'}
              {activeTab === 'testimonials' && 'Avis & Témoignages'}
              {activeTab === 'contacts' && 'Messages de Contact'}
              {activeTab === 'security' && 'Sécurité & Accès Gateway'}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {activeTab === 'applications' && 'Consultez et gérez toutes les candidatures transmises par les chercheurs d’emploi.'}
              {activeTab === 'testimonials' && 'Publiez, éditez et modérez les retours clients affichés sur le site.'}
              {activeTab === 'contacts' && 'Consultez les demandes et messages envoyés via le formulaire de contact.'}
              {activeTab === 'security' && 'Sécurisez votre compte administrateur en modifiant le mot de passe d’accès.'}
            </p>
          </div>

          {/* Header Quick Metrics */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
            <div className="bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs font-medium shrink-0">
              <Briefcase className="w-3.5 h-3.5 text-[#110195] dark:text-amber-400" />
              <span className="text-gray-600 dark:text-gray-300">Candidatures:</span>
              <span className="font-bold text-[#110195] dark:text-white">{applications.length}</span>
            </div>
            <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs font-medium shrink-0">
              <Mail className="w-3.5 h-3.5 text-[#FC9905]" />
              <span className="text-gray-600 dark:text-gray-300">Messages:</span>
              <span className="font-bold text-[#FC9905]">{contacts.length}</span>
            </div>
          </div>
        </header>

        {/* Offline Banner (State 5: Offline State) */}
        {isOffline && (
          <div className="bg-amber-500 text-slate-950 px-6 py-3 font-semibold text-xs flex items-center justify-between gap-4 shadow-md z-30">
            <div className="flex items-center gap-2.5">
              <WifiOff className="w-4 h-4 text-slate-950 animate-bounce shrink-0" />
              <span>
                <strong>Mode Hors Ligne :</strong> Connexion Internet interrompue. Vos modifications locales seront synchronisées dès le rétablissement du réseau.
              </span>
            </div>
            <button
              onClick={() => {
                if (navigator.onLine) {
                  setIsOffline(false);
                  fetchApplications();
                  fetchContacts();
                  fetchTestimonials();
                } else {
                  alert('Toujours hors ligne. Veuillez vérifier votre connexion Wi-Fi ou Ethernet.');
                }
              }}
              className="px-3 py-1 bg-slate-950 text-amber-400 font-bold rounded-lg text-[11px] hover:bg-slate-900 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Vérifier
            </button>
          </div>
        )}

        {/* Tab Contents */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'applications' && (
                <motion.div
                  key="applications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6"
                >
                  <div className="border-b border-gray-100 dark:border-gray-800 pb-5 mb-6">
                    <h2 className="text-2xl font-bold text-[#110195] dark:text-white">Soumissions de Candidatures / Applications</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Consultez et gérez toutes les candidatures reçues via le site (Customer Service Representative, Translator, Technical Support).
                    </p>
                  </div>

                  {/* Filters and Search Bar */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={appSearchQuery}
                        onChange={(e) => setAppSearchQuery(e.target.value)}
                        placeholder="Rechercher par nom, email, téléphone..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none"
                      />
                    </div>

                    <div className="relative">
                      <select
                        value={appCategoryFilter}
                        onChange={(e) => setAppCategoryFilter(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none cursor-pointer"
                      >
                        <option value="All">Toutes les catégories / All Roles</option>
                        <option value="Customer Service Representative">Customer Service Representative</option>
                        <option value="Translator (Multilingual)">Translator (Multilingual)</option>
                        <option value="Technical Support Agent">Technical Support Agent</option>
                      </select>
                    </div>

                    <div className="relative">
                      <select
                        value={appStatusFilter}
                        onChange={(e) => setAppStatusFilter(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none cursor-pointer"
                      >
                        <option value="All">Tous les statuts / All Statuses</option>
                        <option value="New">Nouveau / New</option>
                        <option value="Reviewed">Examiné / Reviewed</option>
                        <option value="Interviewed">En Entretien / Interviewed</option>
                        <option value="Hired">Engagé / Hired</option>
                        <option value="Rejected">Refusé / Rejected</option>
                      </select>
                    </div>
                  </div>

                  {/* Partial / Ideal State Metrics Bar (State 6) */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 p-3.5 rounded-xl mb-6 text-xs text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#110195] dark:text-amber-400">
                        {filteredApplications.length} candidature{filteredApplications.length > 1 ? 's' : ''} affichée{filteredApplications.length > 1 ? 's' : ''}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>Total en base : {applications.length}</span>
                      {(appSearchQuery || appCategoryFilter !== 'All' || appStatusFilter !== 'All') && (
                        <span className="bg-[#FC9905]/15 text-[#FC9905] dark:text-amber-300 px-2 py-0.5 rounded-md font-semibold">
                          Filtre actif
                        </span>
                      )}
                    </div>

                    {(appSearchQuery || appCategoryFilter !== 'All' || appStatusFilter !== 'All') && (
                      <button
                        onClick={() => {
                          setAppSearchQuery('');
                          setAppCategoryFilter('All');
                          setAppStatusFilter('All');
                        }}
                        className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 hover:underline font-semibold cursor-pointer"
                      >
                        <FilterX className="w-3.5 h-3.5" /> Réinitialiser tous les filtres
                      </button>
                    )}
                  </div>

                  {/* Error State (State 4) */}
                  {appsError && (
                    <div className="p-4 mb-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-2xl flex items-center justify-between gap-4 text-red-700 dark:text-red-300">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-red-600" />
                        <div>
                          <p className="font-bold text-sm">Erreur lors de la récupération des candidatures</p>
                          <p className="text-xs text-red-600/80 dark:text-red-300/80">{appsError}</p>
                        </div>
                      </div>
                      <button
                        onClick={fetchApplications}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Réessayer
                      </button>
                    </div>
                  )}

                  {/* Loading State Skeleton Cards (State 2) */}
                  {isApplicationsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((idx) => (
                        <div key={idx} className="border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 rounded-2xl p-6 animate-pulse space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                              <div className="space-y-2">
                                <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded-md" />
                                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded-md" />
                              </div>
                            </div>
                            <div className="h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                          </div>
                          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
                          <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md" />
                        </div>
                      ))}
                    </div>
                  ) : filteredApplications.length === 0 ? (
                    /* Empty State (State 1) */
                    <div className="text-center py-12 px-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-900/10">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-[#110195] dark:text-amber-400 flex items-center justify-center mx-auto mb-4">
                        <SearchX className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-[#110195] dark:text-white">
                        Aucune candidature trouvée
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
                        {appSearchQuery || appCategoryFilter !== 'All' || appStatusFilter !== 'All'
                          ? 'Aucune candidature ne correspond à vos filtres de recherche. Essayez de modifier les critères.'
                          : 'Aucune candidature n’a été soumise pour le moment.'}
                      </p>
                      {(appSearchQuery || appCategoryFilter !== 'All' || appStatusFilter !== 'All') && (
                        <button
                          onClick={() => {
                            setAppSearchQuery('');
                            setAppCategoryFilter('All');
                            setAppStatusFilter('All');
                          }}
                          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-[#110195] text-white rounded-xl text-xs font-bold hover:bg-[#110195]/90 transition-all cursor-pointer shadow-sm"
                        >
                          <FilterX className="w-4 h-4" /> Réinitialiser la recherche
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredApplications.map((app) => {
                        const fullName = app.name || `${app.firstName || ''} ${app.lastName || ''}`.trim() || 'Candidat Anonyme';
                        return (
                          <div
                            key={app.id}
                            className="border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20 rounded-2xl p-6 transition-all hover:border-[#110195]/40 dark:hover:border-[#FC9905]/40 shadow-sm relative overflow-hidden"
                          >
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 pb-4 border-b border-gray-200/60 dark:border-gray-800">
                              <div>
                                <div className="flex flex-wrap items-center gap-3">
                                  <span className="font-bold text-xl text-[#110195] dark:text-white">
                                    {fullName}
                                  </span>
                                  <span className="bg-[#110195]/10 text-[#110195] dark:bg-[#FC9905]/10 dark:text-[#FC9905] text-xs px-3 py-1 rounded-full font-semibold">
                                    {app.category || 'General Application'}
                                  </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                                  <a href={`mailto:${app.email}`} className="flex items-center gap-1 hover:text-[#FC9905]">
                                    <Mail className="w-3.5 h-3.5" /> {app.email}
                                  </a>
                                  <a href={`tel:${app.phone}`} className="flex items-center gap-1 hover:text-[#FC9905]">
                                    <Phone className="w-3.5 h-3.5" /> {app.phone}
                                  </a>
                                  {app.date && (
                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                      <Calendar className="w-3.5 h-3.5" /> {app.date}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-3 self-end lg:self-auto">
                                <select
                                  value={app.status || 'New'}
                                  onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border outline-none cursor-pointer ${
                                    app.status === 'Hired'
                                      ? 'bg-green-100 text-green-800 border-green-300 dark:bg-green-950 dark:text-green-300'
                                      : app.status === 'Interviewed'
                                      ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300'
                                      : app.status === 'Reviewed'
                                      ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                                      : app.status === 'Rejected'
                                      ? 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-300'
                                      : 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
                                  }`}
                                >
                                  <option value="New">Nouveau / New</option>
                                  <option value="Reviewed">Examiné / Reviewed</option>
                                  <option value="Interviewed">En Entretien / Interviewed</option>
                                  <option value="Hired">Engagé / Hired</option>
                                  <option value="Rejected">Refusé / Rejected</option>
                                </select>

                                <button
                                  onClick={() => handleDeleteApplication(app.id, fullName)}
                                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                                  title="Supprimer la candidature"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Cover Letter */}
                            {app.coverLetter && (
                              <div className="mb-4 bg-white dark:bg-[#0F172A] p-4 rounded-xl border border-gray-100 dark:border-gray-800 text-sm">
                                <span className="font-semibold text-xs text-gray-400 block mb-1 uppercase tracking-wider">Lettre de Motivation / Cover Letter</span>
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{app.coverLetter}</p>
                              </div>
                            )}

                            {/* Resume / CV PDF Download & View */}
                            <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#0F172A] p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                              <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-[#FC9905]" />
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                  {app.resumeName || 'CV / Resume'}
                                </span>
                              </div>

                              {app.resumeData ? (
                                <a
                                  href={app.resumeData}
                                  download={app.resumeName || `${fullName}_CV.pdf`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#110195] text-white hover:bg-[#110195]/90 text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
                                >
                                  <Download className="w-3.5 h-3.5" /> Télécharger / Voir CV
                                </a>
                              ) : (
                                <span className="text-xs text-gray-400 italic">
                                  {app.resumeName ? `Fichier: ${app.resumeName}` : 'Aucun fichier joint'}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {/* Limits State (State 8: Fin des résultats) */}
                      <div className="pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900/50 px-4 py-2 rounded-full border border-gray-100 dark:border-gray-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          Fin des résultats • Les {filteredApplications.length} candidatures ont été complètement chargées.
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'testimonials' && (
                <motion.div
                  key="testimonials"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#110195] dark:text-white">Témoignages & Avis Clients</h2>
                      <p className="text-gray-500 dark:text-gray-400 mt-1">Ajoutez, éditez ou supprimez les retours d'expérience affichés sur le site.</p>
                    </div>
                    <button 
                      onClick={() => handleOpenModal()}
                      className="flex items-center gap-2 bg-[#FC9905] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#e08804] transition-colors shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Nouveau Témoignage
                    </button>
                  </div>

                  {/* Partial / Ideal State metrics bar */}
                  <div className="flex items-center justify-between bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 p-3 rounded-xl mb-6 text-xs text-gray-700 dark:text-gray-300">
                    <span className="font-bold text-[#110195] dark:text-amber-400">
                      {testimonials.length} témoignage{testimonials.length > 1 ? 's' : ''} publié{testimonials.length > 1 ? 's' : ''}
                    </span>
                    <span className="text-gray-400 text-[11px]">Dernière synchronisation réussie</span>
                  </div>

                  {/* Error State */}
                  {testimonialsError && (
                    <div className="p-4 mb-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-2xl flex items-center justify-between gap-4 text-red-700 dark:text-red-300">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-red-600" />
                        <div>
                          <p className="font-bold text-sm">Erreur lors du chargement des témoignages</p>
                          <p className="text-xs text-red-600/80 dark:text-red-300/80">{testimonialsError}</p>
                        </div>
                      </div>
                      <button
                        onClick={fetchTestimonials}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Réessayer
                      </button>
                    </div>
                  )}

                  {/* Loading State Skeleton */}
                  {isTestimonialsLoading ? (
                    <div className="space-y-4">
                      {[1, 2].map((idx) => (
                        <div key={idx} className="border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 rounded-xl p-4 animate-pulse space-y-3">
                          <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded-md" />
                          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded-md" />
                          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
                        </div>
                      ))}
                    </div>
                  ) : testimonials.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-12 px-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-900/10">
                      <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-[#FC9905] flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-[#110195] dark:text-white">
                        Aucun témoignage enregistré
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
                        Vous n'avez actuellement aucun témoignage dans la base de données.
                      </p>
                      <button
                        onClick={() => handleOpenModal()}
                        className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-[#FC9905] text-white rounded-xl text-xs font-bold hover:bg-[#e08804] transition-all cursor-pointer shadow-sm"
                      >
                        <Plus className="w-4 h-4" /> Ajouter le premier témoignage
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                           <div className="flex-1 min-w-0">
                             <h4 className="font-bold text-[#1E293B] dark:text-white truncate">{testimonial.author}</h4>
                             <span className="text-sm text-gray-500 dark:text-gray-400 block mb-2 truncate">{testimonial.role}</span>
                             <p className="text-[#1E293B]/80 dark:text-gray-300 text-sm italic leading-relaxed break-words">
                               "{testimonial.quote}"
                             </p>
                           </div>
                           <div className="flex items-center gap-2 shrink-0 self-end md:self-auto pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800/50 w-full md:w-auto justify-end">
                              <button 
                                onClick={() => handleOpenModal(testimonial)}
                                className="p-2.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors focus:ring-2 focus:ring-blue-400 outline-none cursor-pointer"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete(testimonial.id, testimonial.author)}
                                className="p-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors focus:ring-2 focus:ring-red-400 outline-none cursor-pointer"
                                title="Supprimer le témoignage"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                      ))}

                      {/* Limits State */}
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900/50 px-4 py-1.5 rounded-full border border-gray-100 dark:border-gray-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          Fin des résultats • {testimonials.length} témoignages chargés.
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'contacts' && (
                <motion.div
                  key="contacts"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#110195] dark:text-white">Messages de Contact</h2>
                      <p className="text-gray-500 dark:text-gray-400 mt-1">Examinez les questions et demandes soumises via le formulaire de contact.</p>
                    </div>
                    
                    {/* Search bar */}
                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Rechercher par nom, email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-1 focus:ring-[#FC9905] outline-none"
                      />
                    </div>
                  </div>

                  {/* Partial / Ideal State metrics bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 p-3 rounded-xl mb-6 text-xs text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#FC9905]">
                        {filteredContacts.length} message{filteredContacts.length > 1 ? 's' : ''} trouvé{filteredContacts.length > 1 ? 's' : ''}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>Total en base : {contacts.length}</span>
                    </div>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-xs text-red-600 dark:text-red-400 hover:underline font-semibold cursor-pointer"
                      >
                        Effacer la recherche
                      </button>
                    )}
                  </div>

                  {/* Error State */}
                  {contactsError && (
                    <div className="p-4 mb-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-2xl flex items-center justify-between gap-4 text-red-700 dark:text-red-300">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-red-600" />
                        <div>
                          <p className="font-bold text-sm">Erreur lors de la récupération des messages</p>
                          <p className="text-xs text-red-600/80 dark:text-red-300/80">{contactsError}</p>
                        </div>
                      </div>
                      <button
                        onClick={fetchContacts}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Réessayer
                      </button>
                    </div>
                  )}

                  {/* Loading State Skeleton */}
                  {isContactsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((idx) => (
                        <div key={idx} className="border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 rounded-2xl p-6 animate-pulse space-y-3">
                          <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded-md" />
                          <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded-md" />
                          <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl" />
                        </div>
                      ))}
                    </div>
                  ) : filteredContacts.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-12 px-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-900/10">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-[#110195] dark:text-amber-400 flex items-center justify-center mx-auto mb-4">
                        <Inbox className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-[#110195] dark:text-white">
                        Aucun message de contact
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
                        {searchQuery
                          ? 'Aucun message ne correspond à votre filtre de recherche.'
                          : 'Votre boîte de réception est vide pour le moment.'}
                      </p>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-[#110195] text-white rounded-xl text-xs font-bold hover:bg-[#110195]/90 transition-all cursor-pointer shadow-sm"
                        >
                          Effacer la recherche
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredContacts.map((contact) => (
                        <div 
                          key={contact.id} 
                          className="border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 transition-all hover:bg-gray-50 dark:hover:bg-gray-900/40 relative overflow-hidden"
                        >
                          {/* Top indicator bar */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#110195] to-[#FC9905]/50"></div>

                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                            <div className="min-w-0 w-full md:w-auto">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-[#FC9905] shrink-0" />
                                <span className="font-bold text-[#1E293B] dark:text-white text-lg truncate">
                                  {contact.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1 min-w-0">
                                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                <a 
                                  href={`mailto:${contact.email}`} 
                                  className="text-sm text-[#110195] dark:text-[#FC9905] hover:underline break-all"
                                >
                                  {contact.email}
                                </a>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 dark:border-gray-850 pt-3 md:pt-0 mt-2 md:mt-0 min-w-0">
                              {contact.createdAt && (
                                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                                  <span className="whitespace-nowrap">
                                    {new Date(contact.createdAt).toLocaleDateString()} {new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              )}
                              
                              <button 
                                onClick={() => handleDeleteContact(contact.id, contact.name)}
                                className="p-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors focus:ring-2 focus:ring-red-400 outline-none cursor-pointer"
                                title="Supprimer le message"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-[#1E293B] rounded-xl p-4 border border-gray-100 dark:border-gray-850 shadow-sm">
                            <p className="text-[#1E293B]/90 dark:text-gray-300 text-sm whitespace-pre-wrap leading-relaxed font-light break-words">
                              {contact.message}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Limits State */}
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900/50 px-4 py-1.5 rounded-full border border-gray-100 dark:border-gray-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          Fin des résultats • Tous les {filteredContacts.length} messages sont affichés.
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6"
                >
                  <div className="border-b border-gray-100 dark:border-gray-800 pb-5 mb-6">
                    <h2 className="text-2xl font-bold text-[#110195] dark:text-white">Sécurité du Portail / Gateway Security</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Sécurisez votre accès administrateur en modifiant le mot de passe d’identification. / Secure your access by changing the password.
                    </p>
                  </div>

                  <form onSubmit={handleUpdatePassword} className="max-w-md space-y-5">
                    {/* Success State (State 3) */}
                    {securitySuccess && (
                      <div className="p-4 rounded-xl text-green-700 bg-green-50 dark:bg-green-950/30 dark:text-green-400 border border-green-200 dark:border-green-900/50 flex items-center gap-3">
                        <CheckCircle size={20} className="shrink-0 text-green-500" />
                        <span className="text-sm font-medium">{securitySuccess}</span>
                      </div>
                    )}

                    {/* Error State (State 4) */}
                    {securityError && (
                      <div className="p-4 rounded-xl text-red-700 bg-red-50 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-900/50 flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
                        <span className="text-sm font-medium">{securityError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Mot de passe actuel / Current Password
                      </label>
                      <input
                        required
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none transition-shadow text-sm"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Nouveau mot de passe / New Password
                      </label>
                      <input
                        required
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none transition-shadow text-sm"
                        placeholder="••••••••"
                      />

                      {/* Interactive Validation / Strength State (State 7) */}
                      {newPassword.length > 0 && (
                        <div className="mt-2.5 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Longueur minimale (6+ caractères) :</span>
                            <span className={newPassword.length >= 6 ? 'text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1' : 'text-amber-600 dark:text-amber-400 font-medium'}>
                              {newPassword.length >= 6 ? '✓ Valide' : `${newPassword.length}/6`}
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${
                                newPassword.length < 6 ? 'bg-amber-400 w-1/3' : newPassword.length < 10 ? 'bg-blue-500 w-2/3' : 'bg-emerald-500 w-full'
                              }`} 
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Confirmer le nouveau mot de passe / Confirm Password
                      </label>
                      <input
                        required
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none transition-shadow text-sm"
                        placeholder="••••••••"
                      />

                      {/* Match Validation Indicator (State 7) */}
                      {confirmPassword.length > 0 && (
                        <p className={`text-xs mt-1.5 font-medium flex items-center gap-1 ${
                          newPassword === confirmPassword ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
                        }`}>
                          {newPassword === confirmPassword ? '✓ Les mots de passe correspondent' : '✕ Les mots de passe ne correspondent pas'}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSecuritySubmitting || newPassword.length < 6 || newPassword !== confirmPassword}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#110195] to-[#FC9905] text-white font-semibold rounded-xl hover:shadow-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer text-sm"
                      >
                        {isSecuritySubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                        Mettre à jour le mot de passe
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-lg text-[#110195] dark:text-white">
                  {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author Name</label>
                  <input
                    required
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none transition-shadow"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role / Company</label>
                  <input
                    required
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none transition-shadow"
                    placeholder="CEO, Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quote</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none transition-shadow resize-none"
                    placeholder="Their service was incredible..."
                  />
                </div>
                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FC9905] text-white font-medium hover:bg-[#e08804] disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save Testimonial
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Custom Confirmation Modal for Deletion */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white relative overflow-hidden"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 shadow-xs">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                    {deleteTarget.title}
                  </h3>
                  <p className="text-xs text-red-600 dark:text-red-400 font-semibold mt-0.5">
                    Attention : Action irréversible
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 bg-gray-50 dark:bg-gray-900/50 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800">
                {deleteTarget.subtitle}
              </p>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Annuler
                </button>

                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={confirmDelete}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Suppression...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Oui, supprimer
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#110195] dark:bg-[#1E293B] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-indigo-400/30"
          >
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
