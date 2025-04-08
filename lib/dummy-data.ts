import type { City, CurrentWeather } from "./types"

// Sample cities data
export const cities: City[] = [
  { id: 1, name: "New York", country: "USA" },
  { id: 2, name: "London", country: "UK" },
  { id: 3, name: "Tokyo", country: "Japan" },
  { id: 4, name: "Paris", country: "France" },
  { id: 5, name: "Sydney", country: "Australia" },
]

// Sample current weather data
export const currentWeather: CurrentWeather = {
  city: "New York",
  country: "USA",
  date: "Wednesday, April 9",
  time: "12:30 PM",
  temperature: 22,
  feelsLike: 24,
  condition: "Partly Cloudy",
  humidity: 65,
  wind: 12,
  pressure: 1012,
  visibility: 15,
  uvIndex: 6,
  isDay: true,
}
