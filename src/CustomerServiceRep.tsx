import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  MapPin, 
  PhoneCall, 
  Mail, 
  ChevronRight, 
  FileText
} from 'lucide-react';
import Footer from './Footer';

export default function CustomerServiceRep() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const responsibilities = [
    "Manage inbound and outbound customer calls with active listening and emotional intelligence.",
    "Troubleshoot and resolve customer inquiries, billing questions, and orders with high accuracy.",
    "Accurately document customer interactions and profile details in high-end CRM platforms.",
    "Formulate polished, helpful, and brand-aligned email and live chat responses.",
    "Consistently achieve and exceed Key Performance Indicators (KPIs) such as CSAT, FCR, and average handling times."
  ];

  const requirements = [
    "Outstanding verbal and written communication skills in English (fluent or bilingual).",
    "A secondary language is highly appreciated (French, Spanish, or Haitian Creole).",
    "Proven experience in customer service, call centers, or hospitality sectors.",
    "Empathetic nature with strong conflict-resolution capabilities and stress management.",
    "Familiarity with standard CRM tools (Salesforce, Zendesk, or similar) and typing speeds of 40+ WPM.",
    "Ability to work rotating shifts including weekends and statutory holidays."
  ];

  const benefits = [
    "Highly competitive base salary with exciting productivity performance bonuses.",
    "Paid comprehensive initial training and continuous professional certification pathways.",
    "Modern, state-of-the-art office spaces in a beautiful location with secure on-site amenities.",
    "Clear, structured pathways for rapid upward mobility (Team Lead, Trainer, Quality Analyst).",
    "Flexible routing of working hours to accommodate work-life balance."
  ];

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
                  <span className="text-white/60">Careers</span>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-white font-medium">Customer Service Representative</span>
                </li>
              </ol>
            </nav>

            <Link 
              id="back-home-button"
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
              <Sparkles className="w-3.5 h-3.5" /> We're hiring
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
              Customer Service Representative
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
              Join an elite customer care team in the Caribbean and deliver outstanding, emotionally intelligent customer experiences to global brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* JOB DETAILS (2-Column Layout) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Core Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-display font-bold text-[#0B2B5B] dark:text-white mb-4">
                  Job Summary
                </h2>
                <p className="text-lg leading-relaxed text-[#1E293B]/90 dark:text-[#E2E8F0]/90 font-light">
                  En tant que Customer Service Representative chez Oversea Staffing Solutions, vous serez le premier point de contact pour nos clients et leurs clients. Vous incarnerez l'excellence du service client avec empathie, professionnalisme et maîtrise des outils CRM, en garantissant un niveau de satisfaction exceptionnel.
                </p>
              </div>

              {/* Responsibilities */}
              <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-display font-semibold text-[#0B2B5B] dark:text-white mb-4 flex items-center gap-2">
                  <Briefcase className="text-[#00A9A6] w-5 h-5" /> Main Responsibilities
                </h3>
                <ul className="space-y-3">
                  {responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[0.95rem] text-[#1E293B]/85 dark:text-[#E2E8F0]/85">
                      <CheckCircle2 className="text-[#FF6B35] w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-display font-semibold text-[#0B2B5B] dark:text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="text-[#00A9A6] w-5 h-5" /> Requirements & Competencies
                </h3>
                <ul className="space-y-3">
                  {requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[0.95rem] text-[#1E293B]/85 dark:text-[#E2E8F0]/85">
                      <CheckCircle2 className="text-[#00A9A6] w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What We Offer */}
              <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-display font-semibold text-[#0B2B5B] dark:text-white mb-4 flex items-center gap-2">
                  <Clock className="text-[#00A9A6] w-5 h-5" /> What We Offer
                </h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[0.95rem] text-[#1E293B]/85 dark:text-[#E2E8F0]/85">
                      <ChevronRight className="text-[#FF6B35] w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Column - Image & Context Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-[120px] space-y-8"
            >
              {/* Professionally styled image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] group bg-gradient-to-br from-[#110195] to-[#FC9905]">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
                  alt="Young smiling customer service representative with headset"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2B5B]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-sm uppercase tracking-wider font-semibold text-[#FC9905]">Workplace Excellence</p>
                  <p className="text-xl font-bold">Collaborative, multilingual, and warm culture</p>
                </div>
              </div>

              {/* Quick Info Block */}
              <div className="bg-gradient-to-br from-[#0B2B5B] to-[#110195] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
                <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Employment Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm font-light">
                  <div>
                    <span className="text-white/60 block text-xs uppercase font-medium">Location</span>
                    <span className="font-medium">Pétion-Ville, Haïti / USA</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-xs uppercase font-medium">Type</span>
                    <span className="font-medium">Full-Time</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-xs uppercase font-medium">Work Mode</span>
                    <span className="font-medium">On-Site / Hybrid</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-xs uppercase font-medium">Availability</span>
                    <span className="font-medium">Immediate</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* COMPANNY DESCRIPTION SECTION */}
      <section className="py-16 bg-white dark:bg-[#1E293B] border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-display font-bold text-[#0B2B5B] dark:text-white">
              About Oversea Staffing Solutions
            </h3>
            <p className="text-[#1E293B]/80 dark:text-[#E2E8F0]/80 leading-relaxed font-light text-base">
              At Oversea Staffing Solutions, we cultivate a vibrant workspace defined by intense teamwork, performance excellence, and deep-seated background diversity. Believing that customer support is an emotional art form, we empower our employees with leading training frameworks, highly supportive feedback structures, and advanced tools.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#110195] dark:text-[#FC9905] font-semibold pt-4">
              <span className="flex items-center gap-1"><MapPin size={16} /> Pétion-Ville, Haïti</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="flex items-center gap-1"><MapPin size={16} /> Georgia, USA</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA / APPLY SECTION */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#110195]/5 to-[#FC9905]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0B2B5B] dark:text-white">
              Prêt à rejoindre notre équipe ?
            </h2>
            <p className="text-lg text-[#1E293B]/80 dark:text-[#E2E8F0]/80 font-light max-w-xl mx-auto">
              Send us your Resume along with an impactful Cover Letter. Our Recruitment Operations team will review and reply swiftly.
            </p>
            
            <Link 
              id="apply-customer-service-rep"
              to="/careers/apply/customer-service-representative"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#FC9905] to-[#110195] text-white hover:scale-105 hover:shadow-lg hover:from-[#110195] hover:to-[#FC9905] transition-all duration-300 font-medium"
            >
              <FileText size={18} /> Apply Now
            </Link>
            
            <p className="text-xs text-[#1E293B]/60 dark:text-[#E2E8F0]/50 italic">
              Email inquiries: careers@overseastaffingsolutions.com
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
