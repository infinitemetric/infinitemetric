import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BookingWidget from './components/BookingWidget'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import HowItWorks from './components/HowItWorks'
import FleetCoverage from './components/FleetCoverage'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-white text-gray-900 overflow-x-hidden w-full">
      <Navbar />
      <Hero />
      <div className="relative">
        <BookingWidget />
      </div>
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <FleetCoverage />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  )
}

export default App
