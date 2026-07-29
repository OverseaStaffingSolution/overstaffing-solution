import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Building, Server, ShieldCheck, FileText, Globe, Code } from 'lucide-react';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

export default function LegalNotice() {
  const { language } = useLanguage();
  const isFr = language === 'FR';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F9FC] dark:bg-[#0F172A] text-[#1E293B] dark:text-[#E2E8F0] transition-colors duration-300 pt-0">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#110195] via-[#110195] to-[#FC9905] pt-[160px] pb-16 md:pt-[180px] md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(252,153,5,0.1),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Actions: Breadcrumb & Back button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <nav className="flex text-sm text-white/70" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li>
                  <Link to="/" className="hover:text-[#FC9905] transition-colors">
                    {isFr ? 'Accueil' : 'Home'}
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-white font-medium">
                    {isFr ? 'Mentions Légales' : 'Legal Notice'}
                  </span>
                </li>
              </ol>
            </nav>

            <Link 
              id="back-home-button-legal"
              to="/" 
              className="inline-flex items-center gap-2 self-start text-sm font-medium px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10 hover:border-white/20 backdrop-blur-sm shadow-sm"
            >
              <ArrowLeft size={16} /> {isFr ? "Retour à l'accueil" : "Return to Home"}
            </Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FC9905]/20 text-[#FC9905] uppercase tracking-wider mb-4">
              <Scale className="w-3.5 h-3.5" /> {isFr ? "Informations Règlementaires" : "Regulatory Information"}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
              {isFr ? 'Mentions Légales' : 'Legal Notice'}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
              {isFr 
                ? "Conformément aux réglementations internationales et à la transparence numérique, voici les informations légales relatives à l'éditeur, l'hébergeur et les conditions de fonctionnement du site Oversea Staffing Solutions."
                : "In compliance with international regulations and digital transparency standards, here are the legal notices regarding the publisher, host, and terms of operation of Oversea Staffing Solutions."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Highlight Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-[#110195]/10 dark:bg-[#110195]/30 text-[#110195] dark:text-[#FC9905] rounded-xl shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1 text-[#0B2B5B] dark:text-white">
                  {isFr ? "Éditeur du site" : "Site Publisher"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Oversea Staffing Solutions Inc.
                  <br />Pétion-Ville, Haiti & Georgia, USA
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-[#FC9905]/10 text-[#FC9905] rounded-xl shrink-0">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1 text-[#0B2B5B] dark:text-white">
                  {isFr ? "Hébergement" : "Web Hosting"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Cloud Infrastructure & Netlify Platform
                  <br />Global Edge Network CDN
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl shrink-0">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1 text-[#0B2B5B] dark:text-white">
                  {isFr ? "Développement" : "Development"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Haitian D.E.V.
                  <br />
                  <a href="https://haitiandev.org" target="_blank" rel="noopener noreferrer" className="text-[#FC9905] hover:underline">
                    haitiandev.org
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Legal Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-[#1E293B] p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:text-[#0B2B5B] dark:prose-headings:text-white prose-a:text-[#FC9905]">
              {isFr ? (
                <>
                  <h2>1. Éditeur du site</h2>
                  <p>
                    Le site internet accessible à l'adresse <strong>https://www.overseastaffingsolutions.com</strong> (ci-après désigné le « Site ») est édité et exploité par la société <strong>Oversea Staffing Solutions</strong> (ci-après désignée « OSS »).
                  </p>
                  <ul>
                    <li><strong>Dénomination sociale :</strong> Oversea Staffing Solutions</li>
                    <li><strong>Siège social (Caraïbes) :</strong> Pétion-Ville, Haïti</li>
                    <li><strong>Représentation États-Unis :</strong> Georgia, USA</li>
                    <li><strong>Adresse électronique de contact :</strong> <a href="mailto:contact@overseastaffingsolutions.com">contact@overseastaffingsolutions.com</a></li>
                    <li><strong>Ligne téléphonique :</strong> +1 (800) 555-0199</li>
                  </ul>

                  <h2>2. Directeur de la publication</h2>
                  <p>
                    Le Directeur de la publication du Site est l'équipe de Direction Générale d'Oversea Staffing Solutions. Pour toute question ou demande relative aux contenus éditoriaux, vous pouvez adresser un courriel à <a href="mailto:contact@overseastaffingsolutions.com">contact@overseastaffingsolutions.com</a>.
                  </p>

                  <h2>3. Hébergement du site</h2>
                  <p>
                    Le Site est hébergé sur des infrastructures de serveurs sécurisées distribuées à l'échelle mondiale :
                  </p>
                  <ul>
                    <li><strong>Plateforme d'hébergement :</strong> Cloud Run / Google Cloud Infrastructure & Netlify</li>
                    <li><strong>Adresse web de l'hébergeur :</strong> Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) & Netlify Inc. (512 2nd Street, Suite 200, San Francisco, CA 94107, USA).</li>
                  </ul>

                  <h2>4. Conception et Développement Web</h2>
                  <p>
                    La conception graphique, l'architecture logicielle, le développement technique et l'optimisation des performances du Site ont été réalisés par :
                  </p>
                  <ul>
                    <li><strong>Organisme créateur :</strong> Haitian D.E.V.</li>
                    <li><strong>Site web officiel :</strong> <a href="https://haitiandev.org" target="_blank" rel="noopener noreferrer">https://haitiandev.org</a></li>
                  </ul>

                  <h2>5. Propriété intellectuelle et droits d'auteur</h2>
                  <p>
                    L'ensemble des éléments constituant le Site Oversea Staffing Solutions (notamment les textes, graphismes, logos, marques, visuels, photographies, icônes, animations, structures de bases de données, identité visuelle, fichiers audio et vidéo) est la propriété exclusive d'Oversea Staffing Solutions ou fait l'objet d'une autorisation explicite d'exploitation.
                  </p>
                  <p>
                    Toute reproduction, représentation, modification, publication, adaptation, totale ou partielle de l'un quelconque de ces éléments, quel que soit le moyen ou le procédé utilisé, est strictement interdite sans l'autorisation écrite préalable d'Oversea Staffing Solutions. Toute exploitation non autorisée du Site ou de l'un de ses éléments sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux lois internationales relatives à la propriété intellectuelle.
                  </p>

                  <h2>6. Protection des données personnelles & Sécurité</h2>
                  <p>
                    Oversea Staffing Solutions s'engage à ce que la collecte et le traitement de vos données personnelles effectués à partir du Site soient conformes aux lois en vigueur relatives à la protection de la vie privée et des données.
                  </p>
                  <p>
                    Les formulaires de contact et de candidature en ligne intègrent des mécanismes stricts de désinfection des entrées (anti-XSS, anti-injection, limitation du débit de soumission). Pour en savoir plus sur la collecte de vos données, la conservation et vos droits d'accès, de rectification et de suppression, veuillez consulter notre <Link to="/privacy-policy">Politique de Confidentialité</Link>.
                  </p>

                  <h2>7. Cookies et Liens Hypertextes</h2>
                  <p>
                    Le Site peut contenir des liens hypertextes vers d'autres sites web. Cependant, Oversea Staffing Solutions n'a pas la possibilité de vérifier le contenu des sites ainsi visités et n'assumera en conséquence aucune responsabilité de ce fait.
                  </p>
                  <p>
                    La navigation sur le Site est susceptible de provoquer l'installation de cookie(s) sur l'ordinateur de l'utilisateur à des fins strictes de navigation, de choix de langue (EN/FR) et de préférence de thème (clair/sombre).
                  </p>

                  <h2>8. Limitation de responsabilité</h2>
                  <p>
                    Oversea Staffing Solutions s'efforce de fournir sur le Site des informations aussi précises que possible. Toutefois, la société ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                  </p>

                  <h2>9. Droit applicable et juridiction compétente</h2>
                  <p>
                    Tout litige en lien avec l'utilisation du Site Oversea Staffing Solutions est soumis au droit applicable. En cas de différend et à défaut d'accord amiable, le litige sera porté devant les tribunaux compétents.
                  </p>
                </>
              ) : (
                <>
                  <h2>1. Site Publisher</h2>
                  <p>
                    The website accessible at <strong>https://www.overseastaffingsolutions.com</strong> (hereinafter referred to as the "Site") is published and operated by <strong>Oversea Staffing Solutions</strong> (hereinafter "OSS").
                  </p>
                  <ul>
                    <li><strong>Company Name:</strong> Oversea Staffing Solutions</li>
                    <li><strong>Caribbean Headquarters:</strong> Pétion-Ville, Haiti</li>
                    <li><strong>US Representative Office:</strong> Georgia, USA</li>
                    <li><strong>Contact Email:</strong> <a href="mailto:contact@overseastaffingsolutions.com">contact@overseastaffingsolutions.com</a></li>
                    <li><strong>Phone Line:</strong> +1 (800) 555-0199</li>
                  </ul>

                  <h2>2. Publication Director</h2>
                  <p>
                    The Publication Director of the Site is the Executive Management Team of Oversea Staffing Solutions. For any questions regarding editorial content, you may contact <a href="mailto:contact@overseastaffingsolutions.com">contact@overseastaffingsolutions.com</a>.
                  </p>

                  <h2>3. Web Hosting</h2>
                  <p>
                    The Site is hosted on globally distributed, high-availability Cloud server infrastructure:
                  </p>
                  <ul>
                    <li><strong>Hosting Platform:</strong> Cloud Run / Google Cloud Infrastructure & Netlify Platform</li>
                    <li><strong>Host Addresses:</strong> Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) & Netlify Inc. (512 2nd Street, Suite 200, San Francisco, CA 94107, USA).</li>
                  </ul>

                  <h2>4. Web Design & Engineering</h2>
                  <p>
                    The graphic design, software architecture, technical engineering, and performance optimization of the Site were crafted by:
                  </p>
                  <ul>
                    <li><strong>Development Organization:</strong> Haitian D.E.V.</li>
                    <li><strong>Official Website:</strong> <a href="https://haitiandev.org" target="_blank" rel="noopener noreferrer">https://haitiandev.org</a></li>
                  </ul>

                  <h2>5. Intellectual Property & Copyrights</h2>
                  <p>
                    All materials on the Oversea Staffing Solutions Site (including text, graphics, logos, trademarks, photographs, icons, animations, databases, visual identity, audio, and video content) are the exclusive property of Oversea Staffing Solutions or are used under explicit license.
                  </p>
                  <p>
                    Any unauthorized reproduction, distribution, modification, or adaptation of any part of this Site is strictly prohibited without prior written consent from Oversea Staffing Solutions.
                  </p>

                  <h2>6. Personal Data Protection & Security</h2>
                  <p>
                    Oversea Staffing Solutions ensures that personal data collection through the Site complies with global privacy and data protection standards.
                  </p>
                  <p>
                    Online contact and application forms feature strict input sanitization mechanisms (anti-XSS, rate-limiting, secure transport). For full details on data retention and your rights, please review our <Link to="/privacy-policy">Privacy Policy</Link>.
                  </p>

                  <h2>7. Cookies & Hyperlinks</h2>
                  <p>
                    The Site may contain links to external third-party sites. Oversea Staffing Solutions assumes no responsibility for external content or practices.
                  </p>
                  <p>
                    Browsing the Site may store functional cookies on your device solely for session management, language preference (EN/FR), and theme state (light/dark).
                  </p>

                  <h2>8. Limitation of Liability</h2>
                  <p>
                    Oversea Staffing Solutions strives to maintain precise and up-to-date information on the Site. However, the company shall not be held liable for omissions or temporary service disruptions.
                  </p>

                  <h2>9. Governing Law</h2>
                  <p>
                    Any dispute relating to the use of the Site Oversea Staffing Solutions shall be subject to applicable international commercial law and jurisdiction guidelines.
                  </p>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
