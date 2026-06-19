import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { Settings, MessageSquare, Plus, Edit2, Trash2, X, Loader2, LogOut, KeyRound, Mail, Calendar, User, Search, CheckCircle } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'testimonials' | 'contacts' | 'security'>('testimonials');
  
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

  // Security (Gateway Password) State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');
  const [securityError, setSecurityError] = useState('');
  const [isSecuritySubmitting, setIsSecuritySubmitting] = useState(false);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) {
        fetchTestimonials();
        fetchContacts();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchTestimonials = async () => {
    setIsTestimonialsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'testimonials'));
      const fetched: Testimonial[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as Testimonial);
      });
      setTestimonials(fetched);
    } catch (error) {
      console.warn('Could not fetch testimonials:', error);
    } finally {
      setIsTestimonialsLoading(false);
    }
  };

  const fetchContacts = async () => {
    setIsContactsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'contacts'));
      const fetched: ContactDoc[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as ContactDoc);
      });
      // Sort Contacts by Date (newest first)
      fetched.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      setContacts(fetched);
    } catch (error) {
      console.warn('Could not fetch contacts:', error);
    } finally {
      setIsContactsLoading(false);
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
    try {
      if (editingId) {
        await updateDoc(doc(db, 'testimonials', editingId), { ...formData });
      } else {
        await addDoc(collection(db, 'testimonials'), {
          ...formData,
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

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial? / Voulez-vous vraiment supprimer ce témoignage ?')) return;
    try {
      await deleteDoc(doc(db, 'testimonials', id));
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial.');
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message? / Voulez-vous vraiment supprimer ce message ?')) return;
    try {
      await deleteDoc(doc(db, 'contacts', id));
      setContacts(contacts.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Error deleting contact message:', error);
      alert('Failed to delete message.');
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
      <div className="min-h-screen bg-[#F4F9FC] dark:bg-[#020617] pt-32 pb-16 flex items-center justify-center px-4">
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
    <div className="min-h-screen bg-[#F4F9FC] dark:bg-[#020617] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 w-full">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 md:w-10 md:h-10 text-[#110195] dark:text-[#FC9905] shrink-0" />
            <h1 className="text-2xl md:text-4xl font-display font-bold text-[#110195] dark:text-white break-words">
              Admin Dashboard
            </h1>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto bg-white dark:bg-[#1E293B] px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium truncate max-w-[180px] sm:max-w-none">
              {currentUser.email}
            </span>
            <button
              onClick={handleLogout}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-semibold shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0 overflow-x-auto md:overflow-visible scrollbar-none pb-2 md:pb-0">
            <nav className="flex flex-row md:flex-col gap-2 min-w-max md:min-w-0">
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap shrink-0 ${
                  activeTab === 'testimonials'
                    ? 'bg-[#110195] text-white shadow-md'
                    : 'bg-white dark:bg-[#1E293B] text-[#1E293B] dark:text-[#E2E8F0] hover:bg-gray-50 dark:hover:bg-[#334155]'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                Testimonials
              </button>
              
              <button
                onClick={() => setActiveTab('contacts')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap shrink-0 ${
                  activeTab === 'contacts'
                    ? 'bg-[#110195] text-white shadow-md'
                    : 'bg-white dark:bg-[#1E293B] text-[#1E293B] dark:text-[#E2E8F0] hover:bg-gray-50 dark:hover:bg-[#334155]'
                }`}
              >
                <Mail className="w-5 h-5" />
                Contact Messages
                {contacts.length > 0 && (
                  <span className="ml-2 bg-[#FC9905] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {contacts.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap shrink-0 ${
                  activeTab === 'security'
                    ? 'bg-[#110195] text-white shadow-md'
                    : 'bg-white dark:bg-[#1E293B] text-[#E2E8F0] dark:text-[#E2E8F0] hover:bg-gray-50 dark:hover:bg-[#334155]'
                }`}
              >
                <KeyRound className="w-5 h-5" />
                Mot de Passe Gateway
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'testimonials' && (
                <motion.div
                  key="testimonials"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-[#110195] dark:text-white">Manage Testimonials</h2>
                      <p className="text-gray-500 dark:text-gray-400 mt-1">Add, edit, or remove client testimonials.</p>
                    </div>
                    <button 
                      onClick={() => handleOpenModal()}
                      className="flex items-center gap-2 bg-[#FC9905] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#e08804] transition-colors shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add New
                    </button>
                  </div>

                  {isTestimonialsLoading ? (
                    <div className="flex justify-center p-8">
                      <Loader2 className="w-8 h-8 animate-spin text-[#FC9905]" />
                    </div>
                  ) : testimonials.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 p-8">No testimonials found. Create one!</p>
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
                                className="p-2.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors focus:ring-2 focus:ring-blue-400 outline-none"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete(testimonial.id)}
                                className="p-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors focus:ring-2 focus:ring-red-400 outline-none"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                      ))}
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
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-[#110195] dark:text-white">Contact Messages</h2>
                      <p className="text-gray-500 dark:text-gray-400 mt-1">Review inquiries received via the Contact Form.</p>
                    </div>
                    
                    {/* Search bar */}
                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search queries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-1 focus:ring-[#FC9905] outline-none"
                      />
                    </div>
                  </div>

                  {isContactsLoading ? (
                    <div className="flex justify-center p-8">
                      <Loader2 className="w-8 h-8 animate-spin text-[#FC9905]" />
                    </div>
                  ) : filteredContacts.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 p-8">
                      {searchQuery ? 'No messages match your search filter.' : 'No contact messages found.'}
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
                                onClick={() => handleDeleteContact(contact.id)}
                                className="p-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors focus:ring-2 focus:ring-red-400 outline-none"
                                title="Delete message"
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
                    {securitySuccess && (
                      <div className="p-4 rounded-xl text-green-700 bg-green-50 dark:bg-green-950/30 dark:text-green-400 border border-green-200 dark:border-green-900/50 flex items-center gap-3">
                        <CheckCircle size={20} className="shrink-0 text-green-500" />
                        <span className="text-sm font-medium">{securitySuccess}</span>
                      </div>
                    )}

                    {securityError && (
                      <div className="p-4 rounded-xl text-red-700 bg-red-50 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-900/50">
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
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none transition-shadow"
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
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none transition-shadow"
                        placeholder="••••••••"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Doit contenir au moins 6 caractères. / Minimum 6 characters.
                      </p>
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
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FC9905] outline-none transition-shadow"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSecuritySubmitting}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#110195] to-[#FC9905] text-white font-semibold rounded-xl hover:shadow-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
                      >
                        {isSecuritySubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                        Mettre à jour / Update Gateway Password
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

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
    </div>
  );
}
