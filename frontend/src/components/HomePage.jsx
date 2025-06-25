// import React from 'react'
import FeaturedProperties from './HomePage/FeaturedPropertise'
import Features from './HomePage/Features'
import { FinalCTA } from './HomePage/FinalCTA'
import HomeHeader from './HomePage/HomeHeader'
import HouseSellingSection from './HomePage/HouseSellingSection'
// import { NeighborhoodSpotlight } from './HomePage/NeighborhoodSpotlight'
import { Testimonials } from './HomePage/Testimonials'
// import { ValueProposition } from './HomePage/ValueProposition'

export default function HomePage() {
    return (
        <div>
            <HomeHeader />
            <Features />
            <FeaturedProperties />
            <HouseSellingSection />
            {/* <NeighborhoodSpotlight /> */}
            {/* <ValueProposition/> */}
            <Testimonials/>
            <FinalCTA />
        </div>
    )
}
