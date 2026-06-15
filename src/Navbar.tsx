import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCareersOpen, setIsCareersOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check initial dark mode preference
    const isDark = document.documentElement.classList.contains('dark') || 
                   localStorage.getItem('theme') === 'dark' ||
                   (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

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
    { name: 'Services', href: isHome ? '#services' : '/#services' },
    { name: 'Careers', href: isHome ? '#careers' : '/#careers' },
    { name: 'Clients', href: isHome ? '#testimonials' : '/#testimonials' },
    { name: 'Contact', href: '/contact' }
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
                if (link.name === 'Services') {
                  const servicesSubLinks = [
                    { name: 'Customer Service', href: '/services/customer-service' },
                    { name: 'Lead Generation', href: '/services/lead-generation' },
                    { name: 'Live Web Chat Support Services', href: '/services/live-chat-support' },
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

                if (link.name === 'Careers') {
                  const careersSubLinks = [
                    { name: 'Customer Service Representative', href: '/careers/customer-service-representative' },
                    { name: 'Translator (Multilingual)', href: '/careers/translator' },
                    { name: 'Technical Support Agent', href: '/careers/technical-support' }
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
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                  isScrolled ? 'text-[#110195] dark:text-[#E2E8F0] hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
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
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled ? 'text-[#110195] dark:text-[#E2E8F0]' : 'text-white'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
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
          <motion.div
            initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-10%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] bg-[#FFFFFF] dark:bg-[#0F172A] flex flex-col"
          >
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center px-4 sm:px-6 h-[90px] border-b border-black/5 dark:border-white/10">
              <a href="#" className="flex-shrink-0 flex items-center" onClick={handleLinkClick}>
                <img
                  src="https://i.postimg.cc/xjL3Jnyp/profl-simple.png"
                  alt="Oversea Staffing Solutions logo"
                  className="h-[65px] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </a>
              <button 
                onClick={() => setIsMobileOpen(false)} 
                className="text-[#110195] dark:text-white dark:text-white p-2"
                aria-label="Close menu"
              >
                <X strokeWidth={1.5} size={32} />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex flex-col items-center justify-center flex-1 gap-8 overflow-y-auto py-8">
              {navLinks.map((link) => {
                if (link.name === 'Services') {
                  const servicesSubLinks = [
                    { name: 'Customer Service', href: '/services/customer-service' },
                    { name: 'Lead Generation', href: '/services/lead-generation' },
                    { name: 'Live Web Chat Support Services', href: '/services/live-chat-support' },
                    { name: 'Market Research and Survey Handling', href: '/services/market-research' },
                    { name: 'Sales Lead Qualification', href: '/services/sales-lead-qualification' },
                    { name: 'Telemarketing', href: '/services/telemarketing' }
                  ];

                  return (
                    <div key={link.name} className="flex flex-col items-center w-full relative">
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="relative group text-[#1E293B] dark:text-[#E2E8F0] hover:text-[#FC9905] dark:hover:text-[#FC9905] transition-colors duration-200 font-sans font-medium text-[2rem] flex items-center gap-2"
                      >
                        {link.name}
                        <ChevronDown size={28} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                        <span className="absolute -bottom-[4px] left-[10%] w-[80%] h-[3px] bg-[#FC9905] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
                      </button>
                      
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col items-center gap-4 mt-6 w-full"
                          >
                            {servicesSubLinks.map((sublink) => (
                              <Link
                                key={sublink.name}
                                to={sublink.href}
                                onClick={handleLinkClick}
                                className={`text-xl font-medium transition-colors ${
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

                if (link.name === 'Careers') {
                  const careersSubLinks = [
                    { name: 'Customer Service Representative', href: '/careers/customer-service-representative' },
                    { name: 'Translator (Multilingual)', href: '/careers/translator' },
                    { name: 'Technical Support Agent', href: '/careers/technical-support' }
                  ];

                  return (
                    <div key={link.name} className="flex flex-col items-center w-full relative">
                      <button
                        onClick={() => setIsCareersOpen(!isCareersOpen)}
                        className="relative group text-[#1E293B] dark:text-[#E2E8F0] hover:text-[#FC9905] dark:hover:text-[#FC9905] transition-colors duration-200 font-sans font-medium text-[2rem] flex items-center gap-2"
                      >
                        {link.name}
                        <ChevronDown size={28} className={`transition-transform duration-300 ${isCareersOpen ? 'rotate-180' : ''}`} />
                        <span className="absolute -bottom-[4px] left-[10%] w-[80%] h-[3px] bg-[#FC9905] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
                      </button>
                      
                      <AnimatePresence>
                        {isCareersOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col items-center gap-4 mt-6 w-full"
                          >
                            {careersSubLinks.map((sublink) => (
                              <Link
                                key={sublink.name}
                                to={sublink.href}
                                onClick={handleLinkClick}
                                className={`transition-colors text-xl font-medium text-center ${
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
                    className="relative group text-[#1E293B] dark:text-[#E2E8F0] hover:text-[#FC9905] dark:hover:text-[#FC9905] transition-colors duration-200 font-sans font-medium text-[2rem]"
                  >
                    {link.name}
                    <span className="absolute -bottom-[4px] left-[10%] w-[80%] h-[3px] bg-[#FC9905] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="relative group text-[#1E293B] dark:text-[#E2E8F0] hover:text-[#FC9905] dark:hover:text-[#FC9905] transition-colors duration-200 font-sans font-medium text-[2rem]"
                  >
                    {link.name}
                    <span className="absolute -bottom-[4px] left-[10%] w-[80%] h-[3px] bg-[#FC9905] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
                  </a>
                );
              })}
              
              <div className="mt-4">
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#FC9905] to-[#110195] text-white hover:scale-105 hover:shadow-lg hover:from-[#110195] hover:to-[#FC9905] transition-all duration-300 font-medium text-xl"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
