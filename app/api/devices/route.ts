import { NextRequest, NextResponse } from 'next/server';
import { deviceStore } from '@/lib/store';
import { DeviceStatus } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const statusFilter = searchParams.get('status') as DeviceStatus | null;

    let devices = deviceStore.getAllDevices();

    // Filter by status if provided
    if (statusFilter && (statusFilter === 'online' || statusFilter === 'offline')) {
      devices = devices.filter(device => device.status === statusFilter);
    }

    return NextResponse.json(devices, { status: 200 });
  } catch (error) {
    console.error('Error fetching devices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch devices' },
      { status: 500 }
    );
  }
}
