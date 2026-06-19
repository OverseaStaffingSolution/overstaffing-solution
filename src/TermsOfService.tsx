import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

export default function TermsOfService() {
  const { language } = useLanguage();
  const isFr = language === 'FR';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F9FC] dark:bg-[#0F172A] text-[#1E293B] dark:text-[#E2E8F0] transition-colors duration-300 pt-0">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#110195] via-[#110195]/90 to-[#FC9905]/10 pt-[160px] pb-16 md:pt-[180px] md:pb-24 relative overflow-hidden">
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
                    {isFr ? 'Conditions d\'utilisation' : 'Terms of Service'}
                  </span>
                </li>
              </ol>
            </nav>

            <Link 
              id="back-home-button-terms"
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
              <ShieldAlert className="w-3.5 h-3.5" /> {isFr ? "Conditions Légales" : "Legal Terms"}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
              {isFr ? 'Conditions d\'utilisation' : 'Terms of Service'}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
              {isFr 
                ? "Veuillez lire attentivement nos conditions d'utilisation. En accédant à nos services, vous acceptez d'être lié par ces règles."
                : "Please review our terms of service carefully. By accessing our services, you agree to be bound by these corporate rules."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-[#1E293B] p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:text-[#0B2B5B] dark:prose-headings:text-white prose-a:text-[#00A9A6]">
              {isFr ? (
                <>
                  <h2>1. Acceptation des conditions et portée multi-juridictionnelle</h2>
                  <p>
                    En accédant, naviguant ou utilisant ce site web, ses portails, ses formulaires de candidature ou toute interface de plateforme exploitée par Oversea Staffing Solutions (« nous », « notre », « nos » ou « OSS »), vous reconnaissez avoir lu, compris et accepté sans équivoque d'être lié par les termes et dispositions de ce contrat de conditions de service (les « Conditions »).
                  </p>
                  <p>
                    Ces Conditions constituent un contrat légal contraignant entre vous—qu'il s'agisse d'un candidat individuel, d'un représentant du client, d'un visiteur ou d'un administrateur—et Oversea Staffing Solutions. Si vous n'êtes pas d'accord avec une partie de ces Conditions, vous devez immédiatement cesser tout accès, utilisation et communication dans l'ensemble de nos domaines numériques et serveurs.
                  </p>
                  <p>
                    Nos services sont conçus pour les personnes âgées d’au moins 18 ans. En vous engageant sur nos plateformes ou en remplissant nos formulaires de candidature, vous garantissez que vous possédez la capacité juridique de conclure des contrats contraignants dans votre juridiction d’origine (notamment Pétion-Ville, Haïti et la Géorgie, États-Unis).
                  </p>

                  <h2>2. Description des services professionnels et portails numériques</h2>
                  <p>
                    Oversea Staffing Solutions est un fournisseur mondial de services haut de gamme d'externalisation des processus métier (BPO), de gestion de centres d’appels multicanaux dédiés, de placement de représentants du service à la clientèle à distance, de qualification des pistes de vente professionnelle, d'opérateurs de chat en direct en temps réel, d'assistance technique robuste et d'études de marché exhaustives.
                  </p>
                  <p>
                    OSS fournit aux visiteurs et aux clients des outils interactifs, des portails de rapprochement de bases de données de candidats, des demandes d'informations numériques, des formulaires de contact en direct et des services d'arrière-guichet administratifs localisés (collectivement, les « Services »). Nous nous réservons le droit unilatéral et absolu de modifier, suspendre, mettre à niveau ou interrompre de façon permanente toute fonctionnalité, segment de service, accès au portail ou protocole système à tout moment, sans préavis et sans responsabilité aucune.
                  </p>
                  <p>
                    Vous comprenez que même si notre site web public décrit les offres de recrutement et la disponibilité du personnel, tout déploiement d’entreprise actif, toute allocation d’agents virtuels dédiés ou tout accord personnalisé de niveau de service (SLA) est régi par un Contrat Cadre de Services (MSA) distinct ou un énoncé des travaux (SOW), qui l'emporte sur les présentes Conditions en cas de conflit direct.
                  </p>

                  <h2>3. Inscription au portail, sécurité d'accès et obligations du compte</h2>
                  <p>
                    Certaines fonctionnalités administratives et portails de gestion (y compris le tableau de bord administrateur OSS) nécessitent la création d'un compte autorisé et la vérification des identifiants de connexion. Lors du processus d'inscription, vous acceptez de :
                  </p>
                  <ul>
                    <li>Fournir des informations professionnelles et personnelles hautement exactes, actuelles et complètes.</li>
                    <li>Maintenir et mettre à jour rapidement les données de votre compte pour les garder véridiques et complètes.</li>
                    <li>Assurer la confidentialité absolue de tout mot de passe, lien d’accès direct sécurisé ou jeton de session généré.</li>
                    <li>Les rôles d’administration restreints ne doivent pas partager leurs profils d’accès avec des utilisateurs externes ou non vérifiés.</li>
                  </ul>
                  <p>
                    Vous assumez la responsabilité exclusive et finale de toute activité, communication, modification et suppression se produisant sous vos identifiants d'accès. Si vous soupçonnez ou constatez une violation de la sécurité, une fuite d'identifiants ou des actions non autorisées sur notre plateforme, vous devez en informer immédiatement notre département de cybersécurité et de conformité à l'adresse indiquée ci-dessous.
                  </p>

                  <h2>4. Conduite acceptable, protections de la sécurité et interdictions</h2>
                  <p>
                    Vous bénéficiez d'une licence conditionnelle, révocable, non exclusive et non transférable d'accéder à notre plateforme uniquement pour des demandes légitimes d'emploi, des flux administratifs autorisés et des communications professionnelles entre clients et candidats. Vous acceptez d’utiliser notre site et nos services uniquement à des fins légales. Il vous est strictement interdit de violer ou tenter de violer la sécurité du site, notamment :
                  </p>
                  <ul>
                    <li>Accéder à des données, fichiers, enregistrements ou routes sécurisées qui ne vous sont pas explicitement destinés, ou tenter de vous connecter à un serveur ou nœud admin pour lequel vous n'avez pas d'habilitation.</li>
                    <li>Tenter de sonder, analyser, indexer, cartographier ou tester la vulnérabilité structurelle de toute base de données, port ou segment de réseau associé, ou enfreindre les configurations de sécurité de nos pare-feux.</li>
                    <li>Perturber, ralentir de manière abusive ou faire planter le système d’hébergement principal (par exemple en envoyant de gros volumes de boucles de requêtes, en téléchargeant des scripts malveillants, des virus, des bombes logiques, des chevaux de Troie, ou en submergeant de requêtes les protocoles existants).</li>
                    <li>Utiliser des scripts de requêtes automatiques, des aspirateurs de sites, des cadres de grattage (scraping), des analyseurs ou des robots collecteurs de données pour copier des profils candidats, des témoignages ou des agencements de page de façon commerciale ou pour des analyses concurrentielles.</li>
                    <li>Falsifier ou manipuler des en-têtes d'e-mails, des métadonnées de session ou des balises de routage pour masquer l'identité source ou se faire passer pour du personnel de l'OSS, l'un de nos candidats ou d'autres utilisateurs légitimes.</li>
                  </ul>
                  <p>
                    La violation de la sécurité des infrastructures système ou réseau peut vous exposer à de graves sanctions civiles et pénales en vertu des lois nationales et internationales sur la cybercriminalité, que l'OSS poursuivra vigoureusement.
                  </p>

                  <h2>5. Facturation, conditions de service et paiements commerciaux</h2>
                  <p>
                    Bien que la navigation générale sur le site web public soit gratuite, tous les services commerciaux d'externalisation, de placement de personnel contractuel, de routage d'agents virtuels ou de campagnes dédiées nécessitent des paiements spécifiques comme stipulé dans nos contrats commerciaux.
                  </p>
                  <p>
                    Toutes les modalités de facturation, les délais de paiement, les frais d'installation et les heures de dotation en personnel sont régis par les accords de services correspondants. Les clients s'engagent à régler les factures conformément aux échéanciers convenus. Tout retard de paiement peut entraîner une suspension temporaire des services candidats, des infrastructures virtuelles de routage ou de l'administration du portail commercial.
                  </p>

                  <h2>6. Propriété intellectuelle et droits d'auteur</h2>
                  <p>
                    Les mises en page visuelles, les graphiques propriétaires de la marque, les logos d'entreprise, le texte, le code structurel, les schémas de base de données, les icônes, les styles de conception et les ressources multimédias affichés sur nos domaines sont la propriété de l'OSS, de ses partenaires technologiques ou de ses concédants de licence sous contrat. Ces ressources sont protégées par les lois sur les marques, droits d'auteur, brevets et conceptions industrielles aux États-Unis, en Haïti et à l'échelle internationale.
                  </p>
                  <p>
                    Il vous est interdit de reproduire, copier, cadrer, refléter, republier, distribuer, vendre ou exploiter commercialement tout matériel provenant de cette plateforme sans l'accord écrit exprès de notre conseil d'administration. Tout prélèvement non autorisé de textes ou de listes de candidats annulera immédiatement votre licence d’utilisation.
                  </p>

                  <h2>7. Exclusion de garanties et placement de bonne foi</h2>
                  <p>
                    Nos services, le contenu de nos portails publics et nos placements de personnel sont fournis « en l'état » et « selon disponibilité » sans garantie d'aucune sorte, qu'elle soit expresse, légale ou implicite. L'OSS ne donne aucune garantie ni représentation concernant :
                  </p>
                  <ul>
                    <li>La fiabilité, la disponibilité ou la connectivité ininterrompue des tableaux de bord du portail ou des systèmes de chat en direct lors de pannes imprévues d'électricité ou de réseau.</li>
                    <li>L'exactitude absolue, l'exhaustivité ou la validité juridique de tous les documents soumis par des profils de candidats externes.</li>
                    <li>Un résultat garanti d’embauche définitive ou une performance commerciale optimale des représentants, bien que nous menions nos processus de sélection et d'adéquation en toute bonne foi.</li>
                  </ul>

                  <h2>8. Limitation complète de responsabilité</h2>
                  <p>
                    En aucun cas Oversea Staffing Solutions, ni ses fondateurs, directeurs, employés, partenaires, agents juridiques, fournisseurs ou filiales mondiales ne pourront être tenus responsables de dommages indirects, accessoires, spéciaux, consécutifs ou punitifs. Cette exclusion comprend, sans s'y limiter :
                  </p>
                  <p>
                    La perte de bénéfices opérationnels, de revenus commerciaux, de fichiers de base de données, de configurations de systèmes, de clientèle ou d'autres pertes intangibles d'exploitation découlant de (i) votre accès ou utilisation de nos portails ; (ii) votre incapacité à accéder ou sécuriser votre compte portail ; (iii) tout comportement, message, fichier ou contenu transmis par un tiers, client ou candidat sur nos systèmes ; et (iv) l'accès non autorisé, la modification ou toute fausse manipulation de vos espaces de stockage d'informations candidats.
                  </p>

                  <h2>9. Protocoles d'indemnisation mutuelle</h2>
                  <p>
                    Vous acceptez de défendre, d'indemniser et de dégager de toute responsabilité Oversea Staffing Solutions, ses dirigeants, recruteurs et agents contre toutes réclamations, dommages légaux, pertes financières, pénalités administratives, coûts et honoraires d'avocats découlant de ou liés à :
                  </p>
                  <ul>
                    <li>Votre violation avérée de l'une des clauses définies dans les présentes Conditions.</li>
                    <li>La soumission d'informations frauduleuses, falsifiées ou trompeuses via nos formulaires de candidature ou de contact.</li>
                    <li>Vos infractions aux droits de propriété intellectuelle de tiers, aux réglementations de protection des données ou aux lois sur la conformité internationale.</li>
                  </ul>

                  <h2>10. Intégrations, plateformes et liens de tiers</h2>
                  <p>
                    Pour fournir un parcours fluide de suivi des recrutements, nos portails et tableaux de bord peuvent intégrer des composants logiciels externes, des bases de données de tiers, des applications de cartographie ou des hyperliens vers des portails de paie.
                  </p>
                  <p>
                    Nous ne surveillons pas, n'inspectons pas et ne gérons pas ces plateformes externes. Vous reconnaissez que naviguer vers des domaines tiers se fait entièrement à votre discrétion et à vos risques. OSS décline toute responsabilité quant à la disponibilité, la sécurité, la gestion des cookies et l'application des conditions de service de tout tiers connecté.
                  </p>

                  <h2>11. Loi applicable et juridiction compétente</h2>
                  <p>
                    Ces Conditions d'utilisation ainsi que tout litige ou plainte découlant de l'utilisation de nos plateformes seront régis, interprétés et appliqués conformément aux lois de l'État de Géorgie, États-Unis, et aux lois de la République d'Haïti, sans égard aux dispositions relatives aux conflits de lois.
                  </p>
                  <p>
                    Toute action en justice, médiation ou procédure judiciaire doit être introduite exclusivement devant les tribunaux compétents de l'État de Géorgie, États-Unis, ou devant les tribunaux civils compétents de Pétion-Ville, Haïti. Vous consentez par la présente à la juridiction personnelle de ces instances pour tout arbitrage ou litige.
                  </p>

                  <h2>12. Modifications des conditions et révisions dynamiques du système</h2>
                  <p>
                    Nous nous réservons le droit exclusif de modifier, d'ajuster ou de remplacer ces Conditions à tout moment afin de refléter l'évolution des réglementations légales ou de nos configurations commerciales. Lors de chaque révision, nous modifierons la date de « Dernière mise à jour » au bas de cette section.
                  </p>
                  <p>
                    Il est de votre responsabilité de consulter régulièrement ces Conditions. En continuant à utiliser nos services après publication de nouvelles versions, vous acceptez d'être légalement lié par la version révisée.
                  </p>

                  <h2>13. Divisibilité, intégralité de l'accord et renonciation</h2>
                  <p>
                    Si l'une des dispositions de ces Conditions de service est déclarée invalide ou inapplicable par un tribunal compétent, cette disposition sera dissociée sans affecter la validité et l'applicabilité des autres clauses restantes. Aucune renonciation de notre part à l'un de ces termes ne sera considérée comme une renonciation supplémentaire ou continue à ce terme ou à tout autre terme de nos accords.
                  </p>

                  <h2>14. Contact officiel de l'entreprise</h2>
                  <p>
                    Si vous avez des questions, des remarques d'ordre juridique ou des demandes d'informations concernant nos Conditions d'utilisation, veuillez contacter directement notre équipe de conformité et de gouvernance d'entreprise :
                  </p>
                  <div className="bg-[#F4F9FC] dark:bg-[#0F172A] p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 mt-4">
                    <strong>Oversea Staffing Solutions - Compliance & Terms Desk</strong> <br />
                    <strong>E-mail :</strong> <a href="mailto:contact@overseastaffingsolutions.com" className="hover:underline font-semibold text-[#110195] dark:text-[#FC9905]">contact@overseastaffingsolutions.com</a> <br />
                    <strong>Siège social :</strong> Pétion-Ville, Haïti / Géorgie, États-Unis
                  </div>
                </>
              ) : (
                <>
                  <h2>1. Acceptance of Terms & Multi-Jurisdictional Scope</h2>
                  <p>
                    By accessing, browsing, or utilizing this website, portals, application forms, or any platform interface operated by Oversea Staffing Solutions ("we", "our", "us", or "OSS"), you acknowledge that you have read, understood, and unequivocally agree to be bound by the terms and provisions of this Terms of Service agreement (the "Terms"). 
                  </p>
                  <p>
                    These Terms constitute a binding legal contract between you—whether as an individual candidate, client representative, visitor, or administrator—and Oversea Staffing Solutions. If you do not agree with any portion of these Terms, you must immediately cease all access, usage, and communication across our digital domains and servers. 
                  </p>
                  <p>
                    Our services are configured for individuals who are at least 18 years of age. By engaging with our platforms or completing application forms, you warrant that you possess the legal capacity to enter into binding agreements in your home jurisdiction (including Petion-Ville, Haïti and Georgia, USA).
                  </p>

                  <h2>2. Description of Professional Services & Digital Portals</h2>
                  <p>
                    Oversea Staffing Solutions is a global provider of premium Business Process Outsourcing (BPO), dedicated multichannel call center management, remote customer service representative placement, professional sales lead qualification, real-time live chat operators, robust technical support, and comprehensive market research services.
                  </p>
                  <p>
                    OSS provides visitors and clients with interactive tools, candidate database matching portals, digital inquiries, live contact forms, and localized administrative back-offices (collectively, the "Services"). We reserve the absolute, unilateral right to modify, suspend, upgrade, or permanently discontinue any feature, service segment, portal access, or system protocol at any time, without prior notice and without liability.
                  </p>
                  <p>
                    You understand that while our public-facing website describes candidate recruitment and staffing availability, any active corporate deployment, dedicated virtual agent allocation, or custom SLA (Service Level Agreement) is governed by a distinct bilaterally executed Master Services Agreement (MSA) or Statement of Work (SOW), which shall supersede these Terms in the event of direct conflict.
                  </p>

                  <h2>3. Portal Registration, Gateway Security, & Account Obligations</h2>
                  <p>
                    Certain administrative features and management portals (including the OSS Admin Dashboard) require the creation of an authorized account and login credential verification. During the registration or onboarding process, you agree to:
                  </p>
                  <ul>
                    <li>Provide highly accurate, current, and complete personal and professional information.</li>
                    <li>Maintain and promptly update your account data to keep it truthful and complete.</li>
                    <li>Ensure the absolute confidentiality of any generated passwords, secure direct links, or session tokens.</li>
                    <li>Restricted administrative roles must not share access profiles with external or unverified users.</li>
                  </ul>
                  <p>
                    You accept exclusive and final responsibility for any and all activities, communications, edits, and deletions that occur under your registered credential set. If you suspect or experience any breach of gateway security, credential leakage, or unauthorized actions on our platform, you must immediately report the incident to our IT Security and Compliance department at the address specified below.
                  </p>

                  <h2>4. Acceptable Conduct, Security Protections, & Prohibitions</h2>
                  <p>
                    You are granted a conditional, revocable, non-exclusive, non-transferable license to access our platform solely for legitimate job placement inquiries, administrative workflows, and professional client-candidate communications. You agree to use our website and services only for lawful purposes. You are strictly prohibited from violating or attempting to violate the security of the website, including, without limitation:
                  </p>
                  <ul>
                    <li>Accessing data, files, records, or secure routes not explicitly intended for your clearance, or logging into any server or admin node which you are not authorized to engage.</li>
                    <li>Attempting to probe, scan, index, map, or test the structural vulnerability of any associated database, port, or network segment, or to breach security firewall configurations or authentication credentials.</li>
                    <li>Interfering with, sluggishly degrading, or crashing the core host web system (e.g., submitting high volumes of request loops, uploading infected scripts, virus payloads, logic bombs, Trojan horses, "flooding," "spamming," "mailbombing," or "crashing" protocols).</li>
                    <li>Using automated scripts, web spiders, scraping frameworks, parsers, or collection bots to copy data, candidates, testimonials, or layout configurations for commercial reuse or competitor intelligence.</li>
                    <li>Forging or manipulating email headers, session metadata, or routing tags in any communication in order to mask source identification or impersonate OSS personnel, our candidates, or other users.</li>
                  </ul>
                  <p>
                    Violating system or network security infrastructures may subject you to severe civil and criminal penalties under federal, national, and international cybercrime statutes, which OSS will aggressively pursue to the fullest extent permitted by law.
                  </p>

                  <h2>5. Billing, Service Terms, and Commercial Payments</h2>
                  <p>
                    While general navigation of the public website is provided free of charge, all commercial services, including contract staff placement, virtual agent routing, dedicated chat queues, or custom campaign launches, require explicit payment setups as designated in commercial contracts.
                  </p>
                  <p>
                    All billing terms, invoice deadlines, retainer fees, setup costs, and recurring staffing hours are governed by specific service contracts. Clients agree to fulfill invoice payments in accordance with the specified timeline. Any late payments or defaults may trigger a temporary suspension of candidate services, virtual infrastructure routing, and portal administration access until the account is fully cleared.
                  </p>

                  <h2>6. Intellectual Property & Copyright Ownership</h2>
                  <p>
                    The visual layouts, custom brand graphics, corporate logos, text, structural codebases, database schematics, icons, design styles, and digital media assets displayed on our domains are the exclusive property of Oversea Staffing Solutions, our technological providers, or our contracted licensors. All such assets are protected under US, Haitian, and international trademark, copyright, patent, and industrial design regulations.
                  </p>
                  <p>
                    You are not permitted to copy, reproduce, frame, mirror, republish, distribute, sell, license, or commercially exploit any material retrieved from this platform without direct, written authorization from our corporate board of directors. Any unauthorized extraction of text, design components, or candidate lists will immediately void your license to use the platform.
                  </p>

                  <h2>7. Disclaimer of Guarantees & Good-Faith Placement</h2>
                  <p>
                    Our services, public portal content, and staff placements are provided on an "as is" and "as available" basis without warranties of any kind, whether express, statutory, or implied. OSS makes no guarantees, warranties, or representations regarding:
                  </p>
                  <ul>
                    <li>The absolute reliability, availability, or uptime of web-based portal dashboards, database access sheets, or live chat support systems during sudden utility or network outages.</li>
                    <li>The factual accuracy, completeness, or ongoing validity of documents submitted by external candidate profiles.</li>
                    <li>A guarantee of employment outcomes for candidates, or a guarantee of perfect commercial performance by matched customer service reps, though we execute all screening operations in high-quality good faith.</li>
                  </ul>

                  <h2>8. Comprehensive Limitation of Liability</h2>
                  <p>
                    In no event shall Oversea Staffing Solutions, nor its founders, directors, employees, partners, legal agents, suppliers, database integrations, or global affiliates, be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages. This exclusion includes, without limitation:
                  </p>
                  <p>
                    Loss of operational profits, commercial revenue, database files, system usage configurations, corporate goodwill, or other intangible business losses, resulting from (i) your access to or utilization of our portals; (ii) your inability to access, retrieve, or secure your portal account; (iii) any conduct, message, file, or content of any third-party, client, or candidate on our system; and (iv) unauthorized database access, modification, or security breach of candidate storage vaults.
                  </p>

                  <h2>9. Mutual Indemnification Protocols</h2>
                  <p>
                    You agree to fully defend, indemnify, and hold harmless Oversea Staffing Solutions, its officers, employees, recruiters, and agents from and against any and all claims, legal damages, financial losses, regulatory liabilities, legal costs, and attorney's fees arising from or related to:
                  </p>
                  <ul>
                    <li>Your direct breach or violation of any clause defined in these Terms.</li>
                    <li>Your submission of fraudulent, falsified, or misleading information via our application or contact forms.</li>
                    <li>Your infringement of any third-party intellectual property rights, data privacy provisions, or international compliance protocols.</li>
                  </ul>

                  <h2>10. Third-Party Integrations, Platforms, and Links</h2>
                  <p>
                    To provide a fluid user experience and functional recruitment trackers, our portals and dashboards may integrate external software components, databases, routing applications, map providers, or links to third-party payroll sites. 
                  </p>
                  <p>
                    We do not monitor, endorse, inspect, or manage these external platforms. You acknowledge that navigating to third-party endpoints is done entirely at your own discretion and risk. OSS disclaims all liability regarding the availability, legal policies, cookie configurations, or terms of any third-party platforms.
                  </p>

                  <h2>11. Mandatory Choice of Law & Jurisdiction</h2>
                  <p>
                    These Terms of Service and any dispute, litigation, or regulatory claim arising out of or connecting to our platforms shall be governed, interpreted, and enforced in accordance with the laws of the State of Georgia, USA, and the applicable laws of Haïti, without regard to their conflict of law provisions.
                  </p>
                  <p>
                    Any legal actions, mediations, or court proceedings must be filed within the appropriate designated courts of Georgia, USA, or the competent civil courts of Pétion-Ville, Haïti. You hereby consent and submit to the personal and exclusive jurisdiction of these specific forums for the adjudication of any legal actions.
                  </p>

                  <h2>12. Terms Modifications & Dynamic System Revisions</h2>
                  <p>
                    We reserve the sole and absolute discretion to modify, update, and replace these Terms at any time to reflect changing regulations, tech architectures, or corporate setups. When modifications are successfully applied, we will update the "Last updated" date at the bottom of this page.
                  </p>
                  <p>
                    It remains your active responsibility to review these Terms periodically to observe any changes. By continuing to access our services or platform after new modifications are published, you express your legal agreement to be bound by the revised Terms.
                  </p>

                  <h2>13. Severability, Entire Agreement, and Waiver</h2>
                  <p>
                    If any specific clause or provision of these Terms is determined by a competent court of law to be invalid, unlawful, or unenforceable, that clause shall be severed from the remainder of the agreement, and its invalidity shall not affect the legality and enforceability of all other remaining provisions. No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term of our business.
                  </p>

                  <h2>14. Official Corporate Corporate Contact</h2>
                  <p>
                    If you have any questions, legal concerns, or general inquiries regarding these Terms of Service, please contact our compliance and corporate governance board directly:
                  </p>
                  <div className="bg-[#F4F9FC] dark:bg-[#0F172A] p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 mt-4">
                    <strong>Oversea Staffing Solutions - Compliance & Terms Desk</strong> <br />
                    <strong>Email:</strong> <a href="mailto:contact@overseastaffingsolutions.com" className="hover:underline font-semibold text-[#110195] dark:text-[#FC9905]">contact@overseastaffingsolutions.com</a> <br />
                    <strong>Corporate Locations:</strong> Pétion-Ville, Haïti / Georgia, USA
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span>
                {isFr ? 'Dernière mise à jour : ' : 'Last updated: '}{new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="text-xs">
                {isFr ? 'Développé et optimisé par ' : 'Developed & optimized by '}
                <a 
                  href="https://www.haitiandev.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#110195] dark:text-[#FC9905] hover:underline font-semibold"
                >
                  Haitian Dev
                </a>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
