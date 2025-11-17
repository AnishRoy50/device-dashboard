import { Device } from './types';

// In-memory storage for devices
class DeviceStore {
  private devices: Map<string, Device> = new Map();

  addDevice(device: Device): Device {
    this.devices.set(device.uuid, device);
    return device;
  }

  getDevice(uuid: string): Device | undefined {
    return this.devices.get(uuid);
  }

  getAllDevices(): Device[] {
    return Array.from(this.devices.values());
  }

  updateDevice(uuid: string, updates: Partial<Device>): Device | undefined {
    const device = this.devices.get(uuid);
    if (!device) return undefined;

    const updatedDevice = {
      ...device,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    this.devices.set(uuid, updatedDevice);
    return updatedDevice;
  }

  deleteDevice(uuid: string): boolean {
    return this.devices.delete(uuid);
  }
}

// Singleton instance
export const deviceStore = new DeviceStore();
