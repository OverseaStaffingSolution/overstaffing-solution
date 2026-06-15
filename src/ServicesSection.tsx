import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Headset, Target, MessageSquare, BarChart, Award, Phone, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: "Customer Service",
    shortDesc: "Empathetic, emotionally intelligent agents for premium customer care.",
    longDesc: "We understand that not just politeness but the tonality and emotional intelligence of calling agents is crucial for enriched customer experiences.",
    icon: Headset,
    href: "/services/customer-service"
  },
  {
    title: "Lead Generation",
    shortDesc: "Proactive CRM management and data-driven lead qualification.",
    longDesc: "We focus on the things that matter and our leadership teams know how to manage and analyze CRM data, motivate their teams, manage upwards and stay proactive all the time.",
    icon: Target,
    href: "/services/lead-generation"
  },
  {
    title: "Live Web Chat Support Services",
    shortDesc: "24/7 chat and email support for cost-efficient operations.",
    longDesc: "We provide unparalleled chat and email support in order to drive continuous improvement to your business in terms of quick and easy access to information, compliance, cost efficiency and more.",
    icon: MessageSquare,
    href: "/services/live-chat-support"
  },
  {
    title: "Market Research and Survey Handling",
    shortDesc: "Expert research methodologies to gather actionable insights.",
    longDesc: "Our team of research experts performs various research methodologies to gather required information from various sources.",
    icon: BarChart,
    href: "/services/market-research"
  },
  {
    title: "Sales Lead Qualification",
    shortDesc: "Convert leads into revenue with inbound & outbound sales support.",
    longDesc: "With lead generation and sales-focused services, Oversea Staffing Solutions inbound and outbound call center solutions help with not just hitting sales targets but also customer satisfaction and thus client satisfaction.",
    icon: Award,
    href: "/services/sales-lead-qualification"
  },
  {
    title: "Telemarketing",
    shortDesc: "Skilled telemarketing teams that drive results and motivation.",
    longDesc: "We focus on the things that matter and our leadership teams know how to manage and analyze CRM data, motivate their teams, manage upwards and stay proactive all the time.",
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

export default function ServicesSection() {
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
          <span className="text-[#FC9905] font-semibold tracking-wider uppercase text-sm mb-4 block">Our Solutions</span>
          <h2 className="font-display text-4xl font-bold text-[#110195] dark:text-white leading-tight mb-4">
            We're a full-service nearshore BPO contact center.
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#110195] to-[#FC9905] mx-auto mt-6 rounded-full"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                <Link
                  to={service.href}
                  className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow-md hover:shadow-xl border border-transparent hover:border-[#FC9905] dark:hover:border-[#FC9905] transition-all duration-300 flex flex-col justify-between group w-full"
                >
                  <div>
                    {/* Icon with gradient stroke and Up-Right arrow hover action */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-1 bg-gradient-to-br from-[#110195]/10 to-[#FC9905]/10 rounded-xl inline-block">
                        <IconComponent 
                          size={40} 
                          className="transition-transform duration-300 group-hover:scale-110"
                          style={{ stroke: "url(#blue-orange-grad)" }}
                        />
                      </div>
                      <div className="text-gray-400 group-hover:text-[#FC9905] transition-colors duration-300">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="font-display font-semibold text-xl text-[#0B2B5B] dark:text-white mb-2 group-hover:text-[#FC9905] transition-colors duration-200">
                      {service.title}
                    </h3>

                    {/* Petite description */}
                    <p className="text-[#110195] dark:text-[#FC9905] text-[0.85rem] font-medium italic mb-4">
                      {service.shortDesc}
                    </p>

                    {/* Description longue */}
                    <p className="text-[#1E293B] dark:text-[#E2E8F0]/90 text-[0.95rem] leading-relaxed">
                      {service.longDesc}
                    </p>
                  </div>

                  {/* Call to action within the card */}
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-sm font-semibold text-[#110195] dark:text-[#FC9905] group-hover:underline flex items-center gap-1">
                    Discover details & methodology &rarr;
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
