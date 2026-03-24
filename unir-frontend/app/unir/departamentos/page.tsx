
"use client"


import { MainNav } from "@/components/main-nav"
import { SearchHero } from "@/components/search-hero"
import { FeaturedListings } from "@/components/featured-listings"
import { HowItWorks } from "@/components/how-it-works"
// import MapInfo from "@/components/map-info"
import { useEffect, useRef } from "react"
import { useUniversities } from "@/hooks/useUniversity"
import dynamic from "next/dynamic"

const MapInfo = dynamic(
  () => import("@/components/map-info"),
  { ssr: false }
)

export default function DepartamentoPage() {

    const listRef = useRef<HTMLDivElement>(null)
    const depar = useUniversities()
    console.log(depar)

    
    
    useEffect(() => {
        
        const handleWheel = (e: WheelEvent) => {
            const list = listRef.current
            if (!list) return

            const { scrollTop, scrollHeight, clientHeight } = list
            const isScrollingDown = e.deltaY > 0
            const isScrollingUp = e.deltaY < 0

            const atBottom = scrollTop + clientHeight >= scrollHeight
            const atTop = scrollTop <= 0

            if (
                (isScrollingDown && !atBottom) ||
                (isScrollingUp && !atTop)
            ) {
                e.preventDefault()
                list.scrollTop += e.deltaY
            }
            // si está en el final → deja que el body haga scroll normal
        }

        window.addEventListener("wheel", handleWheel, { passive: false })

        return () => {
            window.removeEventListener("wheel", handleWheel)
        }
    }, [])

    // return (
    //     <div className="h-screen">
    //         <div className="flex h-full">
    //             <div ref={listRef} className="w-1/2 overflow-hidden">
    //                 <FeaturedListings />
    //             </div>
    //             <div className="w-1/2">
    //                 <MapInfo />
    //             </div>
    //         </div>
    //     </div>
    // )


    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget

        const reachedBottom = scrollTop + clientHeight >= scrollHeight - 5

        if (reachedBottom) {
            document.body.style.overflow = 'auto'

        } else {
            document.body.style.overflow = 'hidden'
        }
    }


    return (
        <>
            <MainNav />
            <main className="min-h-screen lg:hidden">

                <SearchHero />
                <div className="w-full flex justify-center items-center p-3.5">
                    <div className="w-11/12 rounded-3xl overflow-hidden">
                        <MapInfo />

                    </div>
                </div>
                <FeaturedListings />
                <HowItWorks />
            </main>

            <main className="hidden lg:flex items-center mb-16 justify-center flex-col">

                <div style={{ top: 'var(--nav-height)' }} className="z-50 sticky w-full">
                    <SearchHero />
                </div>

                <div className="flex w-3/4 justify-center pt-8 ">

                    <div className=" pr-4 w-2/4">
                        <FeaturedListings />
                    </div>

                    <div style={{ top: '280px' }} className="z-0 w-2/4 right-0 rounded-3xl overflow-hidden h-[68vh]  sticky top-0">
                        <MapInfo />

                    </div>

                </div>


            </main>
            <HowItWorks />


        </>
    )
}