import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

export default function LiveChatSupport() {
  const { t } = useLanguage();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const points = [
    {
      title: t('sd.lc.pt1_title'),
      desc: t('sd.lc.pt1_desc')
    },
    {
      title: t('sd.lc.pt2_title'),
      desc: t('sd.lc.pt2_desc')
    },
    {
      title: t('sd.lc.pt3_title'),
      desc: t('sd.lc.pt3_desc')
    },
    {
      title: t('sd.lc.pt4_title'),
      desc: t('sd.lc.pt4_desc')
    }
  ];

  const reasons = [
    {
      icon: Clock,
      title: t('sd.lc.why1_title'),
      desc: t('sd.lc.why1_desc')
    },
    {
      icon: ShieldCheck,
      title: t('sd.lc.why2_title'),
      desc: t('sd.lc.why2_desc')
    },
    {
      icon: Zap,
      title: t('sd.lc.why3_title'),
      desc: t('sd.lc.why3_desc')
    }
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
                  <Link to="/" className="hover:text-[#FC9905] transition-colors">{t('nav.home')}</Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-white/60">{t('nav.services')}</span>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-white font-medium">{t('nav.liveChat')}</span>
                </li>
              </ol>
            </nav>

            <Link 
              to="/" 
              className="inline-flex items-center gap-2 self-start text-sm font-medium px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10 hover:border-white/20 backdrop-blur-sm shadow-sm"
            >
              <ArrowLeft size={16} /> {t('about.back')}
            </Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FC9905]/20 text-[#FC9905] uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" /> {t('sd.lc.badge')}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-6 animate-fade-in">
              {t('sd.lc.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
              {t('sd.lc.hero_desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Detailed Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-display font-bold text-[#110195] dark:text-white mb-4">
                {t('sd.lc.sec1_title')}
              </h2>
              
              <p className="text-lg leading-relaxed text-[#1E293B]/90 dark:text-[#E2E8F0]/90 font-light">
                {t('sd.lc.sec1_desc1')}
              </p>
              
              <p className="leading-relaxed font-light">
                {t('sd.lc.sec1_desc2')}
              </p>

              {/* Bullet Points with Icons */}
              <div className="pt-6 space-y-4">
                <h3 className="text-xl font-display font-semibold text-[#110195] dark:text-[#FC9905]">
                  {t('sd.lc.point_title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {points.map((point, index) => (
                    <div key={index} className="bg-white/50 dark:bg-[#1E293B]/50 p-4 rounded-xl border border-black/5 dark:border-white/5 space-y-2">
                      <div className="flex items-center gap-2 text-[#FC9905]">
                        <CheckCircle2 size={18} className="flex-shrink-0" />
                        <h4 className="font-semibold text-sm text-[#0B2B5B] dark:text-white">{point.title}</h4>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed">{point.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center"
            >
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#110195] to-[#FC9905] rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800" 
                  alt="Live Web Chat Support Desk" 
                  className="relative rounded-2xl shadow-xl max-w-full h-auto object-cover border border-white/10"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE THIS SERVICE SECTION */}
      <section className="py-20 bg-white/40 dark:bg-[#1E293B]/20 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-[#110195] dark:text-white">
              {t('sd.lc.why_title')}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#110195] to-[#FC9905] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((reason, index) => {
              const IconComp = reason.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 hover:border-[#FC9905] transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#FC9905]/10 rounded-xl flex items-center justify-center text-[#FC9905] mb-4">
                    <IconComp size={24} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-[#0B2B5B] dark:text-white mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#110195] to-[#010041] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(252,153,5,0.15),transparent)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
              {t('sd.lc.cta_title')}
            </h2>
            <p className="text-lg text-white/80 font-light max-w-2xl mx-auto">
              {t('sd.lc.cta_desc')}
            </p>
            <div className="pt-4">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FC9905] to-[#110195] hover:from-[#110195] hover:to-[#FC9905] text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {t('sd.lc.cta_btn')} <ArrowRight size={18} />
              </Link>
            </div>
            <p className="text-xs text-white/50 font-light">
              {t('sd.lc.cta_small')}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
