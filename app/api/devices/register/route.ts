import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { deviceStore } from '@/lib/store';
import { RegisterDeviceSchema } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = RegisterDeviceSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { deviceId, deviceName, deviceType, status } = validationResult.data;

    // Create new device
    const newDevice = {
      uuid: uuidv4(),
      deviceId,
      deviceName,
      deviceType,
      status,
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    // Store device
    const device = deviceStore.addDevice(newDevice);

    return NextResponse.json(device, { status: 201 });
  } catch (error) {
    console.error('Error registering device:', error);
    return NextResponse.json(
      { error: 'Failed to register device' },
      { status: 500 }
    );
  }
}
