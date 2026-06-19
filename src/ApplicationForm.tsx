import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Send, CheckCircle, Briefcase, Paperclip } from 'lucide-react';
import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Footer from './Footer';

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

const jobTitles: Record<string, string> = {
  'customer-service-representative': 'Customer Service Representative',
  'translator': 'Translator (Multilingual)',
  'technical-support': 'Technical Support Agent',
  'general': 'General Application'
};

export default function ApplicationForm() {
  const { jobId } = useParams<{ jobId: string }>();
  const jobTitle = jobId && jobTitles[jobId] ? jobTitles[jobId] : jobTitles['general'];
  const actualRoleId = jobId || 'general';
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      try {
        await addDoc(collection(db, 'applications'), {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          date: new Date().toISOString().split('T')[0],
          roleId: actualRoleId,
          status: 'New',
          coverLetter: formData.coverLetter,
          resumeUrl: fileName || 'Uploaded File', // Since no bucket storage is set up yet
          createdAt: serverTimestamp()
        });
      } catch (firestoreErr) {
        handleFirestoreError(firestoreErr, OperationType.CREATE, 'applications');
      }
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting application", error);
      alert("Failed to submit application. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F9FC] dark:bg-[#020617] text-[#1E293B] dark:text-[#E2E8F0] transition-colors duration-300 pt-0">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#110195] via-[#110195]/90 to-[#FC9905]/10 pt-[160px] pb-16 md:pt-[180px] md:pb-24 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(252,153,5,0.1),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <nav className="flex text-sm text-white/70" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li>
                  <Link to="/" className="hover:text-[#FC9905] transition-colors">Home</Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-white/60">Careers</span>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-white font-medium">Apply</span>
                </li>
              </ol>
            </nav>

            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 self-start text-sm font-medium px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10 hover:border-white/20 backdrop-blur-sm shadow-sm"
            >
              <ArrowLeft size={16} /> Back to Job Details
            </button>
          </div>

          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#FC9905] font-semibold tracking-wider text-sm mb-4 block uppercase flex items-center gap-2"
            >
              <Briefcase size={16} /> Job Application
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Apply for {jobTitle}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 font-light leading-relaxed"
            >
              We're excited to learn more about you. Please fill out the form below to submit your application.
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
                  <label htmlFor="firstName" className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">First Name</label>
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
                  <label htmlFor="lastName" className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">Last Name</label>
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
                  <label htmlFor="email" className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">Email Address</label>
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
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">Phone Number</label>
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
                <label className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">Resume / CV (Required)</label>
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
                        <span className="text-[#1E293B] dark:text-white font-medium">Click to upload or drag and drop</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">PDF, DOC, DOCX (Max 10MB)</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="coverLetter" className="block text-sm font-semibold text-[#1E293B] dark:text-white mb-2">Cover Letter (Optional)</label>
                <textarea 
                  id="coverLetter" 
                  name="coverLetter" 
                  rows={5}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl bg-[#F4F9FC] dark:bg-[#0F172A] border-none text-[#1E293B] dark:text-white focus:ring-2 focus:ring-[#110195] dark:focus:ring-[#FC9905] transition-shadow placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                  placeholder="Tell us why you're a great fit for this role..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FC9905] to-[#110195] text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="w-6 h-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <Send size={18} /> Submit Application
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                By submitting your application, you agree to our Privacy Policy and Terms of Service.
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
                Application Submitted!
              </h2>
              <p className="text-lg text-[#1E293B]/70 dark:text-[#E2E8F0]/70 mb-8 max-w-md mx-auto">
                Thank you for applying for the <strong>{jobTitle}</strong> position. Our recruiting team will review your application and get back to you soon.
              </p>
              <Link 
                to="/careers" 
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#FC9905] to-[#110195] text-white hover:scale-105 hover:shadow-lg transition-all font-medium"
              >
                <ArrowLeft size={18} /> Explore More Roles
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
