import { z } from 'zod';

// Device Status
export type DeviceStatus = 'online' | 'offline';

// Test Result Status
export type TestResultStatus = 'normal' | 'abnormal';

// Device Interface
export interface Device {
  uuid: string;
  deviceId: string;
  deviceName: string;
  deviceType: string;
  status: DeviceStatus;
  lastUpdated: string;
  createdAt: string;
}

// Test Result Interface
export interface TestResult {
  timestamp: string;
  testType: string;
  value: number;
  unit: string;
  status: TestResultStatus;
}

// Zod Schemas for Validation
export const RegisterDeviceSchema = z.object({
  deviceId: z.string().min(1, 'Device ID is required'),
  deviceName: z.string().min(1, 'Device name is required'),
  deviceType: z.string().min(1, 'Device type is required'),
  status: z.enum(['online', 'offline']),
});

export const UpdateDeviceStatusSchema = z.object({
  status: z.enum(['online', 'offline']),
});

export type RegisterDeviceInput = z.infer<typeof RegisterDeviceSchema>;
export type UpdateDeviceStatusInput = z.infer<typeof UpdateDeviceStatusSchema>;
