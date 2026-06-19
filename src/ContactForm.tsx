import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from './firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Enregistrer dans Firebase / Save to Firebase
      try {
        await addDoc(collection(db, 'contacts'), {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          createdAt: new Date().toISOString()
        });
      } catch (firestoreErr) {
        handleFirestoreError(firestoreErr, OperationType.CREATE, 'contacts');
      }

      // 2. Envoyer par e-mail via FormSubmit (optionnel en arrière-plan) / Send via FormSubmit
      try {
        await fetch("https://formsubmit.co/ajax/contact@overseastaffingsolutions.com", {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: "New Contact Form Submission from Oversea Staffing Solutions"
          })
        });
      } catch (submitError) {
        console.warn("Silent failure sending formsubmit:", submitError);
      }
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error", error);
      alert("Erreur lors de l'envoi du message. / Failed to submit your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white dark:bg-[#1E293B] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-[#FC9905]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-[#110195]/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[45%] text-center lg:text-left"
          >
            <span className="text-[#FC9905] font-semibold tracking-wider text-sm mb-3 block uppercase">{t('contact.badge')}</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#110195] dark:text-white mb-6 leading-tight">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-[#1E293B] dark:text-[#E2E8F0] font-light leading-relaxed mb-8">
              {t('contact.subtitle')}
            </p>
            
            <div className="space-y-6 hidden lg:block border-l-2 border-[#110195]/10 dark:border-white/10 pl-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F4F9FC] dark:bg-[#0F172A] flex items-center justify-center text-[#110195] dark:text-white flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-[#110195] dark:text-white mb-1">{t('contact.email')}</h4>
                  <p className="text-[#1E293B] dark:text-[#E2E8F0] font-light">contact@overseastaffingsolutions.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F4F9FC] dark:bg-[#0F172A] flex items-center justify-center text-[#110195] dark:text-white flex-shrink-0">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-[#110195] dark:text-white mb-1">{t('contact.livechat')}</h4>
                  <p className="text-[#1E293B] dark:text-[#E2E8F0] font-light">{t('contact.availability')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[55%]"
          >
            <div className="bg-white dark:bg-[#0F172A] p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/20 border border-gray-100 dark:border-white/5 relative">
              
              {/* Success Message Overlay */}
              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-20 bg-white/95 dark:bg-[#0F172A]/95 rounded-2xl flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm"
                >
                  <div className="w-20 h-20 bg-[#FC9905]/10 rounded-full flex items-center justify-center text-[#FC9905] mb-6">
                    <Send size={32} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#110195] dark:text-white mb-3">Message Sent!</h3>
                  <p className="text-[#1E293B] dark:text-[#E2E8F0] max-w-sm">Thank you for reaching out. A member of our team will get back to you within 24 hours.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#1E293B] dark:text-[#E2E8F0] mb-2 px-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3.5 bg-[#F4F9FC] dark:bg-[#1E293B] border border-transparent dark:border-white/5 focus:border-[#FC9905] focus:bg-white dark:focus:bg-[#0F172A] rounded-xl outline-none transition-all duration-300 text-[#1E293B] dark:text-white placeholder-gray-400"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1E293B] dark:text-[#E2E8F0] mb-2 px-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3.5 bg-[#F4F9FC] dark:bg-[#1E293B] border border-transparent dark:border-white/5 focus:border-[#FC9905] focus:bg-white dark:focus:bg-[#0F172A] rounded-xl outline-none transition-all duration-300 text-[#1E293B] dark:text-white placeholder-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#1E293B] dark:text-[#E2E8F0] mb-2 px-1">Your Message</label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3.5 bg-[#F4F9FC] dark:bg-[#1E293B] border border-transparent dark:border-white/5 focus:border-[#FC9905] focus:bg-white dark:focus:bg-[#0F172A] rounded-xl outline-none transition-all duration-300 text-[#1E293B] dark:text-white placeholder-gray-400 resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#FC9905] hover:bg-[#E08804] text-white rounded-xl font-semibold text-lg flex justify-center items-center gap-3 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#FC9905]/20"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
