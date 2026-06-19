import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Headset, Target, MessageSquare, BarChart, Award, Phone, ArrowUpRight, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      title: t('nav.customerSupport') || "Customer Service",
      shortDesc: t('services.s1.short') || "Empathetic, emotionally intelligent agents for premium customer care.",
      longDesc: t('services.s1.long') || "We understand that not just politeness but the tonality and emotional intelligence of calling agents is crucial for enriched customer experiences.",
      icon: Headset,
      href: "/services/customer-service"
    },
    {
      title: t('nav.leadGeneration') || "Lead Generation",
      shortDesc: t('services.s2.short') || "Proactive CRM management and data-driven lead qualification.",
      longDesc: t('services.s2.long') || "We focus on the things that matter and our leadership teams know how to manage and analyze CRM data, motivate their teams, manage upwards and stay proactive all the time.",
      icon: Target,
      href: "/services/lead-generation"
    },
    {
      title: t('nav.liveChat') || "Live Web Chat Support Services",
      shortDesc: t('services.s3.short') || "24/7 chat and email support for cost-efficient operations.",
      longDesc: t('services.s3.long') || "We provide unparalleled chat and email support in order to drive continuous improvement to your business in terms of quick and easy access to information, compliance, cost efficiency and more.",
      icon: MessageSquare,
      href: "/services/live-chat-support"
    },
    {
      title: t('services.s4.title') || "Market Research and Survey Handling",
      shortDesc: t('services.s4.short') || "Expert research methodologies to gather actionable insights.",
      longDesc: t('services.s4.long') || "Our team of research experts performs various research methodologies to gather required information from various sources.",
      icon: BarChart,
      href: "/services/market-research"
    },
    {
      title: t('services.s5.title') || "Sales Lead Qualification",
      shortDesc: t('services.s5.short') || "Convert leads into revenue with inbound & outbound sales support.",
      longDesc: t('services.s5.long') || "With lead generation and sales-focused services, Oversea Staffing Solutions inbound and outbound call center solutions help with not just hitting sales targets but also customer satisfaction and thus client satisfaction.",
      icon: Award,
      href: "/services/sales-lead-qualification"
    },
    {
      title: t('services.s6.title') || "Telemarketing",
      shortDesc: t('services.s6.short') || "Skilled telemarketing teams that drive results and motivation.",
      longDesc: t('services.s6.long') || "We focus on the things that matter and our leadership teams know how to manage and analyze CRM data, motivate their teams, manage upwards and stay proactive all the time.",
      icon: Phone,
      href: "/services/telemarketing"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section id="services" className="py-24 bg-[#F4F9FC] dark:bg-[#0F172A] relative overflow-hidden transition-colors duration-300">
      {/* SVG Gradient definition used for icon strokes */}
      <svg width="0" height="0" className="absolute invisible">
        <defs>
          <linearGradient id="blue-orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#110195" />
            <stop offset="100%" stopColor="#FC9905" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[#FC9905] font-semibold tracking-wider uppercase text-sm mb-4 block">{t('services.badge') || "Our Solutions"}</span>
          <h2 className="font-display text-4xl font-bold text-[#110195] dark:text-white leading-tight mb-4">
            {t('services.title') || "We're a full-service nearshore BPO contact center."}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#110195] to-[#FC9905] mx-auto mt-6 rounded-full"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
        >
          {services.map((service, i) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex"
              >
                <button
                  onClick={() => setSelectedService(service)}
                  className="bg-white dark:bg-[#1E293B] p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-xl border border-transparent hover:border-[#FC9905] dark:hover:border-[#FC9905] transition-all duration-300 flex flex-col items-center sm:items-start text-center sm:text-left group w-full focus:outline-none"
                >
                  {/* Icon with gradient stroke and Up-Right arrow hover action */}
                  <div className="flex justify-center sm:justify-between items-start mb-4 sm:mb-6 w-full">
                    <div className="p-1 bg-gradient-to-br from-[#110195]/10 to-[#FC9905]/10 rounded-xl inline-block mx-auto sm:mx-0">
                      <IconComponent 
                        size={32} 
                        className="transition-transform duration-300 group-hover:scale-110 sm:w-10 sm:h-10"
                        style={{ stroke: "url(#blue-orange-grad)" }}
                      />
                    </div>
                    <div className="hidden sm:block text-gray-400 group-hover:text-[#FC9905] transition-colors duration-300">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-display font-semibold text-sm sm:text-xl text-[#0B2B5B] dark:text-white mb-2 group-hover:text-[#FC9905] transition-colors duration-200">
                    {service.title}
                  </h3>

                  {/* Petite description */}
                  <p className="text-[#110195] dark:text-[#FC9905] text-xs sm:text-[0.85rem] font-medium leading-snug sm:mb-2 line-clamp-2 sm:line-clamp-none">
                    {service.shortDesc}
                  </p>
                  
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800 text-[10px] sm:text-sm font-semibold text-[#110195] dark:text-[#FC9905] group-hover:underline flex items-center justify-center sm:justify-start gap-1 w-full">
                    Read more <span className="hidden sm:inline">&rarr;</span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#0F172A] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative"
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setSelectedService(null)}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8">
                <div className="p-3 bg-gradient-to-br from-[#110195]/10 to-[#FC9905]/10 rounded-2xl inline-block mb-6">
                  <selectedService.icon 
                    size={48} 
                    style={{ stroke: "url(#blue-orange-grad)" }}
                  />
                </div>
                
                <h3 className="font-display font-bold text-2xl text-[#110195] dark:text-white mb-4">
                  {selectedService.title}
                </h3>
                
                <p className="text-[#FC9905] font-medium text-lg mb-6 leading-relaxed">
                  {selectedService.shortDesc}
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  {selectedService.longDesc}
                </p>
                
                <div className="flex gap-4">
                  <Link
                    to={selectedService.href}
                    onClick={() => setSelectedService(null)}
                    className="flex-1 bg-gradient-to-r from-[#110195] to-[#1a0b3b] hover:from-[#110195] hover:to-[#220793] text-white text-center py-3 px-6 rounded-xl font-semibold transition-all shadow-md focus:outline-none"
                  >
                    View Service Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
