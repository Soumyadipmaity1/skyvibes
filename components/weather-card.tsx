"use client"

import { motion } from "framer-motion"
import { Thermometer, Droplets, Wind } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface WeatherCardProps {
  weather: {
    city: string
    country: string
    temperature: number
    condition: string
    humidity: number
    windSpeed: number
    icon: string
  }
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const getWeatherBackground = (condition: string) => {
    const conditionLower = condition.toLowerCase()

    if (conditionLower.includes("clear") || conditionLower.includes("sunny")) {
      return "bg-gradient-to-br from-blue-400 to-blue-600"
    } else if (conditionLower.includes("cloud")) {
      return "bg-gradient-to-br from-slate-400 to-slate-600"
    } else if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
      return "bg-gradient-to-br from-blue-700 to-blue-900"
    } else if (conditionLower.includes("snow")) {
      return "bg-gradient-to-br from-blue-100 to-blue-300"
    } else if (conditionLower.includes("thunder")) {
      return "bg-gradient-to-br from-slate-700 to-slate-900"
    } else {
      return "bg-gradient-to-br from-blue-500 to-blue-700"
    }
  }

  return (
    <Card className={`overflow-hidden border-none shadow-lg ${getWeatherBackground(weather.condition)}`}>
      <CardContent className="p-0">
        <div className="p-6 text-white">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {weather.city}, {weather.country}
              </h2>
              <p className="mt-1 text-xl font-medium">{weather.condition}</p>
            </div>

            <div className="flex items-center">
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.condition}
                className="h-16 w-16"
              />
              <div className="text-5xl font-bold">{weather.temperature}°C</div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <motion.div
              className="flex items-center gap-3 rounded-lg bg-white/20 p-4 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="rounded-full bg-white/20 p-2">
                <Thermometer className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Feels Like</p>
                <p className="text-lg font-bold">{weather.temperature}°C</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 rounded-lg bg-white/20 p-4 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="rounded-full bg-white/20 p-2">
                <Droplets className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Humidity</p>
                <p className="text-lg font-bold">{weather.humidity}%</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 rounded-lg bg-white/20 p-4 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="rounded-full bg-white/20 p-2">
                <Wind className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Wind Speed</p>
                <p className="text-lg font-bold">{weather.windSpeed} km/h</p>
              </div>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
