import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  LogOut, 
  Mail, 
  Phone, 
  FileText, 
  Briefcase,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronLeft
} from 'lucide-react';

type ApplicationStatus = 'New' | 'Reviewed' | 'Interviewed' | 'Rejected' | 'Hired';

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  roleId: string;
  status: ApplicationStatus;
}

const MOCK_APPLICATIONS: Application[] = [
  { id: '1', name: 'Jean Dupont', email: 'jean.dupont@email.com', phone: '+509 3456 7890', date: '2026-06-12', roleId: 'customer-service-representative', status: 'New' },
  { id: '2', name: 'Marie Claire', email: 'marie.claire@email.com', phone: '+509 4567 8901', date: '2026-06-11', roleId: 'customer-service-representative', status: 'Reviewed' },
  { id: '3', name: 'Paul Pierre', email: 'paul.pierre@email.com', phone: '+509 5678 9012', date: '2026-06-10', roleId: 'translator', status: 'Interviewed' },
  { id: '4', name: 'Sophie Lavoie', email: 'sophie.l@email.com', phone: '+1 514 123 4567', date: '2026-06-09', roleId: 'translator', status: 'New' },
  { id: '5', name: 'Marc Simon', email: 'marc.simon@email.com', phone: '+1 438 987 6543', date: '2026-06-12', roleId: 'technical-support', status: 'New' },
  { id: '6', name: 'Lucie Bernard', email: 'lucie.b@email.com', phone: '+33 6 12 34 56 78', date: '2026-06-08', roleId: 'technical-support', status: 'Hired' },
  { id: '7', name: 'Antoine Morel', email: 'antoine.m@email.com', phone: '+509 2345 6789', date: '2026-06-11', roleId: 'general', status: 'Rejected' },
];

const TABS = [
  { id: 'all', label: 'All Applications' },
  { id: 'customer-service-representative', label: 'Customer Service' },
  { id: 'translator', label: 'Translator' },
  { id: 'technical-support', label: 'Technical Support' },
  { id: 'general', label: 'General' },
];

const getStatusColor = (status: ApplicationStatus) => {
  switch (status) {
    case 'New': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'Reviewed': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'Interviewed': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    case 'Hired': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
  }
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredApplications = applications.filter(app => {
    const matchesTab = activeTab === 'all' || app.roleId === activeTab;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F4F9FC] dark:bg-[#020617] text-[#1E293B] dark:text-[#E2E8F0] transition-colors duration-300 font-sans flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white dark:bg-[#0F172A] border-r border-gray-200 dark:border-gray-800 flex flex-col pt-6 md:min-h-screen z-20 shadow-sm relative">
        <div className="px-6 mb-8 flex items-center justify-between">
          <Link to="/" className="text-[#0B2B5B] dark:text-white font-display font-bold text-xl flex items-center gap-2">
            <Briefcase className="text-[#FC9905] w-6 h-6" /> Admin
          </Link>
          <Link to="/" className="md:hidden text-gray-400 hover:text-[#0B2B5B] dark:hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button className="w-full flex items-center justify-between px-4 py-3 bg-[#110195]/5 dark:bg-[#FC9905]/10 text-[#110195] dark:text-[#FC9905] rounded-xl font-medium transition-colors">
            <span className="flex items-center gap-3">
              <Users className="w-5 h-5" /> Applications
            </span>
            <span className="bg-[#110195] text-white text-xs py-0.5 px-2 rounded-full">
              {applications.length}
            </span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>

        <div className="p-4 mt-auto">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Exit Dashboard
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* HEADER */}
        <header className="bg-white dark:bg-[#0F172A] border-b border-gray-200 dark:border-gray-800 px-8 py-5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-2xl font-display font-bold text-[#0B2B5B] dark:text-white">Job Applications</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review and manage candidate submissions.</p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#F4F9FC] dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#110195] dark:focus:ring-[#FC9905] text-sm w-64 transition-shadow"
              />
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 p-8 overflow-y-auto">
          
          {/* TABS */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[#110195] text-white shadow-md' 
                    : 'bg-white dark:bg-[#1E293B] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="sm:hidden mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#110195] dark:focus:ring-[#FC9905] text-sm shadow-sm"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#0F172A] border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-sm">
                    <th className="px-6 py-4 font-medium">Candidate</th>
                    <th className="px-6 py-4 font-medium">Contact</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Resume</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredApplications.length > 0 ? (
                      filteredApplications.map((app) => (
                        <motion.tr 
                          key={app.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <div className="font-semibold text-[#0B2B5B] dark:text-white group-hover:text-[#110195] dark:group-hover:text-[#FC9905] transition-colors">
                              {app.name}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm space-y-1">
                              <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                                <Mail className="w-3.5 h-3.5" /> <a href={`mailto:${app.email}`} className="hover:underline">{app.email}</a>
                              </div>
                              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs">
                                <Phone className="w-3.5 h-3.5" /> {app.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {TABS.find(t => t.id === app.roleId)?.label || app.roleId}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" /> {app.date}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#110195] hover:text-white dark:hover:bg-[#FC9905] transition-colors">
                              <FileText className="w-4 h-4" />
                            </button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                          <div className="flex flex-col items-center justify-center">
                            <Search className="w-8 h-8 text-gray-300 mb-3" />
                            <p>No applications found matching your criteria.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
