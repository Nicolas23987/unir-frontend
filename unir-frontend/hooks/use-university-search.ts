import { useState, useEffect } from "react"
import { publicApi } from "@/lib/http/public-api"

export function useUniversitySearch(search: string) {
  const [universities, setUniversities] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!search || search.length < 2) {
      setUniversities([])
      return
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true)

        const response = await publicApi.get("/universities",
          {
            params: {
              search,
              limit: 10,
            },
          }
        )

        setUniversities(response.data.data || [])
      } catch (error) {
        console.error("Error fetching universities:", error)
      } finally {
        setLoading(false)
      }
    }, 300) // debounce

    return () => clearTimeout(timeout)
  }, [search])

  return { universities, loading }
}