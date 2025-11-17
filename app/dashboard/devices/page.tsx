'use client';

import { useEffect, useState } from 'react';
import { Device, DeviceStatus } from '@/lib/types';
import { fetchDevices } from '@/lib/api';
import DeviceList from '@/components/DeviceList';
import DeviceDetailsModal from '@/components/DeviceDetailsModal';
import AddDeviceForm from '@/components/AddDeviceForm';
import { useAuth } from '@/lib/useAuth';

export default function DevicesDashboard() {
  const { isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [statusFilter, setStatusFilter] = useState<DeviceStatus | 'all'>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const loadDevices = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);

    try {
      const filter = statusFilter !== 'all' ? statusFilter : undefined;
      const data = await fetchDevices(filter);
      setDevices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load devices');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter: DeviceStatus | 'all') => {
    setStatusFilter(filter);
  };

  useEffect(() => {
    loadDevices();
  }, [statusFilter, isAuthenticated]);

  const stats = {
    total: devices.length,
    online: devices.filter((d) => d.status === 'online').length,
    offline: devices.filter((d) => d.status === 'offline').length,
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Device Status Dashboard</h1>
            <p className="text-gray-600">Monitor and manage your laboratory devices</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Devices</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Online Devices</p>
                <p className="text-3xl font-bold text-green-600">{stats.online}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Offline Devices</p>
                <p className="text-3xl font-bold text-red-600">{stats.offline}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Device List */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    statusFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterChange('online')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    statusFilter === 'online'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Online
                </button>
                <button
                  onClick={() => handleFilterChange('offline')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    statusFilter === 'offline'
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Offline
                </button>
              </div>

              <button
                onClick={loadDevices}
                disabled={loading}
                className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-12 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <DeviceList
                devices={devices}
                onDeviceClick={setSelectedDevice}
                onDeviceUpdate={loadDevices}
              />
            )}
          </div>

          {/* Add Device Form */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors lg:hidden"
              >
                {showAddForm ? 'Hide Form' : 'Add New Device'}
              </button>
            </div>
            <div className={`${showAddForm ? 'block' : 'hidden'} lg:block`}>
              <AddDeviceForm onSuccess={loadDevices} />
            </div>
          </div>
        </div>
      </div>

      {/* Device Details Modal */}
      <DeviceDetailsModal device={selectedDevice} onClose={() => setSelectedDevice(null)} />
    </div>
  );
}
