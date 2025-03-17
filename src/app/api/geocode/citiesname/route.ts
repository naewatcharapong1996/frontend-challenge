import { NextResponse } from 'next/server';
import { ApiKey } from '@/constants/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const apiKey = ApiKey;
  
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }
  
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`OpenWeather API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    return NextResponse.json({ error: 'Failed to fetch geocode data' }, { status: 500 });
  }
}