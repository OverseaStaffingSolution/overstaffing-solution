import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';
import Footer from './Footer';

const contactMethods = [
  {
    title: 'Email Address',
    info: 'contact@overseastaffingsolutions.com',
    icon: <Mail size={48} strokeWidth={1} />,
    color: 'from-blue-500/10 to-indigo-500/10 text-[#110195] dark:text-blue-400',
    delay: 0.1
  },
  {
    title: 'Phone Number',
    info: '+1 (800) 123-4567',
    icon: <Phone size={48} strokeWidth={1} />,
    color: 'from-orange-500/10 to-amber-500/10 text-[#FC9905]',
    delay: 0.2
  },
  {
    title: 'Locations',
    info: 'Pétion-Ville, Haiti\nGeorgia, USA',
    icon: <MapPin size={48} strokeWidth={1} />,
    color: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400',
    delay: 0.3
  }
];

export default function ContactPage() {
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
                    <Link to="/" className="hover:text-[#FC9905] transition-colors">Home</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-2">/</span>
                    <span className="text-white font-medium">Contact</span>
                  </li>
                </ol>
              </nav>

              <Link 
                to="/" 
                className="inline-flex items-center gap-2 self-start text-sm font-medium px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10 hover:border-white/20 backdrop-blur-sm shadow-sm"
              >
                <ArrowLeft size={16} /> Return to Home
              </Link>
            </div>

            <div className="max-w-3xl">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#FC9905] font-semibold tracking-wider text-sm mb-4 block uppercase"
              >
                Connect With Us
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl font-bold text-white mb-6"
              >
                We'd love to hear from you
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 font-light leading-relaxed"
              >
                Whether you're looking for an elite team of agents or have questions about our solutions, we're here to help.
              </motion.p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: method.delay, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white dark:bg-[#0F172A] rounded-3xl p-8 shadow-xl shadow-black/5 dark:shadow-black/20 border border-gray-100 dark:border-white/5 relative overflow-hidden group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="flex justify-between items-center relative z-10">
                <div className="pr-6">
                  <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-2">
                    {method.title}
                  </h3>
                  <div className="text-xl font-medium text-[#110195] dark:text-white whitespace-pre-line">
                    {method.info}
                  </div>
                </div>
                
                <motion.div 
                  className={`w-20 h-20 rounded-2xl bg-gray-50 dark:bg-[#1E293B] flex items-center justify-center flex-shrink-0 ${method.color.split(' ')[1]} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-sm`}
                >
                  {method.icon}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Contact Form Section below coordinates */}
      <ContactForm />
    </div>
      
    <Footer />
  </>
);
}
