import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

const jobListings = [
  {
    title: "Customer Service Representative",
    desc: "Join our team as a Customer Service Representative and help deliver exceptional support experiences. Handle inbound calls, resolve customer inquiries, and build lasting relationships.",
    reqs: [
      "Excellent communication skills",
      "Problem-solving abilities",
      "Patience and empathy",
      "Computer proficiency"
    ]
  },
  {
    title: "Translations",
    desc: "Become part of our multilingual team providing professional translation services. Work with diverse clients and help bridge language barriers in customer communications.",
    reqs: [
      "Fluency in multiple languages",
      "Strong written communication",
      "Attention to detail",
      "Cultural awareness"
    ]
  },
  {
    title: "Technical Support",
    desc: "Provide expert technical assistance to customers facing product or service issues. Troubleshoot problems, guide users through solutions, and ensure customer satisfaction.",
    reqs: [
      "Technical aptitude",
      "Problem-solving skills",
      "Clear communication",
      "Patience and persistence"
    ]
  }
];

interface FloatingCardProps {
  currentJob: {
    title: string;
    desc: string;
    reqs: string[];
  };
  index: number;
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ currentJob, index, expandedIndex, setExpandedIndex }) => {
  const { t } = useLanguage();
  const isExpanded = expandedIndex === index;
  const isAnyExpanded = expandedIndex !== null;

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIndex(isExpanded ? null : index);
  };

  // Base animation for floating up and down
  const floatAnimation = isExpanded ? {} : {
    y: ["-8px", "8px", "-8px"],
    transition: {
      duration: 4 + index, // staggered animation
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <>
      {/* Desktop Version */}
      <motion.div
        className="hidden md:flex flex-col"
        style={{
          opacity: isAnyExpanded && !isExpanded ? 0.6 : 1,
          scale: isAnyExpanded && !isExpanded ? 0.95 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          animate={floatAnimation}
          className={`w-full bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-sm border border-[#FC9905]/40 rounded-[2rem] shadow-2xl p-6 md:p-8 cursor-pointer transition-all duration-300 ${!isExpanded ? 'hover:bg-[#F4F9FC] dark:bg-[#0F172A]/80 hover:border-[#FC9905]' : 'border-[#FC9905]'} `}
          onClick={toggleExpand}
          layout
        >
          <motion.div layout className="flex justify-between items-start">
            <motion.h3 layout className="font-display font-semibold text-2xl text-[#110195] dark:text-white pr-4">
              {currentJob.title}
            </motion.h3>
            <motion.button layout className="mt-1 flex-shrink-0 text-[#FC9905] focus:outline-none">
              {isExpanded ? <X size={24} /> : <Plus size={24} />}
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: "1.5rem" }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-[#1E293B] dark:text-[#E2E8F0] text-[0.95rem] leading-relaxed mb-6">
                  {currentJob.desc}
                </p>
                <div>
                  <h4 className="font-semibold text-[#110195] dark:text-white mb-3 text-sm uppercase tracking-wider">
                    {t('career.requirements')}
                  </h4>
                  <ul className="space-y-2">
                    {currentJob.reqs.map((req, i) => (
                      <li key={i} className="flex items-start text-[#4B5563] text-[0.95rem]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FC9905] mt-2 mr-3 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <Link to="/careers/apply/general" className="w-full inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#FC9905] to-[#110195] text-white hover:scale-105 hover:shadow-lg hover:from-[#110195] hover:to-[#FC9905] transition-all duration-300 font-medium text-center">
                    {t('nav.applyNow')}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Mobile Version - Static list */}
      <div className="md:hidden w-full mb-6 relative z-10 font-sans">
        <motion.div 
          animate={floatAnimation}
          className="bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-sm border border-[#FC9905]/40 rounded-[2rem] shadow-xl p-6 cursor-pointer hover:border-[#FC9905] hover:bg-[#F4F9FC] dark:bg-[#0F172A]/80 transition-all duration-300"
          onClick={toggleExpand}
          layout
        >
          <div className="flex justify-between items-center">
            <h3 className="font-display font-semibold text-xl text-[#110195] dark:text-white">
              {currentJob.title}
            </h3>
            <button className="flex-shrink-0 text-[#FC9905] focus:outline-none">
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                <ChevronDown size={24} />
              </motion.div>
            </button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-2 border-t border-gray-100 mt-2">
                  <p className="text-[#1E293B] dark:text-[#E2E8F0] text-[0.95rem] mb-4">
                    {currentJob.desc}
                  </p>
                  <div>
                    <h4 className="font-semibold text-[#110195] dark:text-white mb-2 text-sm">
                      {t('career.requirementsMobile')}
                    </h4>
                    <ul className="space-y-2">
                      {currentJob.reqs.map((req, i) => (
                        <li key={i} className="flex items-start text-[#4B5563] text-[0.95rem]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FC9905] mt-2 mr-2 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <Link to="/careers/apply/general" className="w-full inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#FC9905] to-[#110195] text-white hover:scale-105 hover:shadow-lg hover:from-[#110195] hover:to-[#FC9905] transition-all duration-300 font-medium text-center">
                      {t('nav.applyNow')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default function FloatingCards() {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const jobListings = [
    {
      title: t('career.job1.title'),
      desc: t('career.job1.desc'),
      reqs: [
        t('career.job1.req1'),
        t('career.job1.req2'),
        t('career.job1.req3'),
        t('career.job1.req4')
      ]
    },
    {
      title: t('career.job2.title'),
      desc: t('career.job2.desc'),
      reqs: [
        t('career.job2.req1'),
        t('career.job2.req2'),
        t('career.job2.req3'),
        t('career.job2.req4')
      ]
    },
    {
      title: t('career.job3.title'),
      desc: t('career.job3.desc'),
      reqs: [
        t('career.job3.req1'),
        t('career.job3.req2'),
        t('career.job3.req3'),
        t('career.job3.req4')
      ]
    }
  ];

  // Close when clicking outside
  const handleBackgroundClick = () => {
    if (expandedIndex !== null) {
      setExpandedIndex(null);
    }
  };

  return (
    <section id="career" className="py-24 bg-white dark:bg-[#1E293B] relative overflow-hidden" onClick={handleBackgroundClick}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-[#FC9905]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-[#110195]/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#FC9905] font-semibold tracking-wider uppercase text-sm mb-4 block">
            {t('career.badge')}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#110195] dark:text-white mb-4">
            {t('career.title')}
          </h2>
          <p className="text-lg text-[#1E293B] dark:text-[#E2E8F0]/80 font-light max-w-2xl mx-auto">
            {t('career.subtitle')}
          </p>
        </div>

        {/* Desktop Container for floating elements */}
        <div className="w-full mt-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 w-full items-start">
            {jobListings.map((job, index) => (
              <FloatingCard
                key={index}
                index={index}
                currentJob={job}
                expandedIndex={expandedIndex}
                setExpandedIndex={setExpandedIndex}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
