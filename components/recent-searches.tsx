"use client"

import { motion } from "framer-motion"
import { History } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin } from "lucide-react"

interface RecentSearchesProps {
  searches: string[]
  onSelect: (city: string) => void
  isLoading: boolean
}

export function RecentSearches({ searches, onSelect, isLoading }: RecentSearchesProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Recent Searches
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : searches.length > 0 ? (
          <div className="space-y-2">
            {searches.map((city, index) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left font-normal"
                  onClick={() => onSelect(city)}
                >
                    <MapPin className="mr-2 h-4 w-4" />

                  {city}
                </Button>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="py-3 text-center text-sm text-muted-foreground">No recent searches</p>
        )}
      </CardContent>
    </Card>
  )
}
