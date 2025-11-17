'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterDeviceSchema, RegisterDeviceInput } from '@/lib/types';
import { registerDevice } from '@/lib/api';

interface AddDeviceFormProps {
  onSuccess: () => void;
}

export default function AddDeviceForm({ onSuccess }: AddDeviceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterDeviceInput>({
    resolver: zodResolver(RegisterDeviceSchema),
    defaultValues: {
      status: 'offline',
    },
  });

  const onSubmit = async (data: RegisterDeviceInput) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await registerDevice(data);
      setSuccess(true);
      reset();
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register device');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Device</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="deviceId" className="block text-sm font-medium text-gray-700 mb-1">
            Device ID *
          </label>
          <input
            {...register('deviceId')}
            type="text"
            id="deviceId"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., DEV-001"
          />
          {errors.deviceId && (
            <p className="mt-1 text-sm text-red-600">{errors.deviceId.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="deviceName" className="block text-sm font-medium text-gray-700 mb-1">
            Device Name *
          </label>
          <input
            {...register('deviceName')}
            type="text"
            id="deviceName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Blood Analyzer Pro"
          />
          {errors.deviceName && (
            <p className="mt-1 text-sm text-red-600">{errors.deviceName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="deviceType" className="block text-sm font-medium text-gray-700 mb-1">
            Device Type *
          </label>
          <input
            {...register('deviceType')}
            type="text"
            id="deviceType"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Laboratory Equipment"
          />
          {errors.deviceType && (
            <p className="mt-1 text-sm text-red-600">{errors.deviceType.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Initial Status *
          </label>
          <select
            {...register('status')}
            id="status"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="offline">Offline</option>
            <option value="online">Online</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-600">Device registered successfully!</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Registering...' : 'Register Device'}
        </button>
      </form>
    </div>
  );
}
