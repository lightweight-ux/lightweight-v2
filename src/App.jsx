import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Hero from './components/Hero'
import Services from './components/Services'
import Showcase from './components/Showcase'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <Showcase />
              <Testimonials />
              <CTA />
            </>
          }
        />
        <Route path="*" element={<Hero />} />
      </Routes>
    </Layout>
  )
}