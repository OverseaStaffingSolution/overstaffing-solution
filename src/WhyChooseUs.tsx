import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe2, Clock, ShieldCheck, MessageSquare, DollarSign } from 'lucide-react';

const reasons = [
  {
    title: "Caribbean advantage",
    icon: <Globe2 className="w-8 h-8 md:w-10 md:h-10" />,
    description: "Strategic nearshore location in Haiti and the Caribbean. Same time zones as US Eastern Standard Time, reducing communication delays. Cultural affinity with North American and European markets ensures seamless customer interactions.",
  },
  {
    title: "Adapt scheduling",
    icon: <Clock className="w-8 h-8 md:w-10 md:h-10" />,
    description: "24/7 coverage that flexes to your peak hours, holidays, and emergency surges. Our agents work around your business hours, not the other way. Night shifts, weekends, and on-demand scaling available.",
  },
  {
    title: "Rigorous screening",
    icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />,
    description: "Only the top 5% of candidates make it through our 4-step process: language fluency, technical skills, personality assessment, and simulated customer scenarios. Every agent is vetted for empathy, problem-solving, and brand alignment.",
  },
  {
    title: "Multilingual excellence",
    icon: <MessageSquare className="w-8 h-8 md:w-10 md:h-10" />,
    description: "Fluent agents in English, French, Spanish, and Haitian Creole. Serve your customers in their preferred language without outsourcing to multiple vendors. Accent-neutral training for North American and European markets.",
  },
  {
    title: "Transparent pricing",
    icon: <DollarSign className="w-8 h-8 md:w-10 md:h-10" />,
    description: "No hidden fees, no surprise charges. Pay only for productive hours with simple per-agent monthly or hourly rates. Detailed reporting shows where every minute goes. Volume discounts available.",
  }
];

export default function WhyChooseUs() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
            Why Choose Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#1E293B] dark:text-[#E2E8F0]/80 font-light max-w-2xl mx-auto"
          >
            Discover the advantages of partnering with Oversea Staffing Solutions.
          </motion.p>
        </div>

        <motion.div layout className="flex flex-wrap justify-center gap-6">
          {reasons.map((reason, index) => {
            const isExpanded = expandedIndex === index;
            
            return (
              <motion.div
                key={index}
                layout
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className={`cursor-pointer rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#FC9905]/40 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#110195] to-[#FC9905] ${
                  isExpanded ? 'w-full' : 'w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'
                }`}
                initial={{ borderRadius: 16 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="p-8 md:p-10 w-full flex flex-col items-center justify-center h-full">
                  <motion.div layout className="bg-white/20 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-6 text-white shrink-0 shadow-lg border border-white/10">
                    {reason.icon}
                  </motion.div>
                  <motion.h3 layout className="text-xl md:text-2xl font-bold text-white mb-2">
                    {reason.title}
                  </motion.h3>
                  
                  <AnimatePresence mode="popLayout">
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-4xl mx-auto"
                      >
                        <p className="text-white/95 leading-relaxed text-base md:text-lg font-light text-center">
                          {reason.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
