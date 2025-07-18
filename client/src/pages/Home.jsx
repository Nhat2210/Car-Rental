import Bannner from '@/components/Bannner'
import FeaturedSection from '@/components/FeaturedSection'
import Hero from '@/components/Hero'
import Newsletter from '@/components/Newsletter'
import Testimonial from '@/components/Testimonial'
import React from 'react'

const Home = () => {
    return (
        <div>
            <Hero />
            <FeaturedSection />
            <Bannner />
            <Testimonial />
            <Newsletter />
        </div>
    )
}

export default Home