import React from 'react'
import Navbar from './Navbar'
import { ArrowRight,Zap,Globe,Shield,Users,ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  return (
     <div className="min-h-screen bg-[oklch(0.98_0.001_0)]">
        <Navbar/>
         {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-[oklch(0.15_0_0)] leading-tight text-balance">
              Stay Connected{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.45_0.21_262)] to-[oklch(0.50_0.18_189)]">
                Anywhere
              </span>
            </h1>
            <p className="text-lg text-[oklch(0.15_0_0)]/70 max-w-lg leading-relaxed">
              Get affordable international numbers for over 20 countries. Stay connected with local rates wherever your travels take you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={() => navigate('/products')} size="lg" className="h-10 rounded-md px-6 bg-[oklch(0.45_0.21_262)] hover:bg-primary/90 font-medium text-white group inline-flex items-center justify-center gap-2">
                Shop Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button size="lg" variant="outline" className='h-10 rounded-md px-6 border bg-background shadow-xs dark:bg-input/30 font-medium dark:border-input dark:hover:bg-input/50'>
                Learn More
              </button>
            </div>
            <div className="flex items-center justify-center gap-8 pt-6">
              <div>
                <p className="text-2xl font-bold text-[oklch(0.45_0.21_262)]">20+</p>
                <p className="text-sm text-[oklch(0.15_0_0)]/60">Countries</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[oklch(0.45_0.21_262)]">5K+</p>
                <p className="text-sm text-[oklch(0.15_0_0)]/60">Happy Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[oklch(0.45_0.21_262)]">24/7</p>
                <p className="text-sm text-[oklch(0.15_0_0)]/60">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.15_0_0)] mb-4">
            Why Choose GlobalSim?
          </h2>
          <p className="text-lg text-[oklch(0.15_0_0)]/60 max-w-2xl mx-auto">
            We provide the most reliable and affordable international connectivity solutions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-[oklch(1_0_0)] border border-[oklch(0.45_0.21_262)]/50 rounded-lg p-8 hover:border-primary/50 transition-colors group">
            <div className="bg-[oklch(0.45_0.21_262)]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Zap className="w-6 h-6 text-[oklch(0.45_0.21_262)]" />
            </div>
            <h3 className="text-lg font-semibold text-[oklch(0.15_0_0)] mb-2">Instant Activation</h3>
            <p className="text-md font-medium text-[oklch(0.15_0_0)]/60">
              Activate your SIM card in minutes, not hours. Get connected immediately upon arrival.
            </p>
          </div>
          <div className="card bg-[oklch(1_0_0)] border border-[oklch(0.45_0.21_262)]/50 rounded-lg p-8 hover:border-primary/50 transition-colors group">
            <div className="bg-[oklch(0.45_0.21_262)]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Globe className="w-6 h-6 text-[oklch(0.45_0.21_262)]" />
            </div>
            <h3 className="text-lg font-semibold text-[oklch(0.15_0_0)] mb-2">Global Coverage</h3>
            <p className="text-md font-medium text-[oklch(0.15_0_0)]/60">
              Works in 200+ countries with local networks. No roaming charges, always local rates.
            </p>
          </div>
          <div className="card bg-[oklch(1_0_0)] border border-[oklch(0.45_0.21_262)]/50 rounded-lg p-8 hover:border-primary/50 transition-colors group">
            <div className="bg-[oklch(0.45_0.21_262)]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Shield className="w-6 h-6 text-[oklch(0.45_0.21_262)]" />
            </div>
            <h3 className="text-lg font-semibold text-[oklch(0.15_0_0)] mb-2">Secure & Reliable</h3>
            <p className="text-md font-medium text-[oklch(0.15_0_0)]/60">
              Military-grade encryption and 99.9% uptime guarantee. Your data is always protected.
            </p>
          </div>
          <div className="card bg-[oklch(1_0_0)] border border-[oklch(0.45_0.21_262)]/50 rounded-lg p-8 hover:border-primary/50 transition-colors group">
            <div className="bg-[oklch(0.45_0.21_262)]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Users className="w-6 h-6 text-[oklch(0.45_0.21_262)]" />
            </div>
            <h3 className="text-lg font-semibold text-[oklch(0.15_0_0)] mb-2">24/7 Support</h3>
            <p className="text-md font-medium text-[oklch(0.15_0_0)]/60">
              Round-the-clock customer support in 12 languages. We&apos;re always here to help.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
        <div className="bg-gradient-to-r from-[oklch(0.45_0.21_262)]/10 to-[oklch(0.50_0.18_189)]/10 border border-[oklch(0.45_0.21_262)]/20 rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.15_0_0)] mb-4">
            Ready to Stay Connected?
          </h2>
          <p className="text-lg text-[oklch(0.15_0_0)]/70 max-w-2xl mx-auto mb-8">
            Get your international SIM card today and enjoy seamless connectivity wherever you go.
          </p>
          <button onClick={() => navigate('/products')} size="lg" className="bg-[oklch(0.45_0.21_262)] font-medium h-10 rounded-md px-6 hover:bg-primary/90 text-white group inline-flex items-center justify-center gap-2">
            Browse SIM Cards <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <div className="border-t border-[oklch(0.5_0.18_189)] pt-4 pb-2">
            <div className="flex flex-col md:flex-row justify-center items-center text-sm text-[oklch(0.15_0_0)]/60">
              <p>&copy; 2025 GlobalSim. All rights reserved.</p>
            </div>
          </div>

     </div>
  )
}

export default Dashboard