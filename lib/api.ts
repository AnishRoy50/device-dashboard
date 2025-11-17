import { Device, RegisterDeviceInput, TestResult } from './types';

const API_BASE = '/api/devices';

export async function registerDevice(data: RegisterDeviceInput): Promise<Device> {
  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to register device');
  }

  return response.json();
}

export async function fetchDevices(status?: 'online' | 'offline'): Promise<Device[]> {
  const url = status ? `${API_BASE}?status=${status}` : API_BASE;
  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch devices');
  }

  return response.json();
}

export async function updateDeviceStatus(
  uuid: string,
  status: 'online' | 'offline'
): Promise<Device> {
  const response = await fetch(`${API_BASE}/${uuid}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update device status');
  }

  return response.json();
}

export async function fetchDeviceData(uuid: string): Promise<TestResult[]> {
  const response = await fetch(`${API_BASE}/${uuid}/data`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch device data');
  }

  return response.json();
}
