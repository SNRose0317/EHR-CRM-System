import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  DomainConfigProvider,
  useServiceRecipientConfig,
  useServiceRecipientTerminology
} from '@marek/shared';
import { loadDomainConfig } from '../../../config/environment';

// Import pages
import Dashboard from './pages/Dashboard';
import ServiceRecipientManagement from './pages/PatientManagement';
import MedicationBuilder from './pages/MedicationBuilder';

// Load domain configuration from environment
const domainConfig = loadDomainConfig();

function App() {
  return (
    <DomainConfigProvider config={domainConfig}>
      <Router>
        <div className="min-h-screen bg-gray-800 text-gray-100">
          {/* Sidebar Navigation */}
          <div className="flex">
            <Navigation />
            <MainContent />
          </div>
        </div>
      </Router>
    </DomainConfigProvider>
  );
}

function Navigation() {
  const serviceRecipientConfig = useServiceRecipientConfig();
  const terminology = useServiceRecipientTerminology();
  
  return (
    <nav className="w-64 bg-gray-900 h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Marek Health</h1>
        <p className="text-sm text-gray-400">EHR/CRM System</p>
      </div>
      
      <div className="space-y-2">
        <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
          📊 Dashboard
        </Link>
        <Link to={serviceRecipientConfig.routes.list} className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
          👥 {terminology.pluralCap}
        </Link>
        <Link to="/appointments" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
          📅 Appointments
        </Link>
        <Link to="/lab-results" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
          🧪 Lab Results
        </Link>
        <Link to="/medications" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
          💊 Medications
        </Link>
        <Link to="/communications" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
          💬 Communications
        </Link>
        <Link to="/reports" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
          📈 Reports
        </Link>
      </div>
    </nav>
  );
}

function MainContent() {
  const serviceRecipientConfig = useServiceRecipientConfig();
  
  return (
    <main className="flex-1 p-6">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path={serviceRecipientConfig.routes.list} element={<ServiceRecipientManagement />} />
        <Route path="/medications" element={<MedicationBuilder />} />
        <Route path="/appointments" element={<ComingSoon title="Appointments" />} />
        <Route path="/lab-results" element={<ComingSoon title="Lab Results" />} />
        <Route path="/communications" element={<ComingSoon title="Communications" />} />
        <Route path="/reports" element={<ComingSoon title="Reports" />} />
      </Routes>
    </main>
  );
}

// Placeholder component for future modules
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400">This module is coming soon in Phase 2-4 of development.</p>
      <p className="text-sm text-gray-500 mt-2">
        Will include comprehensive {title.toLowerCase()} management features.
      </p>
    </div>
  );
}

export default App;