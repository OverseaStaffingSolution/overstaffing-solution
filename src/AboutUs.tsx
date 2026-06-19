import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Target, Users2, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

export default function AboutUs() {
  const { t } = useLanguage();

  const values = [
    {
      title: t('value.excellence.title'),
      desc: t('value.excellence.desc'),
      icon: <Target className="w-8 h-8" />
    },
    {
      title: t('value.integrity.title'),
      desc: t('value.integrity.desc'),
      icon: <CheckCircle2 className="w-8 h-8" />
    },
    {
      title: t('value.empowerment.title'),
      desc: t('value.empowerment.desc'),
      icon: <Users2 className="w-8 h-8" />
    },
    {
      title: t('value.global.title'),
      desc: t('value.global.desc'),
      icon: <Globe2 className="w-8 h-8" />
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="font-sans text-[#1E293B] dark:text-[#E2E8F0] bg-[#F4F9FC] dark:bg-[#020617] min-h-screen pt-0 selection:bg-[#FC9905]/20 selection:text-[#110195] transition-colors duration-300">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-r from-[#110195] via-[#110195]/90 to-[#FC9905]/10 pt-[160px] pb-16 md:pt-[180px] md:pb-24 relative overflow-hidden mb-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(252,153,5,0.1),transparent)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Top Actions: Breadcrumb & Back button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <nav className="flex text-sm text-white/70" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li>
                    <Link to="/" className="hover:text-[#FC9905] transition-colors">{t('about.breadcrumb.home')}</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-2">/</span>
                    <span className="text-white font-medium">{t('about.breadcrumb.about')}</span>
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

            <div className="max-w-3xl">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#FC9905] font-semibold tracking-wider text-sm mb-4 block uppercase"
              >
                {t('about.badge')}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl font-bold text-white mb-6"
              >
                {t('about.title')}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 font-light leading-relaxed"
              >
                {t('about.subtitle')}
              </motion.p>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-[#110195] dark:text-white mb-6 font-display">{t('about.mission.title')}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {t('about.mission.p1')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('about.mission.p2')}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#110195]/20 to-[#FC9905]/20 rounded-3xl transform translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Corporate Office" 
                className="rounded-3xl relative z-10 w-full h-auto object-cover shadow-xl"
              />
            </motion.div>
          </div>

          {/* VALUES SECTION */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#110195] dark:text-white mb-4 font-display">{t('about.values.title')}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-[#0F172A] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 text-center hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div className="w-16 h-16 mx-auto bg-[#F4F9FC] dark:bg-[#1E293B] rounded-2xl flex items-center justify-center text-[#FC9905] group-hover:bg-[#FC9905] group-hover:text-white transition-colors duration-300 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#110195] dark:text-white mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
