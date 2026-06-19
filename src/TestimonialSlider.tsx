import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export default function TestimonialSlider() {
  const { t } = useLanguage();

  const defaultTestimonials: Testimonial[] = [
    {
      quote: t('testimonials.t1') || "Working with Overseas Staffing Solutions transformed our customer service operations. Their team is professional, responsive, and consistently delivers exceptional results. We reduced costs by 40% while improving customer satisfaction scores.",
      author: "Maya Chen",
      role: "Operations Director, TechFlow Solutions"
    },
    {
      quote: t('testimonials.t2') || "The quality of talent we received exceeded our expectations. The onboarding process was seamless, and the ongoing support has been outstanding. Our technical support team is now operating at peak efficiency.",
      author: "Raj Patel",
      role: "CEO, Meridian Labs"
    },
    {
      quote: t('testimonials.t3') || "Their multilingual support team helped us expand into new markets with confidence. The cultural alignment and language proficiency of their staff made all the difference in our international growth.",
      author: "Lucia Torres",
      role: "Customer Experience Manager, Global Commerce Inc"
    },
    {
      quote: t('testimonials.t4') || "Excellent service and reliable staffing solutions. The team is always available to address our needs, and the quality of work has been consistently high. A true partner in our business growth.",
      author: "Kwame Asante",
      role: "VP of Operations, Coastal Ventures"
    },
    {
      quote: t('testimonials.t5') || "From day one, their team integrated seamlessly with our operations. The professionalism and dedication of their staff have been instrumental in scaling our customer support without compromising quality.",
      author: "Anika Bergström",
      role: "Head of Customer Success, Nordic Digital"
    }
  ];

  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'testimonials'));
        if (!querySnapshot.empty) {
          const fetched: Testimonial[] = [];
          querySnapshot.forEach((doc) => {
            fetched.push(doc.data() as Testimonial);
          });
          setTestimonials(fetched);
        }
      } catch (error) {
        console.warn("Could not fetch testimonials from database, using defaults.");
      }
    };
    fetchTestimonials();
  }, [t]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interactTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Modal and Rating state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const [formData, setFormData] = useState({ fullName: '', role: '', company: '', comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    // Using Web3Forms endpoint. Replace "YOUR_ACCESS_KEY_HERE" with your actual access key.
    const accessKey = "YOUR_ACCESS_KEY_HERE";
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Nouveau témoignage de ${formData.fullName} (${selectedRating} étoiles)`,
          from_name: "Oversea Staffing Solutions",
          to_email: "contact@overseastaffingsolutions.com",
          rating: selectedRating,
          ...formData
        })
      });
      
      const result = await response.json();
      if (response.status === 200) {
        setSubmitMessage("Merci ! Votre témoignage a été envoyé.");
        // Close modal after 2 seconds
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitMessage('');
          setFormData({ fullName: '', role: '', company: '', comment: '' });
          setSelectedRating(0);
        }, 2000);
      } else {
        setErrorMessage(result.message || "Une erreur est survenue lors de l'envoi.");
      }
    } catch (error) {
      setErrorMessage("Impossible de joindre le serveur. S'il vous plaît, réessayez plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen && !isSubmitting) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, isSubmitting]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
    handleInteraction();
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    handleInteraction();
  };

  const handleInteraction = () => {
    setIsAutoPlay(false);
    if (interactTimeoutRef.current) clearTimeout(interactTimeoutRef.current);
    interactTimeoutRef.current = setTimeout(() => {
      setIsAutoPlay(true);
    }, 10000);
  };

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  return (
    <section id="testimonials" className="py-24 bg-[#F4F9FC] dark:bg-[#0F172A] relative overflow-hidden">
      {/* Subtle texture/background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay z-0 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#FC9905] font-bold tracking-widest uppercase text-xs mb-3 block">
            {t('testimonials.badge') || "CLIENT SUCCESS STORIES"}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-[#110195] dark:text-white">
            {t('testimonials.title') || "What Our Clients Say"}
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto min-h-[350px] flex items-center justify-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0, scale: 0.98 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: direction < 0 ? '100%' : '-100%', opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute w-full px-4 sm:px-12 md:px-16"
            >
              <div className="bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-10 lg:p-12 w-full md:w-[85%] mx-auto relative border border-white/50">
                <Star className="w-8 h-8 text-[#FC9905] absolute -top-4 -left-4 bg-white dark:bg-[#1E293B] p-1.5 rounded-full shadow-md" />
                <p className="text-[#1E293B] dark:text-[#E2E8F0] text-lg md:text-[1.1rem] leading-relaxed mb-8 italic font-medium">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <p className="text-lg font-bold text-[#110195] dark:text-white mb-1">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-sm font-semibold text-[#FC9905]">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Desktop Navigation Arrows */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 z-20">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-[#1E293B] shadow-md border border-gray-100 text-[#110195] dark:text-white hover:text-[#FC9905] hover:scale-105 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-0 z-20">
            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-[#1E293B] shadow-md border border-gray-100 text-[#110195] dark:text-white hover:text-[#FC9905] hover:scale-105 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Mobile controls & Dots */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => paginate(-1)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#1E293B] shadow-md border border-gray-100 text-[#110195] dark:text-white hover:text-[#FC9905] transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-2.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'bg-[#FC9905] scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#1E293B] shadow-md border border-gray-100 text-[#110195] dark:text-white hover:text-[#FC9905] transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Rating System */}
        <div className="mt-16 text-center">
          <p className="text-[#1E293B] dark:text-[#E2E8F0] font-medium mb-4">{t('testimonials.rate') || 'Rate our services & share your experience'}</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => {
                  setSelectedRating(star);
                  setIsModalOpen(true);
                }}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  size={32}
                  className={`transition-colors duration-200 ${
                    (hoveredRating || selectedRating) >= star 
                      ? 'fill-[#FFB800] text-[#FFB800]' 
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !isSubmitting && setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#1E293B] relative z-10 w-full max-w-[90%] md:max-w-lg rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-display font-bold text-[#110195] dark:text-white mb-2">
                Share Your Testimonial
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                Please fill out the form below to submit your review.
              </p>

              {submitMessage ? (
                <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-4 rounded-xl text-center py-8">
                  <p className="font-medium text-lg">{submitMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 p-3 rounded-lg text-sm">
                      {errorMessage}
                    </div>
                  )}
                  
                  {/* Readonly rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={star <= selectedRating ? 'fill-[#FFB800] text-[#FFB800]' : 'text-gray-300 dark:text-gray-600'}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500 font-medium">Votre note : {selectedRating} étoile{selectedRating > 1 ? 's' : ''}</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nom complet *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.fullName}
                      onChange={e => setFormData(p => ({...p, fullName: e.target.value}))}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#00A9A6] focus:border-transparent outline-none transition-all dark:text-white"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Titre / Poste *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="ex: Operations Director"
                      value={formData.role}
                      onChange={e => setFormData(p => ({...p, role: e.target.value}))}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#00A9A6] focus:border-transparent outline-none transition-all dark:text-white"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nom de l'entreprise *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.company}
                      onChange={e => setFormData(p => ({...p, company: e.target.value}))}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#00A9A6] focus:border-transparent outline-none transition-all dark:text-white"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Commentaire / Témoignage *</label>
                    <textarea 
                      required 
                      rows={4}
                      value={formData.comment}
                      onChange={e => setFormData(p => ({...p, comment: e.target.value}))}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#00A9A6] focus:border-transparent outline-none transition-all resize-none dark:text-white"
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 mt-2 bg-gradient-to-r from-[#110195] to-[#FC9905] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon témoignage'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
