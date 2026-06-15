import React from 'react';
import { MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#10141d] pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-white/10 pb-16">
          
          <div className="lg:col-span-2">
            <span className="font-display font-bold text-2xl text-white mb-6 flex items-baseline gap-1">
              Oversea<span className="text-[#FC9905] text-xl font-medium tracking-normal lowercase">staffing solutions</span>
            </span>
            <p className="text-[#F4F9FC]/70 max-w-md font-light mb-8 leading-relaxed">
              Your premier Caribbean destination for elite call center staffing. We deliver uncompromising excellence for discerning enterprises worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#FC9905] hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#FC9905] hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#FC9905] hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Get in touch</h4>
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
            <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'About Us', 'Career', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={link === 'Home' ? '/' : `/#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#F4F9FC]/80 hover:text-[#FC9905] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#F4F9FC]/50 flex-wrap gap-4">
        <p>© {new Date().getFullYear()} Oversea Staffing Solutions. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link to="/admin-dashboard" className="hover:text-white transition-colors">Admin Dashboard</Link>
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
