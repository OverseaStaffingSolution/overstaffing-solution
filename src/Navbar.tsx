import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCareersOpen, setIsCareersOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  
  const navLinks = [
    { name: t('nav.home'), href: '/', originalName: 'Home' },
    { name: t('nav.services'), href: isHome ? '#services' : '/#services', originalName: 'Services' },
    { name: t('nav.careers'), href: isHome ? '#careers' : '/#careers', originalName: 'Careers' },
    { name: t('nav.about'), href: '/about-us', originalName: 'About' }
  ];

  const handleLinkClick = () => {
    setIsMobileOpen(false);
  };

  if (location.pathname.startsWith('/admin-dashboard')) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'h-[90px] bg-white/90 dark:bg-[#1E293B]/90 dark:bg-[#0F172A]/90 backdrop-blur-md shadow-md dark:shadow-black/50' 
            : 'h-[140px] bg-transparent'
        }`}
        style={{ borderBottom: isScrolled ? '1px solid rgba(148, 163, 184, 0.1)' : '1px solid transparent' }}
      >
        <nav role="navigation" aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            
            {/* Logo */}
            <a href="#" className="flex-shrink-0 flex items-center" onClick={() => setIsMobileOpen(false)}>
              <img
                src="https://i.postimg.cc/xjL3Jnyp/profl-simple.png"
                alt="Oversea Staffing Solutions logo"
                className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-[75px]' : 'h-[120px]'}`}
                referrerPolicy="no-referrer"
              />
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => {
                if (link.originalName === 'Services') {
                  const servicesSubLinks = [
                    { name: t('nav.customerSupport'), href: '/services/customer-service' },
                    { name: t('nav.leadGeneration'), href: '/services/lead-generation' },
                    { name: t('nav.liveChat'), href: '/services/live-chat-support' },
                    { name: 'Market Research and Survey Handling', href: '/services/market-research' },
                    { name: 'Sales Lead Qualification', href: '/services/sales-lead-qualification' },
                    { name: 'Telemarketing', href: '/services/telemarketing' }
                  ];

                  return (
                    <div key={link.name} className="relative group py-4">
                      <a
                        href={link.href}
                        className={`flex items-center gap-1 ${isScrolled ? 'text-[#110195] dark:text-[#E2E8F0]' : 'text-white/90'} hover:text-[#FC9905] transition-colors duration-200 font-sans text-base font-normal relative`}
                      >
                        {link.name}
                        <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                        <span className="absolute -bottom-[1px] left-[10%] w-[80%] h-[2px] bg-[#FC9905] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
                      </a>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute top-[100%] left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-80 bg-white dark:bg-[#1E293B] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50">
                        <div className="py-2">
                          {servicesSubLinks.map((sublink) => (
                            <Link
                              key={sublink.name}
                              to={sublink.href}
                              className={`block px-5 py-2.5 text-sm transition-colors ${
                                location.pathname === sublink.href 
                                  ? 'text-[#FC9905] bg-gray-50 dark:bg-[#0F172A]' 
                                  : 'text-[#1E293B] dark:text-[#E2E8F0] hover:bg-gray-50 dark:hover:bg-[#0F172A] hover:text-[#FC9905] dark:hover:text-[#FC9905]'
                              }`}
                            >
                              {sublink.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                if (link.originalName === 'Careers') {
                  const careersSubLinks = [
                    { name: 'Customer Service Representative', href: '/careers/customer-service-representative' },
                    { name: 'Translator (Multilingual)', href: '/careers/translator' },
                    { name: t('nav.techSupport'), href: '/careers/technical-support' }
                  ];

                  return (
                    <div key={link.name} className="relative group py-4">
                      <a
                        href={link.href}
                        className={`flex items-center gap-1 ${isScrolled ? 'text-[#110195] dark:text-[#E2E8F0]' : 'text-white/90'} hover:text-[#FC9905] transition-colors duration-200 font-sans text-base font-normal relative`}
                      >
                        {link.name}
                        <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                        <span className="absolute -bottom-[1px] left-[10%] w-[80%] h-[2px] bg-[#FC9905] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
                      </a>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute top-[100%] left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-[300px] bg-white dark:bg-[#1E293B] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50">
                        <div className="py-2">
                          {careersSubLinks.map((sublink) => (
                            <Link
                              key={sublink.name}
                              to={sublink.href}
                              className={`block px-5 py-2.5 text-sm transition-colors ${
                                location.pathname === sublink.href 
                                  ? 'text-[#FC9905] bg-gray-50 dark:bg-[#0F172A]' 
                                  : 'text-[#1E293B] dark:text-[#E2E8F0] hover:bg-gray-50 dark:hover:bg-[#0F172A] hover:text-[#FC9905] dark:hover:text-[#FC9905]'
                              }`}
                            >
                              {sublink.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return link.href.startsWith('/') && !link.href.includes('#') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`relative group ${isScrolled ? 'text-[#110195] dark:text-[#E2E8F0]' : 'text-white/90'} hover:text-[#FC9905] transition-colors duration-200 font-sans text-base font-normal`}
                  >
                    {link.name}
                    <span className="absolute -bottom-[2px] left-[10%] w-[80%] h-[2px] bg-[#FC9905] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative group ${isScrolled ? 'text-[#110195] dark:text-[#E2E8F0]' : 'text-white/90'} hover:text-[#FC9905] transition-colors duration-200 font-sans text-base font-normal`}
                  >
                    {link.name}
                    <span className="absolute -bottom-[2px] left-[10%] w-[80%] h-[2px] bg-[#FC9905] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
                  </a>
                );
              })}
              
              <button
                onClick={() => setLanguage(language === 'EN' ? 'FR' : 'EN')}
                className={`w-10 h-10 rounded-full transition-colors flex items-center justify-center font-bold text-sm ${
                  isScrolled ? 'text-[#110195] dark:text-[#E2E8F0] hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle language"
              >
                {language}
              </button>

              <Link
                to="/contact"
                className={`ml-2 px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-[#FC9905] to-[#110195] text-white hover:from-[#110195] hover:to-[#FC9905]' 
                    : 'bg-white dark:bg-[#1E293B] text-[#110195] dark:text-white shadow-md hover:bg-transparent hover:text-white hover:border-white border-2 border-transparent'
                }`}
              >
                Get in touch
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'EN' ? 'FR' : 'EN')}
                className={`w-10 h-10 rounded-full transition-colors font-bold text-sm flex items-center justify-center ${
                  isScrolled ? 'text-[#110195] dark:text-[#E2E8F0]' : 'text-white'
                }`}
                aria-label="Toggle language"
              >
                {language}
              </button>
              <button 
                onClick={() => setIsMobileOpen(true)} 
                className={`${isScrolled ? 'text-[#110195] dark:text-white dark:text-white' : 'text-white'} p-2`}
                aria-label="Open menu"
              >
                <Menu strokeWidth={1.5} size={28} />
              </button>
            </div>
            
          </div>
        </nav>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[60vw] max-w-[300px] z-[100] bg-[#FFFFFF] dark:bg-[#0F172A] flex flex-col shadow-2xl"
            >
              {/* Mobile Menu Header */}
              <div className="flex justify-end items-center px-4 h-[90px] border-b border-black/5 dark:border-white/10">
                <button 
                  onClick={() => setIsMobileOpen(false)} 
                  className="text-[#110195] dark:text-white p-2"
                  aria-label="Close menu"
                >
                  <X strokeWidth={1.5} size={32} />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <div className="flex flex-col items-start px-6 flex-1 gap-6 overflow-y-auto py-8">
                {navLinks.map((link) => {
                  if (link.originalName === 'Services') {
                    const servicesSubLinks = [
                      { name: t('nav.customerSupport'), href: '/services/customer-service' },
                      { name: t('nav.leadGeneration'), href: '/services/lead-generation' },
                      { name: t('nav.liveChat'), href: '/services/live-chat-support' },
                      { name: 'Market Research and Survey Handling', href: '/services/market-research' },
                      { name: 'Sales Lead Qualification', href: '/services/sales-lead-qualification' },
                      { name: 'Telemarketing', href: '/services/telemarketing' }
                    ];

                    return (
                      <div key={link.name} className="flex flex-col items-start w-full relative">
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className="relative group text-[#1E293B] dark:text-[#E2E8F0] hover:text-[#FC9905] dark:hover:text-[#FC9905] transition-colors duration-200 font-sans font-medium text-lg flex items-center gap-2"
                        >
                          {link.name}
                          <ChevronDown size={20} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="flex flex-col items-start gap-4 mt-4 w-full pl-4 border-l-2 border-[#FC9905]/30 ml-2"
                            >
                              {servicesSubLinks.map((sublink) => (
                                <Link
                                  key={sublink.name}
                                  to={sublink.href}
                                  onClick={handleLinkClick}
                                  className={`text-sm font-medium transition-colors text-left ${
                                    location.pathname === sublink.href 
                                      ? 'text-[#FC9905] font-semibold' 
                                      : 'text-[#1E293B]/80 dark:text-[#E2E8F0]/80 hover:text-[#FC9905] dark:hover:text-[#FC9905]'
                                  }`}
                                >
                                  {sublink.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  if (link.originalName === 'Careers') {
                    const careersSubLinks = [
                      { name: 'Customer Service Representative', href: '/careers/customer-service-representative' },
                      { name: 'Translator (Multilingual)', href: '/careers/translator' },
                      { name: t('nav.techSupport'), href: '/careers/technical-support' }
                    ];

                    return (
                      <div key={link.name} className="flex flex-col items-start w-full relative">
                        <button
                          onClick={() => setIsCareersOpen(!isCareersOpen)}
                          className="relative group text-[#1E293B] dark:text-[#E2E8F0] hover:text-[#FC9905] dark:hover:text-[#FC9905] transition-colors duration-200 font-sans font-medium text-lg flex items-center gap-2"
                        >
                          {link.name}
                          <ChevronDown size={20} className={`transition-transform duration-300 ${isCareersOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isCareersOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="flex flex-col items-start gap-4 mt-4 w-full pl-4 border-l-2 border-[#FC9905]/30 ml-2"
                            >
                              {careersSubLinks.map((sublink) => (
                                <Link
                                  key={sublink.name}
                                  to={sublink.href}
                                  onClick={handleLinkClick}
                                  className={`transition-colors text-sm font-medium text-left ${
                                    location.pathname === sublink.href
                                      ? 'text-[#FC9905] font-semibold'
                                      : 'text-[#1E293B]/80 dark:text-[#E2E8F0]/80 hover:text-[#FC9905] dark:hover:text-[#FC9905]'
                                  }`}
                                >
                                  {sublink.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={handleLinkClick}
                      className="relative group text-[#1E293B] dark:text-[#E2E8F0] hover:text-[#FC9905] dark:hover:text-[#FC9905] transition-colors duration-200 font-sans font-medium text-lg"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={handleLinkClick}
                      className="relative group text-[#1E293B] dark:text-[#E2E8F0] hover:text-[#FC9905] dark:hover:text-[#FC9905] transition-colors duration-200 font-sans font-medium text-lg"
                    >
                      {link.name}
                    </a>
                  );
                })}
                
                <div className="mt-6 w-full text-center">
                  <Link
                    to="/contact"
                    onClick={handleLinkClick}
                    className="inline-block w-full py-3 rounded-xl bg-gradient-to-r from-[#FC9905] to-[#110195] text-white hover:shadow-lg transition-all duration-300 font-medium text-base"
                  >
                    Get in touch
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
