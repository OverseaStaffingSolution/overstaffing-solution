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
  ChevronRight, 
  FileText,
  Cpu
} from 'lucide-react';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

export default function TechnicalSupport() {
  const { t } = useLanguage();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const responsibilities = [
    t("job.tech.resp1"),
    t("job.tech.resp2"),
    t("job.tech.resp3"),
    t("job.tech.resp4"),
    t("job.tech.resp5")
  ];

  const requirements = [
    t("job.tech.req1"),
    t("job.tech.req2"),
    t("job.tech.req3"),
    t("job.tech.req4"),
    t("job.tech.req5")
  ];

  const benefits = [
    t("job.tech.offer1"),
    t("job.tech.offer2"),
    t("job.tech.offer3"),
    t("job.tech.offer4"),
    t("job.tech.offer5")
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
                  <Link to="/" className="hover:text-[#FC9905] transition-colors">{t("footer.home")}</Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-white/60">{t("footer.career")}</span>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-white font-medium">{t("job.tech.title")}</span>
                </li>
              </ol>
            </nav>

            <Link 
              id="back-home-button-technical-support"
              to="/" 
              className="inline-flex items-center gap-2 self-start text-sm font-medium px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10 hover:border-white/20 backdrop-blur-sm shadow-sm"
            >
              <ArrowLeft size={16} /> {t("job.common.return_home")}
            </Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FC9905]/20 text-[#FC9905] uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" /> {t("job.common.we_are_hiring")}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
              {t("job.tech.title")}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
              {t("job.tech.hero_desc")}
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
                  {t("job.common.summary_title")}
                </h2>
                <p className="text-lg leading-relaxed text-[#1E293B]/90 dark:text-[#E2E8F0]/90 font-light">
                  {t("job.tech.summary")}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-display font-semibold text-[#0B2B5B] dark:text-white mb-4 flex items-center gap-2">
                  <Briefcase className="text-[#00A9A6] w-5 h-5" /> {t("job.tech.resp_title")}
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
                  <GraduationCap className="text-[#00A9A6] w-5 h-5" /> {t("job.tech.req_title")}
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
                  <Clock className="text-[#00A9A6] w-5 h-5" /> {t("job.tech.offer_title")}
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
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                  alt="Technical support diagnostics helpdesk worker with headphones"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2B5B]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-sm uppercase tracking-wider font-semibold text-[#FC9905]">{t("job.common.sidebar_title_tech")}</p>
                  <p className="text-xl font-bold">{t("job.common.sidebar_subtitle_tech")}</p>
                </div>
              </div>

              {/* Quick Info Block */}
              <div className="bg-gradient-to-br from-[#0B2B5B] to-[#110195] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
                <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">{t("job.common.summary_sidebar_title")}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm font-light">
                  <div>
                    <span className="text-white/60 block text-xs uppercase font-medium">{t("job.common.sidebar_location")}</span>
                    <span className="font-medium">Pétion-Ville, Haïti / USA</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-xs uppercase font-medium">{t("job.common.sidebar_type")}</span>
                    <span className="font-medium">{t("job.common.sidebar_type_full")}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-xs uppercase font-medium">{t("job.common.sidebar_mode")}</span>
                    <span className="font-medium">{t("job.common.sidebar_mode_tech")}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-xs uppercase font-medium">{t("job.common.sidebar_availability")}</span>
                    <span className="font-medium">{t("job.common.sidebar_avail_value")}</span>
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
              {t("job.common.about_title")}
            </h3>
            <p className="text-[#1E293B]/80 dark:text-[#E2E8F0]/80 leading-relaxed font-light text-base">
              {t("job.common.about_desc")}
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
              {t("job.common.cta_title")}
            </h2>
            <p className="text-lg text-[#1E293B]/80 dark:text-[#E2E8F0]/80 font-light max-w-xl mx-auto">
              {t("job.common.cta_desc")}
            </p>
            
            <Link 
              id="apply-technical-support"
              to="/careers/apply/technical-support"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#FC9905] to-[#110195] text-white hover:scale-105 hover:shadow-lg hover:from-[#110195] hover:to-[#FC9905] transition-all duration-300 font-medium"
            >
              <FileText size={18} /> {t("job.common.apply_now")}
            </Link>
            
            <p className="text-xs text-[#1E293B]/60 dark:text-[#E2E8F0]/50 italic">
              {t("job.common.email_inquiries")}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
