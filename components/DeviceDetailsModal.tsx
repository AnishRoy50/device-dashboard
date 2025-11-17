'use client';

import { Device, TestResult } from '@/lib/types';
import { useEffect, useState } from 'react';
import { fetchDeviceData } from '@/lib/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DeviceDetailsModalProps {
  device: Device | null;
  onClose: () => void;
}

export default function DeviceDetailsModal({ device, onClose }: DeviceDetailsModalProps) {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (device) {
      loadTestResults();
    }
  }, [device]);

  const loadTestResults = async () => {
    if (!device) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchDeviceData(device.uuid);
      setTestResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load test results');
    } finally {
      setLoading(false);
    }
  };

  if (!device) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatChartDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Group test results by test type for chart
  const testsByType = testResults.reduce((acc, test) => {
    if (!acc[test.testType]) {
      acc[test.testType] = [];
    }
    acc[test.testType].push(test);
    return acc;
  }, {} as Record<string, TestResult[]>);

  // Prepare chart data (use the first test type that has multiple entries)
  const chartTestType = Object.keys(testsByType).find(type => testsByType[type].length > 1);
  const chartData = chartTestType
    ? testsByType[chartTestType].reverse().map(test => ({
        time: formatChartDate(test.timestamp),
        value: test.value,
        status: test.status,
      }))
    : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{device.deviceName}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {device.deviceId} • {device.deviceType}
            </p>
            <div className="mt-2">
              <span
                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Device Information</h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(device.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(device.lastUpdated)}</p>
              </div>
            </div>
          </div>

          {chartData.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {chartTestType} Trend
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Test Results</h3>
              <button
                onClick={loadTestResults}
                disabled={loading}
                className="text-sm text-blue-600 hover:text-blue-700 disabled:text-blue-300"
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md mb-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : testResults.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No test results available</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Test Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {testResults.map((result, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(result.timestamp)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {result.testType}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {result.value}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {result.unit}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              result.status === 'normal'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
