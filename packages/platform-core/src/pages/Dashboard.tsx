// Dashboard page

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Overview of patient care and system metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Total Patients</h3>
          <p className="text-3xl font-bold text-blue-400">1,247</p>
          <p className="text-sm text-gray-400">+12% from last month</p>
        </div>
        
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Today's Appointments</h3>
          <p className="text-3xl font-bold text-green-400">28</p>
          <p className="text-sm text-gray-400">3 upcoming</p>
        </div>
        
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Pending Lab Results</h3>
          <p className="text-3xl font-bold text-yellow-400">15</p>
          <p className="text-sm text-gray-400">Requires review</p>
        </div>
        
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Messages</h3>
          <p className="text-3xl font-bold text-purple-400">7</p>
          <p className="text-sm text-gray-400">Unread</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-700 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors">
            Add New Patient
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors">
            Schedule Appointment
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors">
            Create Prescription
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-700 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-600">
            <div>
              <p className="text-white">Patient John Doe - Lab results reviewed</p>
              <p className="text-sm text-gray-400">2 minutes ago</p>
            </div>
            <span className="text-green-400 text-sm">Completed</span>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-gray-600">
            <div>
              <p className="text-white">New appointment scheduled for Sarah Wilson</p>
              <p className="text-sm text-gray-400">15 minutes ago</p>
            </div>
            <span className="text-blue-400 text-sm">Scheduled</span>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-gray-600">
            <div>
              <p className="text-white">Prescription sent for Michael Brown</p>
              <p className="text-sm text-gray-400">1 hour ago</p>
            </div>
            <span className="text-purple-400 text-sm">Sent</span>
          </div>
        </div>
      </div>
    </div>
  );
}