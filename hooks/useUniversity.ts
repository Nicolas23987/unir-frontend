import { getUniversities } from "@/lib/services/university.services"
import { useQuery } from "@tanstack/react-query"




export function useUniversities() {
    return useQuery({
        queryKey: ['universities'],
        queryFn: () => getUniversities(),
        staleTime: 1000 * 60 * 60, // 1 hora
        gcTime: 1000 * 60 * 60, // 1 hora
    })
    
}