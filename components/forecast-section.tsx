"use client"

import { motion } from "framer-motion"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ForecastSectionProps {
  forecast: Array<{
    day: string
    temp: number
    icon: string
    condition: string
  }>
}

export function ForecastSection({ forecast }: ForecastSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {forecast.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center rounded-lg border p-3 text-center transition-colors hover:bg-muted/50"
            >
              <div className="font-medium">{day.day}</div>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                alt={day.condition}
                className="h-12 w-12"
              />
              <div className="mt-1 text-2xl font-bold">{day.temp}°</div>
              <div className="mt-1 text-xs text-muted-foreground">{day.condition}</div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
