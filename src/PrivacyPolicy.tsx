import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

export default function PrivacyPolicy() {
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
                    {isFr ? 'Politique de confidentialité' : 'Privacy Policy'}
                  </span>
                </li>
              </ol>
            </nav>

            <Link 
              id="back-home-button-privacy"
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
              <ShieldAlert className="w-3.5 h-3.5" /> {isFr ? "Informations Légales" : "Legal Information"}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
              {isFr ? 'Politique de confidentialité' : 'Privacy Policy'}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
              {isFr 
                ? "Chez Oversea Staffing Solutions, la protection de votre vie privée et de votre sécurité est un élément fondamental de notre excellence opérationnelle. Veuillez consulter attentivement nos pratiques de confidentialité."
                : "At Oversea Staffing Solutions, protecting your privacy and security is a core element of our operational excellence. Please review our privacy practices carefully."}
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
                  <h2>1. Introduction et portée</h2>
                  <p>
                    Chez Oversea Staffing Solutions (« nous », « notre », « nos » ou « OSS »), la protection de votre vie privée et de votre sécurité est un élément fondamental de notre excellence opérationnelle. Oversea Staffing Solutions respecte votre vie privée et s'engage à protéger vos données personnelles. Cette politique de confidentialité vous informera de la manière dont nous protégeons vos données personnelles lorsque vous visitez notre site web (indépendamment d'où vous le visitez), interagissez avec nos services ou postulez à un poste chez nous, et vous informera sur vos droits en matière de confidentialité et sur la manière dont la loi vous protège.
                  </p>
                  <p>
                    À l'ère du commerce transfrontalier et du recrutement numérique, nous adhérons strictement à des principes rigoureux de traitement des données d'une manière confidentielle et transparente. Cette politique couvre toutes les plateformes, interfaces, canaux et portails gérés par Oversea Staffing Solutions. En utilisant notre site web ou en vous inscrivant à nos services, vous reconnaissez avoir lu et compris les termes de cette politique de confidentialité complète.
                  </p>

                  <h2>2. Informations que nous collectons</h2>
                  <p>
                    Nous pouvons collecter, utiliser, stocker et transférer différents genres de données personnelles vous concernant. Nous classons ces données personnelles de la manière suivante :
                  </p>
                  <ul>
                    <li><strong>Données d'identité :</strong> comprennent le prénom, le nom de jeune fille, le nom de famille, l'identifiant ou un identificateur similaire, l'état civil, le titre, la date de naissance, le sexe et les détails de la carte nationale d'identité ou du passeport lorsque cela est légalement autorisé et nécessaire à des fins de conformité.</li>
                    <li><strong>Données de contact :</strong> comprennent l'adresse électronique, les numéros de téléphone, les numéros de portable, les identifiants de messagerie, les coordonnées professionnelles, les adresses de facturation et les installations de bureaux physiques.</li>
                    <li><strong>Données relatives à l'emploi et aux candidats :</strong> comprennent les CV, l'historique professionnel, les certificats académiques, les relevés de notes, les liens de portfolios, les coordonnées des personnes de référence, la fourchette de salaire souhaitée, les compétences linguistiques et les notes d'évaluation de sélection.</li>
                    <li><strong>Données techniques :</strong> comprennent l'adresse de protocole Internet (IP), vos données de connexion, le type et la version du navigateur, le réglage du fuseau horaire et l'emplacement géographique, les types et versions de plugins de navigateur, le système d'exploitation et la plateforme, la résolution d'écran, les jetons d'empreinte digitale de l'appareil et les autres technologies des appareils que vous utilisez pour accéder à ce site web.</li>
                    <li><strong>Données d'utilisation :</strong> comprennent des informations sur la manière dont vous utilisez notre site web, les pages consultées, le temps passé sur chaque page, les chemins de navigation, les flux de clics, les interactions avec les agents du chat en direct, ainsi que les données de diagnostic de performance.</li>
                    <li><strong>Données de marketing et de communication :</strong> comprennent vos préférences concernant la réception de communications de marketing de notre part et de nos tiers, les abonnements aux newsletters, les formulaires de rétroaction et vos préférences de communication.</li>
                  </ul>
                  <p>
                    Nous collectons, utilisons et partageons également des <strong>Données agrégées</strong> telles que des données statistiques ou démographiques. Les Données agrégées peuvent être dérivées de vos données personnelles mais ne sont pas considérées comme des données personnelles au sens de la loi, car elles ne révèlent pas directement ou indirectement votre identité. Toutefois, si nous combinons ou connectons des Données agrégées avec vos données personnelles de manière à ce qu'elles puissent vous identifier directement ou indirectement, nous traitons ces données combinées comme des données personnelles qui seront utilisées conformément à cette politique de confidentialité.
                  </p>

                  <h2>3. Comment nous collectons vos données personnelles</h2>
                  <p>
                    Nous utilisons différentes méthodes pour collecter des données auprès de vous et à votre sujet, notamment :
                  </p>
                  <ul>
                    <li><strong>Interactions directes :</strong> Vous pouvez nous transmettre vos Données d'identité, de contact et d'emploi en remplissant des formulaires, en soumettant des CV ou en correspondant avec nous par courrier, téléphone, e-mail, chat en direct ou tout autre moyen. Cela inclut les données personnelles que vous fournissez lorsque vous postulez à nos services, créez un compte administratif, vous abonnez à nos newsletters ou demandez des devis de services.</li>
                    <li><strong>Technologies ou interactions automatisées :</strong> Lorsque vous interagissez avec notre site web, nous collectons automatiquement des Données techniques concernant vos équipements, vos actions et habitudes de navigation. Nous collectons ces données personnelles en utilisant des cookies, des journaux de serveurs, des pixels invisibles et d'autres technologies similaires.</li>
                    <li><strong>Tiers ou sources accessibles au public :</strong> Nous pouvons recevoir des données personnelles vous concernant de la part de divers tiers et de sources publiques, y compris des fournisseurs d'analyses (tels que Google), des réseaux professionnels (tels que LinkedIn) et des registres d'entreprises.</li>
                  </ul>

                  <h2>4. Comment nous utilisons et traitons vos informations</h2>
                  <p>
                    Nous n'utiliserons vos données personnelles que lorsque la loi nous y autorise. Le plus souvent, nous utiliserons vos données personnelles dans les circonstances suivantes :
                  </p>
                  <ul>
                    <li><strong>Exécution d'un contrat :</strong> Cela signifie le traitement de vos données là où cela est nécessaire pour l'exécution d'un contrat auquel vous êtes partie ou pour prendre des mesures à votre demande avant de conclure un tel contrat.</li>
                    <li><strong>Intérêts légitimes :</strong> Cela désigne l'intérêt de notre entreprise dans la conduite et la gestion de nos affaires pour nous permettre de vous fournir les meilleurs services et l'expérience la plus sécurisée. Nous veillons à peser tout impact potentiel sur vous et vos droits avant de procéder au traitement de vos données pour nos intérêts légitimes.</li>
                    <li><strong>Respect d'obligations légales :</strong> Cela désigne le traitement de vos données personnelles lorsqu'il est nécessaire pour se conformer à une obligation légale à laquelle nous sommes soumis, comme les lois fiscales, les réglementations du travail ou les décisions de justice.</li>
                  </ul>
                  <p>
                    Plus précisément, nous traitons vos informations pour :
                  </p>
                  <ul>
                    <li>Vous enregistrer en tant que candidat, client actuel ou administrateur.</li>
                    <li>Associer les profils des candidats aux postes vacants et projets des organisations clientes.</li>
                    <li>Gérer, suivre et traiter les transactions, la facturation, les paiements et les relevés de compte.</li>
                    <li>Assurer le bon fonctionnement du site web, effectuer des dépannages, maintenir la sécurité du système et gérer les sauvegardes.</li>
                    <li>Communiquer avec vous concernant les mises à jour, newsletters, enquêtes de satisfaction et modifications de politiques de confidentialité.</li>
                    <li>Exploiter la passerelle administrative (Admin Dashboard) et consigner les activités pour les audits de sécurité.</li>
                  </ul>

                  <h2>5. Sécurité des données et architecture de stockage</h2>
                  <p>
                    Nous avons mis en place des mesures de sécurité appropriées et avancées pour empêcher que vos données personnelles ne soient accidentellement perdues, utilisées, modifiées, divulguées ou consultées de manière non autorisée. De plus, nous limitons l'accès à vos données personnelles aux employés, agents, sous-traitants et tiers qui ont un besoin commercial d'en prendre connaissance. Ils ne traiteront vos données personnelles que sur nos instructions et sont soumis à une stricte obligation de confidentialité.
                  </p>
                  <p>
                    Toutes les transmissions de données entre votre appareil et nos serveurs sont sécurisées par un cryptage SSL/TLS. Les bases de données sont protégées par des pare-feux multicouches, des outils de surveillance des points d’accès et des droits d’accès restreints. En cas de suspicion de violation de données personnelles, nous disposons de procédures dédiées pour gérer l'événement et nous vous informerons ainsi que tout organisme de réglementation compétent lorsque nous sommes légalement tenus de le faire.
                  </p>

                  <h2>6. Transferts internationaux de données</h2>
                  <p>
                    Oversea Staffing Solutions opère à l'échelle mondiale, avec des bureaux et des serveurs cloud répartis dans plusieurs pays, notamment à Pétion-Ville (Haïti) et en Géorgie (États-Unis). Cela signifie que vos données peuvent être transférées, stockées et traitées au-delà des frontières de votre pays de résidence.
                  </p>
                  <p>
                    Chaque fois que nous transférons vos données personnelles en dehors de votre pays d'origine, nous veillons à ce qu'un degré de protection similaire soit accordé en assurant la mise en œuvre de garanties appropriées. Cela comprend l'utilisation de clauses contractuelles types approuvées par les autorités de régulation, garantissant aux données personnelles le même niveau de protection que dans votre pays d'origine.
                  </p>

                  <h2>7. Conservation des données</h2>
                  <p>
                    Nous ne conserverons vos données personnelles que pendant la durée raisonnablement nécessaire aux fins pour lesquelles nous les avons collectées, y compris pour satisfaire à toute exigence légale, réglementaire, fiscale, comptable ou de déclaration. Nous pouvons conserver vos données personnelles plus longtemps en cas de plainte ou si nous croyons raisonnablement qu'il existe une perspective de litige concernant notre relation avec vous.
                  </p>
                  <p>
                    Pour déterminer la période de conservation appropriée des données personnelles, nous prenons en compte la quantité, la nature et la sensibilité des données, le risque potentiel de préjudice découlant d'une utilisation ou d'une divulgation non autorisée de vos données personnelles, les objectifs pour lesquels nous traitons vos données personnelles et s'il est possible d'atteindre ces objectifs par d’autres moyens, ainsi que les exigences légales applicables.
                  </p>

                  <h2>8. Vos droits légaux et réglementaires</h2>
                  <p>
                    Dans certaines circonstances, vous disposez de droits garantis par les lois sur la protection des données concernant vos informations personnelles, notamment le droit de :
                  </p>
                  <ul>
                    <li><strong>Demander l'accès :</strong> vous permet d'obtenir une copie des données personnelles que nous détenons à votre sujet.</li>
                    <li><strong>Demander la rectification :</strong> vous permet de corriger des informations incomplètes ou inexactes que nous détenons sur vous.</li>
                    <li><strong>Demander l'effacement :</strong> vous permet de nous demander de supprimer vos données personnelles lorsqu'il n'y a plus de motif valable pour continuer à les traiter.</li>
                    <li><strong>S'opposer au traitement :</strong> vous permet de vous opposer au traitement de vos données personnelles lorsque nous nous appuyons sur un intérêt légitime.</li>
                    <li><strong>Demander la limitation du traitement :</strong> vous permet de suspendre le traitement de vos données personnelles.</li>
                    <li><strong>Demander le transfert :</strong> vous permet de transférer vos données à vous-même ou à un tiers de votre choix.</li>
                    <li><strong>Retirer votre consentement :</strong> à tout moment lorsque le traitement repose sur votre accord préalable.</li>
                  </ul>
                  <p>
                    Si vous souhaitez exercer l'un des droits énoncés ci-dessus, veuillez contacter notre équipe de gouvernance des données via l'adresse e-mail fournie ci-dessous.
                  </p>

                  <h2>9. Cookies et intégrations tierces</h2>
                  <p>
                    Notre site web utilise des cookies et d'autres technologies de suivi pour optimiser la vitesse de chargement, analyser le volume de visiteurs et enregistrer les préférences de l'utilisateur. Vous pouvez configurer votre navigateur pour refuser tout ou partie des cookies, ou pour être alerté lorsque des sites définissent ou accèdent à des cookies. Si vous désactivez ou refusez les cookies, veuillez noter que certaines parties de ce site web peuvent devenir inaccessibles ou ne pas fonctionner correctement.
                  </p>
                  <p>
                    Nos services, notamment les portails candidats, peuvent inclure des liens vers des portails, bases de données ou plateformes de paie externes exploités par des tiers. Cliquer sur ces liens ou activer ces connexions peut permettre à ces tiers de collecter ou de partager des données à votre sujet. Nous ne contrôlons pas ces sites web tiers et ne sommes pas responsables de leurs politiques de confidentialité.
                  </p>

                  <h2>10. Vie privée des mineurs</h2>
                  <p>
                    Nos services de recrutement, de dotation en personnel BPO et d'appariement de candidats sont des services professionnels destinés à des relations d'affaires (B2B). Ils ne sont pas destinés aux mineurs de moins de 18 ans. Nous ne collectons pas sciemment d'informations sur des personnes âgées de moins de 18 ans. Si nous découvrons que nous avons accidentellement collecté des données sur un mineur, nous purgerons immédiatement ces données de nos serveurs.
                  </p>

                  <h2>11. Modifications de cette politique de confidentialité</h2>
                  <p>
                    We reserve the right to revise, modify, or update this privacy policy at any time to reflect changing legal, regulatory, or operational requisites. When we make changes to this policy, we will amend the "Last updated" date at the bottom of the section. We encourage you to check this page periodically to remain informed about how we are protecting your data.
                  </p>

                  <h2>12. Canaux de contact et de conformité</h2>
                  <p>
                    Si vous avez des questions sur cette politique, nos pratiques de confidentialité ou si vous souhaitez exercer vos droits légaux, n'hésitez pas à contacter notre équipe dédiée à la conformité :
                  </p>
                  <div className="bg-[#F4F9FC] dark:bg-[#0F172A] p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 mt-4">
                    <strong>Oversea Staffing Solutions - Délégué à la Protection des Données (DPO)</strong> <br />
                    <strong>E-mail :</strong> <a href="mailto:contact@overseastaffingsolutions.com" className="hover:underline font-semibold text-[#110195] dark:text-[#FC9905]">contact@overseastaffingsolutions.com</a> <br />
                    <strong>Siège social :</strong> Pétion-Ville, Haïti / Géorgie, États-Unis
                  </div>
                </>
              ) : (
                <>
                  <h2>1. Introduction & Scope</h2>
                  <p>
                    At Oversea Staffing Solutions ("we", "our", "us", or "OSS"), protecting your privacy and security is a core element of our operational excellence. Oversea Staffing Solutions respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from), interact with our services, or apply for engagement, and tell you about your privacy rights and how the law protects you.
                  </p>
                  <p>
                    In an era of cross-border commerce and digital staffing, we strictly adhere to rigorous data processing principles to ensure that candidate, client, and visitor information is handled with absolute confidentiality. This policy covers all platforms, interfaces, channels, and portals managed by Oversea Staffing Solutions. By using our website or signing up for our services, you acknowledge that you have read and understood the terms of this comprehensive privacy policy.
                  </p>

                  <h2>2. Information We Collect</h2>
                  <p>
                    We may collect, use, store, and transfer different kinds of personal data about you. We categorize this personal data as follows:
                  </p>
                  <ul>
                    <li><strong>Identity Data:</strong> includes first name, maiden name, last name, username or similar identifier, marital status, title, date of birth, gender, and national identification/passport details where legally permitted and necessary for compliance.</li>
                    <li><strong>Contact Data:</strong> includes email address, telephone numbers, cellular numbers, messaging IDs, and professional address information, billing addresses, and physical office installations.</li>
                    <li><strong>Employment & Candidate Data:</strong> includes CVs, resumes, professional certificates, employment history, transcripts, portfolio links, reference contact information, desired salary range, language proficiencies, and screening evaluation notes.</li>
                    <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, screen resolution, device fingerprinting tokens, and other technology on the devices you use to access this website.</li>
                    <li><strong>Usage Data:</strong> includes information about how you use our website, pages viewed, time spent on each page, navigation paths, clickstreams, interactions with live chat agents, and diagnostic data regarding performance.</li>
                    <li><strong>Marketing and Communications Data:</strong> includes your preferences in receiving marketing from us and our third parties, newsletter subscriptions, feedback forms, and your communication preferences.</li>
                  </ul>
                  <p>
                    We also collect, use, and share <strong>Aggregated Data</strong> such as statistical or demographic data. Aggregated Data could be derived from your personal data but is not considered personal data in law as this data does not directly or indirectly reveal your identity. However, if we combine or connect Aggregated Data with your personal data so that it can directly or indirectly identify you, we treat the combined data as personal data which will be used in accordance with this privacy policy.
                  </p>

                  <h2>3. How We Collect Your Personal Data</h2>
                  <p>
                    We use different methods to collect data from and about you, including through:
                  </p>
                  <ul>
                    <li><strong>Direct interactions:</strong> You may give us your Identity, Contact, and Employment Data by filling in forms, submitting resumes, or by corresponding with us by post, phone, email, live chat, or otherwise. This includes personal data you provide when you apply for our staffing services, create an account, subscribe to our publication list, or request quotes.</li>
                    <li><strong>Automated technologies or interactions:</strong> As you interact with our website, we will automatically collect Technical Data about your equipment, browsing actions, and patterns. We collect this personal data by using cookies, server logs, pixel tracking, and other similar technologies.</li>
                    <li><strong>Third parties or publicly available sources:</strong> We may receive personal data about you from various third parties and public sources, including analytics providers (such as Google), routing systems, professional networks (such as LinkedIn), and corporate registers.</li>
                  </ul>

                  <h2>4. How We Use and Process Your Information</h2>
                  <p>
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                  </p>
                  <ul>
                    <li><strong>Performance of a Contract:</strong> This means processing your data where it is necessary for the performance of a contract to which you are a party or to take steps at your request before entering into such a contract.</li>
                    <li><strong>Legitimate Interests:</strong> This means the interest of our business in conducting and managing our services to enable us to give you the most optimized service and the most secure experience. We make sure we consider and balance any potential impact on you and your rights before we process your personal data for our legitimate interests.</li>
                    <li><strong>Compliance with Legal Obligation:</strong> This means processing your personal data where it is necessary for compliance with a legal obligation that we are subject to, such as tax laws, labor regulations, or litigation holds.</li>
                  </ul>
                  <p>
                    Specifically, we process your information to:
                  </p>
                  <ul>
                    <li>Register you as a new candidate, current client, or administrator.</li>
                    <li>Match candidates with employment and project openings at client organizations.</li>
                    <li>Manage, monitor, and process transactions, billing, payments, and invoices.</li>
                    <li>Ensure smooth website operation, perform troubleshooting, system security, and backup routines.</li>
                    <li>Communicate with you regarding updates, newsletters, feedback loops, and policy changes.</li>
                    <li>Operate the Admin Gateway and log activity for security audits.</li>
                  </ul>

                  <h2>5. Data Security & Storage Architecture</h2>
                  <p>
                    We have put in place appropriate and advanced security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a strict duty of confidentiality.
                  </p>
                  <p>
                    All data transmission between your device and our servers is secured using SSL/TLS encryption. Databases are protected by multi-layered firewalls, endpoint monitoring, and restricted access rights. In the event of a suspected personal data breach, we have procedures to deal with the event and will notify you and any applicable regulator where we are legally required to do so.
                  </p>

                  <h2>6. International Data Transfers</h2>
                  <p>
                    Oversea Staffing Solutions operates globally, with offices and cloud servers in multiple locations, including Pétion-Ville (Haïti) and Georgia (USA). This means your data may be transferred, stored, and processed across international borders.
                  </p>
                  <p>
                    Whenever we transfer your personal data out of your home country, we ensure a similar degree of protection is afforded to it by ensuring appropriate safeguards are implemented. This includes using specific standard contractual clauses approved by regulators which give personal data the same protection it has under home regulations.
                  </p>

                  <h2>7. Data Retention</h2>
                  <p>
                    We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.
                  </p>
                  <p>
                    To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal requirements.
                  </p>

                  <h2>8. Your Legal & Regulatory Rights</h2>
                  <p>
                    Under certain circumstances, you have rights under data protection laws in relation to your personal data. These include the right to:
                  </p>
                  <ul>
                    <li><strong>Request access</strong> to your personal data (commonly known as a "data subject access request"). This enables you to receive a copy of the personal data we hold about you.</li>
                    <li><strong>Request correction</strong> of the personal data that we hold about you. This enables you to have any incomplete or inaccurate data we hold about you corrected.</li>
                    <li><strong>Request erasure</strong> of your personal data. This enables you to ask us to delete or remove personal data where there is no good reason for us continuing to process it.</li>
                    <li><strong>Object to processing</strong> of your personal data where we are relying on a legitimate interest and there is something about your particular situation which makes you want to object to processing.</li>
                    <li><strong>Request restriction</strong> of processing of your personal data. This enables you to ask us to suspend the processing of your personal data.</li>
                    <li><strong>Request transfer</strong> of your personal data to you or to a third party.</li>
                    <li><strong>Withdraw consent</strong> at any time where we are relying on consent to process your personal data.</li>
                  </ul>
                  <p>
                    If you wish to exercise any of the rights set out above, please contact our data governance team at the email address provided below.
                  </p>

                  <h2>9. Cookies & Third-Party Integrations</h2>
                  <p>
                    Our website utilizes cookies and tracking technologies to optimize loading speeds, analyze visitor volume, and save user configurations. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
                  </p>
                  <p>
                    Our services, including candidate portals, may integrate links to third-party portals, databases, or payroll platforms. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
                  </p>

                  <h2>10. Children's Privacy</h2>
                  <p>
                    Our services are specialized business-to-business staffing services and candidate matching platforms. They are not intended for children under the age of 18. We do not knowingly collect personal data from anyone under 18 years of age. If we learn that we have accidentally collected personal data from a minor, we will purge that information immediately from our database.
                  </p>

                  <h2>11. Policy Modifications</h2>
                  <p>
                    We reserve the right to revise, modify, or update this privacy policy at any time to reflect changing legal, regulatory, or operational requisites. When we make changes to this policy, we will amend the "Last updated" date at the bottom of the section. We encourage you to check this page periodically to remain informed about how we are protecting your data.
                  </p>

                  <h2>12. Contact and Compliance Channels</h2>
                  <p>
                    If you have any questions about this privacy policy, our privacy practices, or if you would like to exercise any of your legal rights, please do not hesitate to reach out to our dedicated compliance team:
                  </p>
                  <div className="bg-[#F4F9FC] dark:bg-[#0F172A] p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 mt-4">
                    <strong>Oversea Staffing Solutions - Data Protection Officer</strong> <br />
                    <strong>Email:</strong> <a href="mailto:contact@overseastaffingsolutions.com" className="hover:underline font-semibold text-[#110195] dark:text-[#FC9905]">contact@overseastaffingsolutions.com</a> <br />
                    <strong>Headquarters:</strong> Pétion-Ville, Haïti / Georgia, USA
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
