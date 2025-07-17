import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@marek/ui-kit';
import { createBuilder } from '@marek/medication-builder';

// Import pages (to be created)
import Dashboard from './pages/Dashboard';
import PatientManagement from './pages/PatientManagement';
import MedicationBuilder from './pages/MedicationBuilder';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-800 text-gray-100">
        {/* Sidebar Navigation */}
        <div className="flex">
          <nav className="w-64 bg-gray-900 h-screen p-4">
            <div className="mb-8">
              <h1 className="text-xl font-bold text-white">Marek Health</h1>
              <p className="text-sm text-gray-400">EHR/CRM System</p>
            </div>
            
            <div className="space-y-2">
              <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                📊 Dashboard
              </Link>
              <Link to="/patients" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                👥 Patients
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

          {/* Main Content */}
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patients" element={<PatientManagement />} />
              <Route path="/medications" element={<MedicationBuilder />} />
              <Route path="/appointments" element={<ComingSoon title="Appointments" />} />
              <Route path="/lab-results" element={<ComingSoon title="Lab Results" />} />
              <Route path="/communications" element={<ComingSoon title="Communications" />} />
              <Route path="/reports" element={<ComingSoon title="Reports" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

// Placeholder component for future modules
function ComingSoon({ title }: { title: string }) {
  return (
    <Card className="bg-gray-750">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">This module is coming soon in Phase 2-4 of development.</p>
        <p className="text-sm text-gray-500 mt-2">
          Will include comprehensive {title.toLowerCase()} management features.
        </p>
      </CardContent>
    </Card>
  );
}

export default App;