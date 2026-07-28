import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, Send, CheckCircle, Briefcase, Paperclip } from 'lucide-react';
import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

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

export default function ApplicationForm() {
  const { t } = useLanguage();
  const { jobId } = useParams<{ jobId: string }>();

  const getJobTitle = (id: string | undefined): string => {
    if (!id) return t('app.general_role');
    const norm = id.toLowerCase();
    if (norm === 'customer-service-representative' || norm === 'csr') {
      return t('job.csr.title');
    }
    if (norm === 'translator') {
      return t('job.trans.title');
    }
    if (norm === 'technical-support' || norm === 'tech-support') {
      return t('job.tech.title');
    }
    return t('app.general_role');
  };

  const jobTitle = getJobTitle(jobId);
  const actualRoleId = jobId || 'general';
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getCategory = (id: string | undefined): string => {
    if (!id) return 'General Application';
    const norm = id.toLowerCase();
    if (norm === 'customer-service-representative' || norm === 'csr') {
      return 'Customer Service Representative';
    }
    if (norm === 'translator') {
      return 'Translator (Multilingual)';
    }
    if (norm === 'technical-support' || norm === 'tech-support') {
      return 'Technical Support Agent';
    }
    return 'General Application';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 700 * 1024) {
        setFileError('Le fichier est trop volumineux (max 700 Ko). Veuillez choisir un document plus petit. / File too large (max 700 KB).');
        setFileName(null);
        setFileBase64(null);
        e.target.value = '';
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFileBase64(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const category = getCategory(jobId);
      try {
        await addDoc(collection(db, 'applications'), {
          firstName: formData.firstName,
          lastName: formData.lastName,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          coverLetter: formData.coverLetter || '',
          category: category,
          roleId: actualRoleId,
          resumeName: fileName || 'Resume.pdf',
          resumeData: fileBase64 || '',
          status: 'New',
          date: new Date().toISOString().split('T')[0],
          createdAt: serverTimestamp()
        });
      } catch (firestoreErr) {
        handleFirestoreError(firestoreErr, OperationType.CREATE, 'applications');
      }
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting application", error);
      alert(t('app.error_submit'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F9FC] dark:bg-[#020617] text-[#1E293B] dark:text-[#E2E8F0] transition-colors duration-300 pt-0">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#110195] via-[#110195] to-[#FC9905] pt-[160px] pb-16 md:pt-[180px] md:pb-24 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(252,153,5,0.1),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <nav className="flex text-sm text-white/70" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li>
                  <Link to="/" className="hover:text-[#FC9905] transition-colors">{t('app.breadcrumb.home')}</Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <Link to="/#careers" className="hover:text-[#FC9905] transition-colors">{t('app.breadcrumb.careers')}</Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-white font-medium">{t('app.breadcrumb.apply')}</span>
                </li>
              </ol>
            </nav>

            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 self-start text-sm font-medium px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10 hover:border-white/20 backdrop-blur-sm shadow-sm"
            >
              <ArrowLeft size={16} /> {t('app.back_job')}
            </button>
          </div>

          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#FC9905] font-semibold tracking-wider text-sm mb-4 block uppercase flex items-center gap-2"
            >
              <Briefcase size={16} /> {t('app.badge')}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {t('app.apply_for')} {jobTitle}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 font-light leading-relaxed"
            >
              {t('app.hero_desc')}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="bg-white dark:bg-[#1E293B] shadow-xl rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">{t('app.first_name')}</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-xl bg-[#F4F9FC] dark:bg-[#0F172A] border-none text-[#1E293B] dark:text-white focus:ring-2 focus:ring-[#110195] dark:focus:ring-[#FC9905] transition-shadow placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">{t('app.last_name')}</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-xl bg-[#F4F9FC] dark:bg-[#0F172A] border-none text-[#1E293B] dark:text-white focus:ring-2 focus:ring-[#110195] dark:focus:ring-[#FC9905] transition-shadow placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">{t('app.email')}</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-xl bg-[#F4F9FC] dark:bg-[#0F172A] border-none text-[#1E293B] dark:text-white focus:ring-2 focus:ring-[#110195] dark:focus:ring-[#FC9905] transition-shadow placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">{t('app.phone')}</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-xl bg-[#F4F9FC] dark:bg-[#0F172A] border-none text-[#1E293B] dark:text-white focus:ring-2 focus:ring-[#110195] dark:focus:ring-[#FC9905] transition-shadow placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">{t('app.resume_label')}</label>
                <div className="relative border-2 border-dashed border-[#110195]/20 dark:border-[#FC9905]/20 rounded-2xl bg-[#F4F9FC]/50 dark:bg-[#0F172A]/50 p-8 text-center hover:bg-[#F4F9FC] dark:hover:bg-[#0F172A] transition-colors group">
                  <input 
                    type="file" 
                    id="resume" 
                    name="resume" 
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#110195]/10 dark:bg-[#FC9905]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {fileName ? <Paperclip className="w-6 h-6 text-[#110195] dark:text-[#FC9905]" /> : <Upload className="w-6 h-6 text-[#110195] dark:text-[#FC9905]" />}
                    </div>
                    {fileName ? (
                      <span className="text-[#1E293B] dark:text-white font-medium">{fileName}</span>
                    ) : (
                      <>
                        <span className="text-[#1E293B] dark:text-white font-medium">{t('app.resume_drop')}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{t('app.resume_hint')}</span>
                      </>
                    )}
                  </div>
                </div>
                {fileError && (
                  <p className="text-xs text-red-500 mt-2 font-medium">{fileError}</p>
                )}
              </div>

              <div className="mb-8">
                <label htmlFor="coverLetter" className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">{t('app.cover_letter')}</label>
                <textarea 
                  id="coverLetter" 
                  name="coverLetter" 
                  rows={5}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl bg-[#F4F9FC] dark:bg-[#0F172A] border-none text-[#1E293B] dark:text-white focus:ring-2 focus:ring-[#110195] dark:focus:ring-[#FC9905] transition-shadow placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                  placeholder={t('app.cover_placeholder')}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FC9905] to-[#110195] text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="w-6 h-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <Send size={18} /> {t('app.submit')}
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                {t('app.disclaimer')}
              </p>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-[#1E293B] shadow-xl rounded-3xl p-12 lg:p-16 text-center border border-gray-100 dark:border-gray-800"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
              </motion.div>
              <h2 className="text-3xl font-display font-bold text-[#0B2B5B] dark:text-white mb-4">
                {t('app.success_title')}
              </h2>
              <p className="text-lg text-[#1E293B]/70 dark:text-[#E2E8F0]/70 mb-8 max-w-md mx-auto">
                {t('app.success_desc_1')}<strong>{jobTitle}</strong>{t('app.success_desc_2')}
              </p>
              <Link 
                to="/#careers" 
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#FC9905] to-[#110195] text-white hover:scale-105 hover:shadow-lg transition-all font-medium"
              >
                <ArrowLeft size={18} /> {t('app.explore_roles')}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
