"use client"

import type React from "react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Search, RefreshCw } from "lucide-react"

import { WeatherCard } from "@/components/weather-card"
import { ForecastSection } from "@/components/forecast-section"
import { RecentSearches } from "@/components/recent-searches"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY


export function WeatherDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [weatherData, setWeatherData] = useState<any>(null)
  const [forecastData, setForecastData] = useState([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      toast({ title: "Please enter a city name", variant: "destructive" })
      return
    }

    setIsLoading(true)

    try {

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${API_KEY}&units=metric`
      )
      const weather = await weatherRes.json()

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${API_KEY}&units=metric`
      )
      const forecast = await forecastRes.json()

      const filteredForecast = forecast.list.filter((item: any) =>
        item.dt_txt.includes("12:00:00")
      ).slice(0, 5).map((item: any) => ({
        day: new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        condition: item.weather[0].main,
      }))

      setWeatherData({
        city: weather.name,
        country: weather.sys.country,
        temperature: Math.round(weather.main.temp),
        condition: weather.weather[0].main,
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
        icon: weather.weather[0].icon,
      })

      setForecastData(filteredForecast)

      setRecentSearches((prev) => {
        const updated = [searchQuery, ...prev.filter((city) => city.toLowerCase() !== searchQuery.toLowerCase())]
        return updated.slice(0, 5)
      })

      toast({
        title: "Weather updated",
        description: `Weather data for ${searchQuery} has been updated.`,
      })
    } catch (error) {
      toast({ title: "Error fetching weather data", variant: "destructive" })
    }

    setIsLoading(false)
    setSearchQuery("")
  }

  const handleRefresh = () => {
    if (weatherData?.city) {
      setSearchQuery(weatherData.city)
      handleSearch({ preventDefault: () => {} } as React.FormEvent)
    }
  }

  const handleRecentSearch = (city: string) => {
    setSearchQuery(city)
    handleSearch({ preventDefault: () => {} } as React.FormEvent)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pb-8">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Weather Dashboard</h1>
              <p className="text-muted-foreground">Check weather conditions anywhere in the world</p>
            </div>
            <ThemeToggle />
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <form onSubmit={handleSearch} className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for a city..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Searching
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </form>
            <Button variant="outline" onClick={handleRefresh} disabled={isLoading} className="shrink-0">
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          <div className="md:col-span-2 lg:col-span-3">
            <div className="grid gap-6">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="weather"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {weatherData && <WeatherCard weather={weatherData} />}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading-forecast"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="forecast"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {forecastData.length > 0 && <ForecastSection forecast={forecastData} />}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <RecentSearches searches={recentSearches} onSelect={handleRecentSearch} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  )
}