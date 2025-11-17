import { NextRequest, NextResponse } from 'next/server';

// Hardcoded credentials (for demo purposes only)
const VALID_USERS = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'user123' },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check credentials
    const user = VALID_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

    return NextResponse.json(
      {
        success: true,
        token,
        user: { username },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
