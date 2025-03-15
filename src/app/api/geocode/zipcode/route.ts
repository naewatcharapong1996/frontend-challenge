import { NextResponse } from 'next/server';
import { ApiKey } from '@/constants/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get('zip');
  const apiKey = ApiKey;
  if (!zip) {
    return NextResponse.json({ error: 'Zip code parameter is required' }, { status: 400 });
  }
  
  try {
    const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`OpenWeather API error: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching zip code data:', error);
    return NextResponse.json({ error: 'Failed to fetch zip code data' }, { status: 500 });
  }
}