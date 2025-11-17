import { NextRequest, NextResponse } from 'next/server';
import { deviceStore } from '@/lib/store';
import { UpdateDeviceStatusSchema } from '@/lib/types';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  try {
    const { uuid } = await params;
    const body = await request.json();

    // Validate input
    const validationResult = UpdateDeviceStatusSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { status } = validationResult.data;

    // Check if device exists
    const existingDevice = deviceStore.getDevice(uuid);
    if (!existingDevice) {
      return NextResponse.json(
        { error: 'Device not found' },
        { status: 404 }
      );
    }

    // Update device status
    const updatedDevice = deviceStore.updateDevice(uuid, { status });

    return NextResponse.json(updatedDevice, { status: 200 });
  } catch (error) {
    console.error('Error updating device status:', error);
    return NextResponse.json(
      { error: 'Failed to update device status' },
      { status: 500 }
    );
  }
}
