import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@marek/ui-kit';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Welcome to the Marek Health EHR/CRM Platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-750">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,234</div>
            <p className="text-xs text-green-400">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-750">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Appointments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">56</div>
            <p className="text-xs text-blue-400">8 pending lab results</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-750">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">892</div>
            <p className="text-xs text-yellow-400">23 need renewal</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-750">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Revenue (MTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$45,231</div>
            <p className="text-xs text-green-400">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-750">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex-col gap-2 bg-blue-600 hover:bg-blue-700">
              <span className="text-2xl">👥</span>
              <span>Add New Patient</span>
            </Button>
            <Button className="h-auto p-4 flex-col gap-2 bg-green-600 hover:bg-green-700">
              <span className="text-2xl">📅</span>
              <span>Schedule Appointment</span>
            </Button>
            <Button className="h-auto p-4 flex-col gap-2 bg-purple-600 hover:bg-purple-700">
              <span className="text-2xl">💊</span>
              <span>Create Prescription</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-750">
          <CardHeader>
            <CardTitle>Recent Patient Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">John Smith - Check-up completed</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Sarah Johnson - Lab results ready</p>
                  <p className="text-xs text-gray-400">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Mike Davis - Prescription refill requested</p>
                  <p className="text-xs text-gray-400">6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-750">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Medication Builder</span>
                <span className="text-green-400 text-sm">✓ Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Patient Database</span>
                <span className="text-green-400 text-sm">✓ Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Lab Integration</span>
                <span className="text-yellow-400 text-sm">⚠ Maintenance</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">E-Prescribing</span>
                <span className="text-green-400 text-sm">✓ Operational</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}