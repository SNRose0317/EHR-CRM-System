// Patient management page

export default function PatientManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Patient Management</h1>
          <p className="text-gray-400">Manage patient records and information</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Add New Patient
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search patients..."
            className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
          />
          <select className="bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-500">
            <option>All Patients</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-gray-700 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left px-6 py-3 text-white font-semibold">Name</th>
              <th className="text-left px-6 py-3 text-white font-semibold">DOB</th>
              <th className="text-left px-6 py-3 text-white font-semibold">Phone</th>
              <th className="text-left px-6 py-3 text-white font-semibold">Last Visit</th>
              <th className="text-left px-6 py-3 text-white font-semibold">Status</th>
              <th className="text-left px-6 py-3 text-white font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            <tr className="hover:bg-gray-600">
              <td className="px-6 py-4">
                <div>
                  <div className="text-white font-medium">John Doe</div>
                  <div className="text-gray-400 text-sm">Patient ID: P001</div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-300">1985-03-15</td>
              <td className="px-6 py-4 text-gray-300">(555) 123-4567</td>
              <td className="px-6 py-4 text-gray-300">2024-01-15</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-green-600 text-green-100 rounded-full text-xs">Active</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button className="text-blue-400 hover:text-blue-300">View</button>
                  <button className="text-yellow-400 hover:text-yellow-300">Edit</button>
                </div>
              </td>
            </tr>
            
            <tr className="hover:bg-gray-600">
              <td className="px-6 py-4">
                <div>
                  <div className="text-white font-medium">Sarah Wilson</div>
                  <div className="text-gray-400 text-sm">Patient ID: P002</div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-300">1990-07-22</td>
              <td className="px-6 py-4 text-gray-300">(555) 987-6543</td>
              <td className="px-6 py-4 text-gray-300">2024-01-10</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-green-600 text-green-100 rounded-full text-xs">Active</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button className="text-blue-400 hover:text-blue-300">View</button>
                  <button className="text-yellow-400 hover:text-yellow-300">Edit</button>
                </div>
              </td>
            </tr>
            
            <tr className="hover:bg-gray-600">
              <td className="px-6 py-4">
                <div>
                  <div className="text-white font-medium">Michael Brown</div>
                  <div className="text-gray-400 text-sm">Patient ID: P003</div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-300">1978-11-08</td>
              <td className="px-6 py-4 text-gray-300">(555) 456-7890</td>
              <td className="px-6 py-4 text-gray-300">2023-12-20</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-red-600 text-red-100 rounded-full text-xs">Inactive</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button className="text-blue-400 hover:text-blue-300">View</button>
                  <button className="text-yellow-400 hover:text-yellow-300">Edit</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-gray-400">
          Showing 1 to 3 of 1,247 patients
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded transition-colors">Previous</button>
          <button className="bg-blue-600 text-white px-3 py-1 rounded">1</button>
          <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded transition-colors">2</button>
          <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded transition-colors">3</button>
          <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}