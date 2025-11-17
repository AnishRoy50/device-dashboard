'use client';

import { Device } from '@/lib/types';
import { updateDeviceStatus } from '@/lib/api';
import { useState } from 'react';

interface DeviceListProps {
  devices: Device[];
  onDeviceClick: (device: Device) => void;
  onDeviceUpdate: () => void;
}

export default function DeviceList({ devices, onDeviceClick, onDeviceUpdate }: DeviceListProps) {
  const [updatingDevice, setUpdatingDevice] = useState<string | null>(null);

  const handleStatusToggle = async (device: Device, e: React.MouseEvent) => {
    e.stopPropagation();
    setUpdatingDevice(device.uuid);

    try {
      const newStatus = device.status === 'online' ? 'offline' : 'online';
      await updateDeviceStatus(device.uuid, newStatus);
      onDeviceUpdate();
    } catch (error) {
      console.error('Failed to update device status:', error);
    } finally {
      setUpdatingDevice(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (devices.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No devices found. Add a device to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Device Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {devices.map((device) => (
              <tr
                key={device.uuid}
                onClick={() => onDeviceClick(device)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{device.deviceName}</div>
                  <div className="text-sm text-gray-500">{device.deviceId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{device.deviceType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      device.status === 'online'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 mt-0.5 ${
                        device.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></span>
                    {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(device.lastUpdated)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={(e) => handleStatusToggle(device, e)}
                    disabled={updatingDevice === device.uuid}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      device.status === 'online'
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {updatingDevice === device.uuid
                      ? 'Updating...'
                      : device.status === 'online'
                      ? 'Set Offline'
                      : 'Set Online'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
