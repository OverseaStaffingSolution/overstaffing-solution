import React, { useState, useEffect } from 'react';
import { MapPin, Linkedin, Facebook, Instagram, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t } = useLanguage();

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

  return (
    <footer id="footer" className="bg-[#10141d] pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-white/10 pb-16">
          
          <div className="lg:col-span-2">
            <span className="font-display font-bold text-2xl text-white mb-6 flex items-baseline gap-1">
              Oversea<span className="text-[#FC9905] text-xl font-medium tracking-normal lowercase">staffing solutions</span>
            </span>
            <p className="text-[#F4F9FC]/70 max-w-md font-light mb-8 leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/magdala-jn-simon-1a5970411" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#FC9905] hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.facebook.com/overseastaffingsolutions/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#FC9905] hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/p/DYpmvDjIEg9/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#FC9905] hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-6">{t('footer.getInTouch')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-[#FC9905] w-5 h-5 mt-1 hidden sm:block mr-3 flex-shrink-0" />
                <a href="https://maps.google.com/?q=Pétion-Ville,+Haiti" target="_blank" rel="noreferrer" className="text-[#F4F9FC]/80 hover:text-[#FC9905] transition-colors leading-relaxed inline-flex gap-2">
                  <MapPin className="text-[#FC9905] w-5 h-5 sm:hidden flex-shrink-0" />
                  Pétion-Ville, Haiti
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="text-[#FC9905] w-5 h-5 mt-1 hidden sm:block mr-3 flex-shrink-0" />
                <a href="https://maps.google.com/?q=Georgia,+USA" target="_blank" rel="noreferrer" className="text-[#F4F9FC]/80 hover:text-[#FC9905] transition-colors leading-relaxed inline-flex gap-2">
                  <MapPin className="text-[#FC9905] w-5 h-5 sm:hidden flex-shrink-0" />
                  Georgia, USA
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {[
                { label: t('footer.home'), href: '/' },
                { label: t('footer.services'), href: '/#services' },
                { label: t('footer.aboutUs'), href: '/about-us' },
                { label: t('footer.career'), href: '/#career' },
                { label: t('footer.contact'), href: '/#contact-us' }
              ].map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-[#F4F9FC]/80 hover:text-[#FC9905] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/admin" className="text-[#F4F9FC]/80 hover:text-[#FC9905] transition-colors flex items-center gap-1">
                  {t('footer.admin')}
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#F4F9FC]/50 flex-wrap gap-4">
        <p>
          © {new Date().getFullYear()} Oversea Staffing Solutions. {t('footer.allRightsReserved')}
        </p>
        <div className="flex space-x-6 items-center flex-wrap gap-y-2">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
          <Link to="/terms-of-service" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
          <button
            onClick={toggleDarkMode}
            className="p-1 rounded-full text-[#F4F9FC]/50 hover:text-white hover:bg-white/10 transition-colors ml-4 focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </footer>
  );
}
