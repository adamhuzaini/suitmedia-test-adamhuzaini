// src/app/api/test/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://suitmedia-backend.suitdev.com/api/ideas');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}