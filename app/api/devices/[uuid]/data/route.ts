import { NextRequest, NextResponse } from 'next/server';
import { deviceStore } from '@/lib/store';
import { TestResult, TestResultStatus } from '@/lib/types';

// Mock test types for laboratory
const TEST_TYPES = [
  { name: 'Blood Glucose', unit: 'mg/dL', normalRange: { min: 70, max: 100 } },
  { name: 'Body Temperature', unit: '°C', normalRange: { min: 36.1, max: 37.2 } },
  { name: 'Heart Rate', unit: 'bpm', normalRange: { min: 60, max: 100 } },
  { name: 'Blood Pressure Systolic', unit: 'mmHg', normalRange: { min: 90, max: 120 } },
  { name: 'Blood Pressure Diastolic', unit: 'mmHg', normalRange: { min: 60, max: 80 } },
  { name: 'Oxygen Saturation', unit: '%', normalRange: { min: 95, max: 100 } },
  { name: 'Hemoglobin', unit: 'g/dL', normalRange: { min: 12, max: 16 } },
  { name: 'White Blood Cell Count', unit: '10^9/L', normalRange: { min: 4, max: 11 } },
];

function generateMockTestResults(count: number): TestResult[] {
  const results: TestResult[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const testConfig = TEST_TYPES[Math.floor(Math.random() * TEST_TYPES.length)];
    const { min, max } = testConfig.normalRange;
    
    // 80% chance of normal value, 20% chance of abnormal
    const isNormal = Math.random() > 0.2;
    let value: number;
    
    if (isNormal) {
      value = min + Math.random() * (max - min);
    } else {
      // Generate abnormal value (outside normal range)
      value = Math.random() > 0.5 
        ? max + Math.random() * (max * 0.3)
        : min - Math.random() * (min * 0.3);
    }

    const status: TestResultStatus = 
      value >= testConfig.normalRange.min && value <= testConfig.normalRange.max
        ? 'normal'
        : 'abnormal';

    // Generate timestamps going back in time
    const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));

    results.push({
      timestamp: timestamp.toISOString(),
      testType: testConfig.name,
      value: parseFloat(value.toFixed(2)),
      unit: testConfig.unit,
      status,
    });
  }

  return results.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  try {
    const { uuid } = await params;

    // Check if device exists
    const device = deviceStore.getDevice(uuid);
    if (!device) {
      return NextResponse.json(
        { error: 'Device not found' },
        { status: 404 }
      );
    }

    // Generate 5-10 mock test results
    const count = 5 + Math.floor(Math.random() * 6);
    const testResults = generateMockTestResults(count);

    return NextResponse.json(testResults, { status: 200 });
  } catch (error) {
    console.error('Error fetching device data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch device data' },
      { status: 500 }
    );
  }
}
