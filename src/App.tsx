/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./LandingPage";
import ContactPage from "./ContactPage";
import Navbar from "./Navbar";
import CustomerService from "./CustomerService";
import LeadGeneration from "./LeadGeneration";
import LiveChatSupport from "./LiveChatSupport";
import MarketResearch from "./MarketResearch";
import SalesLeadQualification from "./SalesLeadQualification";
import Telemarketing from "./Telemarketing";
import CustomerServiceRep from "./CustomerServiceRep";
import Translator from "./Translator";
import TechnicalSupport from "./TechnicalSupport";
import SecurityWrapper from "./SecurityWrapper";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import ApplicationForm from "./ApplicationForm";
import AdminDashboard from "./AdminDashboard";

export default function App() {
  return (
    <Router>
      <SecurityWrapper>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services/customer-service" element={<CustomerService />} />
          <Route path="/services/lead-generation" element={<LeadGeneration />} />
          <Route path="/services/live-chat-support" element={<LiveChatSupport />} />
          <Route path="/services/market-research" element={<MarketResearch />} />
          <Route path="/services/sales-lead-qualification" element={<SalesLeadQualification />} />
          <Route path="/services/telemarketing" element={<Telemarketing />} />
          <Route path="/careers/customer-service-representative" element={<CustomerServiceRep />} />
          <Route path="/careers/translator" element={<Translator />} />
          <Route path="/careers/technical-support" element={<TechnicalSupport />} />
          <Route path="/careers/apply/:jobId" element={<ApplicationForm />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </SecurityWrapper>
    </Router>
  );
}

