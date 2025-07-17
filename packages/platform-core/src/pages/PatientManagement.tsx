import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@marek/ui-kit';

export default function PatientManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Patient Management</h1>
          <p className="text-gray-400">Manage patient profiles and medical records</p>
        </div>
        <Button className="bg-red-500 hover:bg-red-600">
          + Add New Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gray-750">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Input 
              placeholder="Search by name, ID, or phone..." 
              className="flex-1 bg-gray-700 border-gray-600"
            />
            <Button variant="outline">Search</Button>
            <Button variant="outline">Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <Card className="bg-gray-750">
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-3 text-gray-400">Name</th>
                  <th className="text-left p-3 text-gray-400">DOB</th>
                  <th className="text-left p-3 text-gray-400">Phone</th>
                  <th className="text-left p-3 text-gray-400">Last Visit</th>
                  <th className="text-left p-3 text-gray-400">Status</th>
                  <th className="text-left p-3 text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-3">
                    <div>
                      <div className="font-medium text-white">John Smith</div>
                      <div className="text-sm text-gray-400">ID: PT-2024-001</div>
                    </div>
                  </td>
                  <td className="p-3 text-gray-300">03/15/1985</td>
                  <td className="p-3 text-gray-300">(555) 123-4567</td>
                  <td className="p-3 text-gray-300">01/15/2024</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-green-600 text-green-100 rounded-full text-xs">
                      Active
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-3">
                    <div>
                      <div className="font-medium text-white">Sarah Johnson</div>
                      <div className="text-sm text-gray-400">ID: PT-2024-002</div>
                    </div>
                  </td>
                  <td className="p-3 text-gray-300">07/22/1992</td>
                  <td className="p-3 text-gray-300">(555) 234-5678</td>
                  <td className="p-3 text-gray-300">01/10/2024</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-green-600 text-green-100 rounded-full text-xs">
                      Active
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-3">
                    <div>
                      <div className="font-medium text-white">Mike Davis</div>
                      <div className="text-sm text-gray-400">ID: PT-2024-003</div>
                    </div>
                  </td>
                  <td className="p-3 text-gray-300">11/08/1978</td>
                  <td className="p-3 text-gray-300">(555) 345-6789</td>
                  <td className="p-3 text-gray-300">12/28/2023</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-yellow-600 text-yellow-100 rounded-full text-xs">
                      Follow-up
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-750">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,234</div>
            <p className="text-xs text-green-400">+45 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-750">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Pending Follow-ups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">23</div>
            <p className="text-xs text-yellow-400">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-750">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">New This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-blue-400">8 completed intake</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}