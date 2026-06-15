import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import Footer from './Footer';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F9FC] dark:bg-[#0F172A] text-[#1E293B] dark:text-[#E2E8F0] transition-colors duration-300 pt-0">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#110195] via-[#110195]/90 to-[#FC9905]/10 pt-[160px] pb-16 md:pt-[180px] md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(252,153,5,0.1),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Actions: Breadcrumb & Back button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <nav className="flex text-sm text-white/70" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li>
                  <Link to="/" className="hover:text-[#FC9905] transition-colors">Home</Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-white font-medium">Terms of Service</span>
                </li>
              </ol>
            </nav>

            <Link 
              id="back-home-button-tos"
              to="/" 
              className="inline-flex items-center gap-2 self-start text-sm font-medium px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10 hover:border-white/20 backdrop-blur-sm shadow-sm"
            >
              <ArrowLeft size={16} /> Return to Home
            </Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FC9905]/20 text-[#FC9905] uppercase tracking-wider mb-4">
              <ShieldAlert className="w-3.5 h-3.5" /> Legal Information
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
              These Terms of Service govern your use of the Oversea Staffing Solutions website and our professional services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-[#1E293B] p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:text-[#0B2B5B] dark:prose-headings:text-white prose-a:text-[#00A9A6]">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>

              <h2>2. Description of Services</h2>
              <p>
                Oversea Staffing Solutions provides Business Process Outsourcing (BPO) services, dedicated call center operations, technical support provisioning, and professional staffing solutions. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
              </p>

              <h2>3. User Obligations</h2>
              <p>
                You agree to use our website and services only for lawful purposes. You are prohibited from violating or attempting to violate the security of the website, including, without limitation:
              </p>
              <ul>
                <li>Accessing data not intended for you or logging into a server or account which you are not authorized to access.</li>
                <li>Attempting to probe, scan, or test the vulnerability of a system or network or to breach security or authentication measures.</li>
                <li>Interfering with service to any user, host, or network (e.g., submitting a virus, overloading, "flooding," or "crashing").</li>
              </ul>

              <h2>4. Intellectual Property</h2>
              <p>
                All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of Oversea Staffing Solutions or its content suppliers and protected by international copyright and intellectual property laws.
              </p>

              <h2>5. Limitation of Liability</h2>
              <p>
                In no event shall Oversea Staffing Solutions, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>

              <h2>6. Modification of Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
              </p>

              <h2>7. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Oversea Staffing Solutions operates, without regard to its conflict of law provisions.
              </p>

              <h2>8. Contact Information</h2>
              <p>
                If you have any questions regarding these Terms, please contact us at: <br />
                <strong>Email:</strong> <a href="mailto:contact@overseastaffingsolutions.com">contact@overseastaffingsolutions.com</a>
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
