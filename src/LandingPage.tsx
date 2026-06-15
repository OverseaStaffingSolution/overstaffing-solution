import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import Navbar from './Navbar';
import TestimonialSlider from './TestimonialSlider';
import FloatingCards from './FloatingCards';
import WhyChooseUs from './WhyChooseUs';
import ServicesSection from './ServicesSection';
import Footer from './Footer';
import ContactForm from './ContactForm';
import {
  Clock, ShieldCheck, Zap, Users, Globe2, MapPin, Search, TrendingUp,
  Sun, HeadphonesIcon, PhoneOutgoing, Wrench, Briefcase, ChevronDown,
  ChevronLeft, ChevronRight, Linkedin, Twitter, Facebook, Instagram, MessageSquare, Menu, X, ArrowDown
} from 'lucide-react';

import { Link } from 'react-router-dom';

const statsOverview = [
  { title: "24/7 Support", desc: "Always available", icon: <Clock className="w-6 h-6" /> },
  { title: "Top Talent", desc: "Verified professionals", icon: <ShieldCheck className="w-6 h-6" /> },
  { title: "Fast Placement", desc: "Quick response", icon: <Zap className="w-6 h-6" /> },
  { title: "500+ Active Agents", desc: "Ready to deploy", icon: <Users className="w-6 h-6" /> },
  { title: "50+ Global Clients", desc: "Trusted worldwide", icon: <Globe2 className="w-6 h-6" /> }
];

const jobListings = [
  {
    title: "Customer Service Representative",
    desc: "Join our team as a Customer Service Representative and help deliver exceptional support experiences. Handle inbound calls, resolve customer inquiries, and build lasting relationships.",
    reqs: ["Excellent communication skills", "Problem-solving abilities", "Patience and empathy", "Computer proficiency"]
  },
  {
    title: "Translations",
    desc: "Become part of our multilingual team providing professional translation services. Work with diverse clients and help bridge language barriers in customer communications.",
    reqs: ["Fluency in multiple languages", "Strong written communication", "Attention to detail", "Cultural awareness"]
  },
  {
    title: "Technical Support",
    desc: "Provide expert technical assistance to customers facing product or service issues. Troubleshoot problems, guide users through solutions, and ensure customer satisfaction.",
    reqs: ["Technical aptitude", "Problem-solving skills", "Clear communication", "Patience and persistence"]
  }
];

export default function LandingPage() {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const springConfig = { damping: 20, stiffness: 50 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width) * 100;
    const y = ((clientY - top) / height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  const dynamicBackgroundX = useTransform(smoothX, [0, 100], [-30, 30]);
  const dynamicBackgroundY = useTransform(smoothY, [0, 100], [-30, 30]);
  const invertX = useTransform(smoothX, [0, 100], [30, -30]);
  const invertY = useTransform(smoothY, [0, 100], [30, -30]);

  return (
    <div className="font-sans text-[#1E293B] dark:text-[#E2E8F0] bg-[#F4F9FC] dark:bg-[#020617] min-h-screen overflow-x-hidden selection:bg-[#FC9905]/20 selection:text-[#110195] transition-colors duration-300">
      <main>
        {/* HERO SECTION */}
        <section 
          className="relative min-h-[90vh] flex items-center pt-32 pb-40 md:pt-48 md:pb-56 overflow-hidden group bg-[#110195]"
          onMouseMove={handleMouseMove}
        >
          {/* Main Interactive Background Gradient */}
          <motion.div 
            className="absolute inset-0 z-0 opacity-80 mix-blend-overlay pointer-events-none"
            style={{
              background: useMotionTemplate`radial-gradient(circle 1200px at ${smoothX}% ${smoothY}%, #FC9905 0%, transparent 80%)`
            }}
          />
          {/* Animated Blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            
            {/* Injection directe des mouvements dans le composant */}
            <style>{`
              @keyframes morphing {
                0% { border-radius: 50%; }
                30% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
                60% { border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%; }
                80% { border-radius: 48% 52% 62% 38% / 40% 55% 45% 60%; }
                100% { border-radius: 50%; }
              }
            `}</style>
            
            {/* Blob 1 - Follows mouse */}
            <motion.div 
              className="absolute rounded-full opacity-60 blur-[90px]"
              style={{
                backgroundColor: '#FC9905',
                width: '750px',
                height: '750px',
                top: '-15%',
                left: '-10%',
                animation: 'morphing 18s ease-in-out infinite',
                x: dynamicBackgroundX,
                y: dynamicBackgroundY
              }}
            />

            {/* Blob 2 - Inverses mouse */}
            <motion.div 
              className="absolute rounded-full opacity-60 blur-[100px]"
              style={{
                backgroundColor: '#110195',
                width: '800px',
                height: '800px',
                bottom: '-15%',
                right: '-10%',
                animation: 'morphing 22s ease-in-out infinite',
                animationDelay: '2s',
                x: invertX,
                y: invertY
              }}
            />

            {/* Blob 3 - Follows mouse alternative */}
            <motion.div 
              className="absolute rounded-full opacity-40 blur-[80px]"
              style={{
                backgroundColor: '#FC9905',
                width: '500px',
                height: '500px',
                top: '30%',
                left: '25%',
                animation: 'morphing 20s ease-in-out infinite',
                animationDelay: '4s',
                x: dynamicBackgroundX,
                y: invertY
              }}
            />

            {/* Blob 4 - Inverses alternative */}
            <motion.div 
              className="absolute rounded-full opacity-40 blur-[90px]"
              style={{
                backgroundColor: '#110195',
                width: '550px',
                height: '550px',
                top: '5%',
                right: '15%',
                animation: 'morphing 24s ease-in-out infinite',
                animationDelay: '6s',
                x: invertX,
                y: dynamicBackgroundY
              }}
            />
          </div>


          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay z-0"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8 md:mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column (Text + Buttons) */}
              <div className="max-w-2xl px-2">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="h-1 w-24 bg-white dark:bg-[#1E293B] mb-8 rounded-full"
                ></motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
                >
                  Your premier Caribbean destination for elite call center staffing.
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="font-sans text-lg md:text-xl text-white/90 leading-relaxed font-light mb-8 lg:pr-8"
                >
                  Oversea Staffing Solutions delivers uncompromising excellence, sophisticated service standards, and seamless cultural harmony for discerning enterprises. Transform your customer experience with our nearshore BPO solutions.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <a 
                    href="#why" 
                    className="bg-transparent border-2 border-white text-white hover:bg-white dark:bg-[#1E293B] hover:text-[#FC9905] px-6 py-3 rounded-[40px] font-semibold text-lg text-center transition-all duration-300"
                  >
                    Why Choose Us
                  </a>
                  <Link 
                    to="/contact" 
                    className="bg-white dark:bg-[#1E293B] border-2 border-transparent text-[#110195] dark:text-white hover:bg-transparent hover:border-white hover:text-white px-6 py-3 rounded-[40px] font-semibold text-lg text-center transition-all duration-300"
                  >
                    Contact Our Team
                  </Link>
                </motion.div>
              </div>

              {/* Right Column (Image) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full flex justify-center lg:justify-end lg:pl-10"
              >
                <div className="relative w-full sm:w-full lg:w-[160%] lg:max-w-[160%] lg:-mr-32 lg:-mt-12">
                  {/* Overlay gradient to blend colors seamlessly into the subject */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FC9905]/10 to-[#110195]/40 mix-blend-overlay z-10 rounded-2xl pointer-events-none"></div>
                  {/* Subtle inner shadow to remove floating aspect and reduce bright edges */}
                  <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.2)] z-10 rounded-2xl pointer-events-none"></div>
                  
                  <img 
                    src="https://i.postimg.cc/QtYSXV0Z/GIRL-OG-upscayl-5x-upscayl-standard-4x.png" 
                    alt="Call Center Professional" 
                    className="w-full h-auto object-cover rounded-2xl shadow-2xl brightness-90 saturate-[0.9]"
                    style={{
                      WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                      maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* SCROLL Indicator */}
          <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <ArrowDown className="text-white w-5 h-5" />
            </motion.div>
            <span className="text-white text-[12px] font-bold tracking-[0.2em] uppercase">Scroll</span>
          </div>

          {/* Interactive Hover Wave (appears on hover) */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none z-[5] transition-all duration-700 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 mix-blend-overlay">
            <motion.svg
              className="relative block w-full h-[150px] md:h-[250px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              style={{ width: "200%" }}
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
            >
              <path
                d="M0,40 C150,100 350,100 600,40 C850,-20 1050,-20 1200,40 C1350,100 1550,100 1800,40 C2050,-20 2250,-20 2400,40 L2400,120 L0,120 Z"
                fill="#ffffff"
                opacity="0.5"
              ></path>
            </motion.svg>
          </div>

          {/* Animated SVG Wave Base */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none z-10">
            <motion.svg
              className="relative block w-full h-[70px] md:h-[120px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              style={{ width: "200%" }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              <defs>
                <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FC9905" />
                  <stop offset="100%" stopColor="#110195" />
                </linearGradient>
              </defs>
              <path
                d="M0,60 C150,120 350,120 600,60 C850,0 1050,0 1200,60 C1350,120 1550,120 1800,60 C2050,0 2250,0 2400,60 L2400,120 L0,120 Z"
                fill="url(#wave-grad)"
                opacity="0.3"
              ></path>
              <path
                d="M0,80 C150,140 350,140 600,80 C850,20 1050,20 1200,80 C1350,140 1550,140 1800,80 C2050,20 2250,20 2400,80 L2400,120 L0,120 Z"
                fill="#F4F9FC"
                opacity="1"
              ></path>
            </motion.svg>
          </div>
        </section>

        {/* STATS / CHIFFRES CLES */}
        <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-24 mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {statsOverview.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-xl shadow-[#110195]/5 border border-[#FC9905]/10 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-14 h-14 bg-[#F4F9FC] dark:bg-[#0F172A] text-[#FC9905] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FC9905] group-hover:text-white transition-colors duration-300">
                  {stat.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-[#110195] dark:text-white mb-2">{stat.title}</h3>
                <p className="text-sm text-[#1E293B] dark:text-[#E2E8F0] font-light">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <WhyChooseUs />

        {/* OUR COMMITMENT */}
        <section className="relative mt-24 pb-12 pt-16 md:mt-32 md:pb-16 md:pt-24 overflow-visible">
          {/* Full-width gradient banner */}
          <div className="w-full bg-gradient-to-r from-[#110195] to-[#FC9905] relative lg:h-[320px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full">
              <div className="flex flex-col lg:flex-row items-center h-full w-full">
                
                {/* Content */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="w-full lg:w-[55%] py-10 lg:py-8 order-2 lg:order-2 z-20 flex flex-col justify-center h-full lg:ml-auto"
                >
                  <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white mb-4 lg:mb-6 leading-[1.15]">
                    We provide better<br />customer experiences.
                  </h2>
                  <p className="text-white text-sm md:text-base font-light leading-relaxed max-w-2xl">
                    Oversea Staffing Solutions aims to deliver a true customer service experience. Each and every contact your customers have with our agents influences your success. We follow the best practices – valuing customer time, maintaining a pleasant attitude, and providing knowledgeable and resourceful information. At Oversea Staffing Solutions, we know we provide exactly what your customers need.
                  </p>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full lg:w-auto order-1 lg:order-1 flex justify-center lg:justify-start relative z-30 pointer-events-none mt-[-80px] md:mt-[-120px] lg:mt-0 lg:absolute lg:left-0 lg:bottom-0"
                >
                  <img 
                    src="https://i.postimg.cc/YSSbz3LG/men.png" 
                    alt="Customer Service Representative" 
                    className="w-[85%] max-w-[320px] md:max-w-[440px] lg:max-w-none lg:w-[460px] xl:w-[500px] h-auto object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] block lg:mb-0"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <ServicesSection />

        <FloatingCards />

        {/* TESTIMONIALS */}
        <TestimonialSlider />
        
        {/* CONTACT FORM */}
        <ContactForm />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
