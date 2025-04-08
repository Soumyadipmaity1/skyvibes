export interface City {
  id: number
  name: string
  country: string
}

export interface CurrentWeather {
  city: string
  country: string
  date: string
  time: string
  temperature: number
  feelsLike: number
  condition: string
  humidity: number
  wind: number
  pressure: number
  visibility: number
  uvIndex: number
  isDay: boolean
}

export interface HourlyWeather {
  time: string
  temperature: number
  condition: string
  precipitation: number
}

export interface DailyWeather {
  day: string
  date: string
  high: number
  low: number
  condition: string
  precipitation: number
}

export interface AirQuality {
  aqi: number
  category: string
  pm25: number
  pm10: number
}

export interface WeatherAlert {
  id: number
  type: string
  title: string
  description: string
  time: string
  severity: string
}
