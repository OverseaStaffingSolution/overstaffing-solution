import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe2, Clock, ShieldCheck, MessageSquare, DollarSign, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function WhyChooseUs() {
  const { t } = useLanguage();
  const [selectedReason, setSelectedReason] = useState<typeof reasons[0] | null>(null);

  const reasons = [
    {
      title: t('why.reason1.title') || "Caribbean advantage",
      icon: Globe2,
      description: t('why.reason1.desc') || "Strategic nearshore location in Haiti and the Caribbean...",
    },
    {
      title: t('why.reason2.title') || "Adapt scheduling",
      icon: Clock,
      description: t('why.reason2.desc') || "24/7 coverage...",
    },
    {
      title: t('why.reason3.title') || "Rigorous screening",
      icon: ShieldCheck,
      description: t('why.reason3.desc') || "Only the top 5% of candidates...",
    },
    {
      title: t('why.reason4.title') || "Multilingual excellence",
      icon: MessageSquare,
      description: t('why.reason4.desc') || "Fluent agents...",
    },
    {
      title: t('why.reason5.title') || "Transparent pricing",
      icon: DollarSign,
      description: t('why.reason5.desc') || "No hidden fees...",
    }
  ];

  return (
    <section className="py-24 bg-[#F4F9FC] dark:bg-[#020617]" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-[#110195] dark:text-white mb-4"
          >
            {t('why.title') || 'Why Choose Us'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#1E293B] dark:text-[#E2E8F0]/80 font-light max-w-2xl mx-auto"
          >
            {t('why.subtitle') || 'Discover the advantages of partnering with Oversea Staffing Solutions.'}
          </motion.p>
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <motion.div
                key={index}
                layoutId={`reason-card-${index}`}
                onClick={() => setSelectedReason(reason)}
                className="cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center text-center bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-800 p-4 sm:p-6"
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-gradient-to-br from-[#110195]/10 to-[#FC9905]/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 text-[#110195] dark:text-[#FC9905]">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#110195] dark:text-white line-clamp-2">
                  {reason.title}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedReason && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedReason(null)}
          >
            <motion.div
              layoutId={`reason-card-${reasons.indexOf(selectedReason)}`}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#0F172A] w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setSelectedReason(null)}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8">
                <div className="bg-gradient-to-br from-[#110195]/10 to-[#FC9905]/10 w-20 h-20 rounded-full flex items-center justify-center mb-6 text-[#110195] dark:text-[#FC9905]">
                  <selectedReason.icon className="w-10 h-10" />
                </div>
                
                <h3 className="font-display font-bold text-2xl text-[#110195] dark:text-white mb-4">
                  {selectedReason.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedReason.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
